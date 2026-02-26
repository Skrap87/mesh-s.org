/* [RU] ===== START: core.js / Helpers ===== */
export function $(sel, root = document){ return root.querySelector(sel); }
export function $all(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }
/* [RU] ===== END: core.js / Helpers ===== */