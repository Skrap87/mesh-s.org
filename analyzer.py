from __future__ import annotations

import json
import time
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal, ROUND_CEILING, ROUND_FLOOR
from threading import Lock, Thread
from typing import Any

from app.bootstrap import get_logger, get_redis
from app.models.trade_models import OpenTrade, TradeDirection, TradeResult
from app.repos.signals_repo import SignalsRepo
from app.repos.stats_repo import StatsRepo
from app.repos.symbols_repo import SymbolsRepo
from app.repos.trades_repo import TradesRepo
from app.runtime_config import RuntimeConfig


@dataclass(slots=True)
class _TradeState:
    trade: OpenTrade
    tp_price: Decimal
    sl_price: Decimal


def round_to_tick(price: Decimal, tick_size: Decimal, mode: str) -> Decimal:
    if tick_size <= 0:
        return price
    ratio = price / tick_size
    if mode == "down":
        rounded = ratio.to_integral_value(rounding=ROUND_FLOOR)
    elif mode == "up":
        rounded = ratio.to_integral_value(rounding=ROUND_CEILING)
    else:
        raise ValueError("mode must be 'down' or 'up'")
    return rounded * tick_size


class SignalAnalyzer:
    def __init__(self, runtime_config: RuntimeConfig) -> None:
        self._logger = get_logger()
        self._redis = get_redis()
        self._config = runtime_config
        self._signals_repo = SignalsRepo()
        self._trades_repo = TradesRepo()
        self._stats_repo = StatsRepo()
        self._tick_sizes: dict[str, Decimal] = {}
        self._open_index: dict[tuple[str, int], int] = {}
        self._open_by_symbol: dict[str, set[int]] = {}
        self._open_trades: dict[int, _TradeState] = {}
        self._lock = Lock()

    def start(self) -> None:
        self._load_tick_sizes()
        self._load_open_trades()
        Thread(target=self._listen, daemon=True).start()
        Thread(target=self._timeout_loop, daemon=True).start()
        self._logger.info("SignalAnalyzer запущен.")

    def _load_open_trades(self) -> None:
        trades = self._trades_repo.get_open_trades()
        with self._lock:
            for trade in trades:
                self._ensure_sl_for_trade(trade)
                self._track_trade(trade)
        if trades:
            self._logger.info("SignalAnalyzer: восстановлено открытых сделок: %s", len(trades))

    def _listen(self) -> None:
        pubsub = self._redis.pubsub()
        pubsub.subscribe("signal:new", "price:spot:tick", "config:update", "symbols:updated")
        for message in pubsub.listen():
            if message.get("type") != "message":
                continue
            channel = message.get("channel")
            if channel == "config:update":
                self._config.refresh_if_needed()
                self._refresh_missing_sl()
                continue
            if channel == "symbols:updated":
                self._load_tick_sizes()
                continue
            data = message.get("data")
            if isinstance(data, bytes):
                data = data.decode("utf-8")
            try:
                payload = json.loads(data)
            except (TypeError, json.JSONDecodeError):
                continue
            if channel == "signal:new":
                self._handle_signal_new(payload)
            elif channel == "price:spot:tick":
                self._handle_price_tick(payload)

    def _handle_signal_new(self, payload: dict[str, Any]) -> None:
        signal_id = payload.get("id")
        if not signal_id:
            self._logger.info("SignalAnalyzer: сигнал без id, пропуск.")
            return
        signal_id_int = int(signal_id)
        signal = self._signals_repo.get_signal(signal_id_int)
        if not signal:
            self._logger.info("SignalAnalyzer: сигнал %s не найден, пропуск.", signal_id)
            return
        if not signal.get("direction"):
            self._logger.info("SignalAnalyzer: сигнал %s без направления, пропуск.", signal_id)
            return

        symbol = signal["symbol"]
        timeframe = signal["timeframe"]
        key = (symbol, timeframe)
        with self._lock:
            if key in self._open_index:
                self._logger.info(
                    "SignalAnalyzer: пропуск сигнала %s (уже есть OPEN для %s %sм).",
                    signal_id_int,
                    symbol,
                    timeframe,
                )
                return

        entry_price = signal.get("price")
        if entry_price is None:
            entry_price = self._get_price_from_redis(symbol)
        if entry_price is None:
            self._logger.info("SignalAnalyzer: нет цены входа для %s, пропуск.", symbol)
            return

        tp_pct = Decimal(str(self._config.get_float("signal_tp_pct", 0.02)))
        sl_pct = Decimal(str(self._config.get_float("signal_sl_pct", 0.01)))
        entry_price_dec = Decimal(str(entry_price))
        direction = TradeDirection(signal["direction"])
        tick_size = self._get_tick_size(symbol)
        tp_price = self._calculate_tp(entry_price_dec, direction, tp_pct)
        sl_price = self._calculate_sl(entry_price_dec, direction, sl_pct)
        if tick_size:
            if direction == TradeDirection.LONG:
                tp_price = round_to_tick(tp_price, tick_size, "up")
                sl_price = round_to_tick(sl_price, tick_size, "down")
            else:
                tp_price = round_to_tick(tp_price, tick_size, "down")
                sl_price = round_to_tick(sl_price, tick_size, "up")
        trade_id = self._trades_repo.create_trade_from_signal(
            signal,
            entry_price_dec,
            tp_pct,
            tp_price,
            sl_pct,
            sl_price,
        )
        trade = OpenTrade(
            trade_id=trade_id,
            signal_id=signal_id_int,
            symbol=symbol,
            timeframe=timeframe,
            direction=direction,
            entry_price=entry_price_dec,
            tp_pct=tp_pct,
            tp_price=tp_price,
            sl_pct=sl_pct,
            sl_price=sl_price,
            opened_at=datetime.utcnow(),
        )
        with self._lock:
            self._track_trade(trade)
        self._logger.info(
            "SignalAnalyzer: открыт trade %s %s %sм %s по цене %.10f",
            trade_id,
            symbol,
            timeframe,
            direction.value,
            entry_price,
        )

    def _handle_price_tick(self, payload: dict[str, Any]) -> None:
        symbol = payload.get("symbol")
        price = payload.get("price")
        if not symbol or price is None:
            return
        try:
            last_price = Decimal(str(price))
        except (TypeError, ValueError):
            return

        with self._lock:
            trade_ids = list(self._open_by_symbol.get(symbol, set()))
        if not trade_ids:
            return

        for trade_id in trade_ids:
            with self._lock:
                state = self._open_trades.get(trade_id)
            if not state:
                continue
            trade = state.trade
            tick_size = self._get_tick_size(trade.symbol)
            if tick_size is None:
                continue
            if trade.direction == TradeDirection.LONG:
                sl_price = round_to_tick(state.sl_price, tick_size, "down")
                tp_price = round_to_tick(state.tp_price, tick_size, "up")
                close_price = round_to_tick(last_price, tick_size, "down")
                if close_price <= sl_price:
                    self._close_trade(trade, TradeResult.LOSS, close_price, "SL")
                    continue
                if close_price >= tp_price:
                    self._close_trade(trade, TradeResult.WIN, close_price, "TP")
            else:
                sl_price = round_to_tick(state.sl_price, tick_size, "up")
                tp_price = round_to_tick(state.tp_price, tick_size, "down")
                close_price = round_to_tick(last_price, tick_size, "up")
                if close_price >= sl_price:
                    self._close_trade(trade, TradeResult.LOSS, close_price, "SL")
                    continue
                if close_price <= tp_price:
                    self._close_trade(trade, TradeResult.WIN, close_price, "TP")

    def _timeout_loop(self) -> None:
        while True:
            interval = self._config.get_int("signal_timeout_scan_seconds", 30)
            max_hold_minutes = self._config.get_int("signal_sl_timer_minutes", 240)
            now = datetime.utcnow()
            due_trades = self._trades_repo.get_due_timeouts(now, max_hold_minutes)
            for trade in due_trades:
                price = self._get_price_from_redis(trade.symbol)
                if price is None:
                    self._logger.info(
                        "SignalAnalyzer: нет цены для таймаута %s, повторим позже.",
                        trade.trade_id,
                    )
                    continue
                tick_size = self._get_tick_size(trade.symbol)
                if tick_size is None:
                    continue
                close_price_raw = Decimal(str(price))
                if trade.entry_price <= 0:
                    self._logger.error(
                        "SignalAnalyzer: некорректная цена входа %s для %s.",
                        trade.entry_price,
                        trade.trade_id,
                    )
                    continue
                if trade.direction == TradeDirection.LONG:
                    close_price = round_to_tick(close_price_raw, tick_size, "down")
                    pnl_pct = (close_price - trade.entry_price) / trade.entry_price
                else:
                    close_price = round_to_tick(close_price_raw, tick_size, "up")
                    pnl_pct = (trade.entry_price - close_price) / trade.entry_price
                result = TradeResult.WIN if pnl_pct > 0 else TradeResult.LOSS
                self._close_trade(trade, result, close_price, "таймаут")
                self._logger.info(
                    "SignalAnalyzer: timeout close %s tf=%s dir=%s entry=%s close=%s pnl=%s tick=%s => %s",
                    trade.symbol,
                    trade.timeframe,
                    trade.direction.value,
                    trade.entry_price,
                    close_price,
                    f"{pnl_pct:.4%}",
                    tick_size,
                    result.value,
                )
            time.sleep(max(1, interval))

    def _close_trade(
        self,
        trade: OpenTrade,
        result: TradeResult,
        close_price: Decimal,
        reason: str,
    ) -> None:
        closed_at = datetime.utcnow()

        updated = self._trades_repo.close_trade(
            trade.trade_id,
            result,
            close_price,
            closed_at,
        )
        if not updated:
            return

        self._stats_repo.apply_closed_trade(trade.symbol, trade.direction, result)

        pnl_pct: Decimal | None = None
        if trade.entry_price > 0:
            if trade.direction == TradeDirection.LONG:
                pnl_pct = (close_price - trade.entry_price) / trade.entry_price
            else:
                pnl_pct = (trade.entry_price - close_price) / trade.entry_price

        stats = self._stats_repo.get_symbol_stats(trade.symbol)

        tick = self._get_tick_size(trade.symbol)

        def _scale_from_tick(t: Decimal | None) -> int | None:
            if t is None:
                return None
            s = str(t)
            if "." not in s:
                return 0
            frac = s.split(".", 1)[1].rstrip("0")
            return len(frac)

        def _fmt_price(v: Decimal | None) -> str | None:
            if v is None:
                return None
            scale = _scale_from_tick(tick)
            if scale is None:
                return str(v)
            q = Decimal("1").scaleb(-scale)
            return str(v.quantize(q))

        payload = {
            "signal_id": trade.signal_id,
            "symbol": trade.symbol,
            "timeframe": trade.timeframe,
            "direction": trade.direction.value,
            "entry_price": _fmt_price(trade.entry_price),
            "close_price": _fmt_price(close_price),
            "result": result.value,
            "closed_at": closed_at.isoformat(),
            "reason": reason,
            "pnl_pct": str(pnl_pct) if pnl_pct is not None else None,
            "stats": stats,
        }

        self._redis.publish("trade:closed", json.dumps(payload))

        with self._lock:
            self._remove_trade(trade.trade_id)

        self._logger.info(
            "SignalAnalyzer: закрыт %s trade %s %s %sм по цене %s (%s)",
            result.value,
            trade.trade_id,
            trade.symbol,
            trade.timeframe,
            close_price,
            reason,
        )

    def _track_trade(self, trade: OpenTrade) -> None:
        key = (trade.symbol, trade.timeframe)
        self._open_index[key] = trade.trade_id
        self._open_by_symbol.setdefault(trade.symbol, set()).add(trade.trade_id)
        self._open_trades[trade.trade_id] = _TradeState(
            trade=trade,
            tp_price=trade.tp_price,
            sl_price=trade.sl_price,
        )

    def _remove_trade(self, trade_id: int) -> None:
        state = self._open_trades.pop(trade_id, None)
        if not state:
            return
        trade = state.trade
        key = (trade.symbol, trade.timeframe)
        self._open_index.pop(key, None)
        symbol_set = self._open_by_symbol.get(trade.symbol)
        if symbol_set:
            symbol_set.discard(trade.trade_id)
            if not symbol_set:
                self._open_by_symbol.pop(trade.symbol, None)

    def _calculate_tp(
        self,
        entry_price: Decimal,
        direction: TradeDirection,
        tp_pct: Decimal,
    ) -> Decimal:
        if direction == TradeDirection.LONG:
            return entry_price * (1 + tp_pct)
        return entry_price * (1 - tp_pct)

    def _calculate_sl(
        self,
        entry_price: Decimal,
        direction: TradeDirection,
        sl_pct: Decimal,
    ) -> Decimal:
        if direction == TradeDirection.LONG:
            return entry_price * (1 - sl_pct)
        return entry_price * (1 + sl_pct)

    def _ensure_sl_for_trade(self, trade: OpenTrade) -> None:
        if trade.sl_pct > 0 and trade.sl_price > 0:
            return
        sl_pct = Decimal(str(self._config.get_float("signal_sl_pct", 0.01)))
        if sl_pct <= 0:
            return
        tick_size = self._get_tick_size(trade.symbol)
        sl_price = self._calculate_sl(trade.entry_price, trade.direction, sl_pct)
        if tick_size:
            if trade.direction == TradeDirection.LONG:
                sl_price = round_to_tick(sl_price, tick_size, "down")
            else:
                sl_price = round_to_tick(sl_price, tick_size, "up")
        updated = self._trades_repo.update_trade_sl(trade.trade_id, sl_pct, sl_price)
        if not updated:
            return
        trade.sl_pct = sl_pct
        trade.sl_price = sl_price
        state = self._open_trades.get(trade.trade_id)
        if state:
            state.sl_price = sl_price
        self._logger.info(
            "SignalAnalyzer: обновлен SL для trade %s (%s %.6f)",
            trade.trade_id,
            trade.symbol,
            sl_pct,
        )

    def _refresh_missing_sl(self) -> None:
        with self._lock:
            trades = list(self._open_trades.values())
        for state in trades:
            self._ensure_sl_for_trade(state.trade)

    def _get_price_from_redis(self, symbol: str) -> Decimal | None:
        raw = self._redis.get(f"price:spot:{symbol}")
        if not raw:
            return None
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            return None
        price = payload.get("price") if isinstance(payload, dict) else None
        if price is None:
            return None
        try:
            return Decimal(str(price))
        except (TypeError, ValueError):
            return None

    def _load_tick_sizes(self) -> None:
        repo = SymbolsRepo()
        rows = repo.get_tick_sizes()
        tick_sizes: dict[str, Decimal] = {}
        for symbol, tick_raw in rows.items():
            try:
                tick_sizes[symbol] = Decimal(str(tick_raw))
            except (TypeError, ValueError):
                continue
        self._tick_sizes = tick_sizes
        if tick_sizes:
            self._logger.info("SignalAnalyzer: загружены tick_size (%s).", len(tick_sizes))

    def _get_tick_size(self, symbol: str) -> Decimal | None:
        tick_size = self._tick_sizes.get(symbol)
        if tick_size is None:
            self._logger.warning("SignalAnalyzer: нет tick_size для %s, пропуск.", symbol)
        return tick_size
