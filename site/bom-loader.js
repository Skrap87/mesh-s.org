(() => {
  const isDevHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  const fetchJson = async (url) => {
    const res = await fetch(url, { cache: isDevHost ? "no-store" : "default" });
    if (!res.ok) {
      throw new Error(`Failed to load ${url}`);
    }
    return res.json();
  };

  const createCell = (text, className) => {
    const cell = document.createElement("td");
    if (className) {
      cell.className = className;
    }
    if (text !== null && text !== undefined) {
      cell.textContent = text;
    }
    return cell;
  };

  const createPhotoCell = (item) => {
    const cell = document.createElement("td");
    cell.className = "bom-col-photo";
    if (!item.photoThumb) {
      cell.textContent = "—";
      return cell;
    }

    const button = document.createElement("button");
    button.className = "bom-thumb";
    button.type = "button";
    button.setAttribute("data-full", item.photoFull || item.photoThumb);
    button.setAttribute("aria-label", "Bild öffnen");

    const img = document.createElement("img");
    img.className = "bom-photo";
    img.src = item.photoThumb;
    img.alt = item.name;
    img.width = 64;
    img.height = 64;
    img.loading = "lazy";
    img.decoding = "async";

    button.appendChild(img);
    cell.appendChild(button);
    return cell;
  };

  const createLinkCell = (item) => {
    const cell = document.createElement("td");
    cell.className = "bom-col-link";
    const link = document.createElement("a");
    link.className = "btn btn-outline";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    if (item.shopUrl) {
      link.href = item.shopUrl;
      link.textContent = item.shopLabel || "Link";
    } else {
      link.href = "#bom";
      link.textContent = "Link folgt";
    }

    cell.appendChild(link);
    return cell;
  };

  const createComponentCell = (item) => {
    const cell = document.createElement("td");
    const wrapper = document.createElement("div");
    wrapper.className = "bom-component";

    const name = document.createElement("span");
    name.className = "bom-component-name";
    name.textContent = item.name;
    wrapper.appendChild(name);

    if (item.kind === "optional") {
      const badge = document.createElement("span");
      badge.className = "bom-badge bom-badge--optional";
      badge.textContent = "Optional";
      wrapper.appendChild(badge);
    }

    cell.appendChild(wrapper);
    return cell;
  };

  const renderBomRows = (items) => {
    const tbody = document.getElementById("bomTbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    items.forEach((item) => {
      const row = document.createElement("tr");
      row.setAttribute("data-variants", (item.variants || "all").toLowerCase());
      row.setAttribute("data-kind", (item.kind || "required").toLowerCase());
      if (item.group) {
        row.setAttribute("data-group", item.group);
      }

      row.appendChild(createComponentCell(item));
      row.appendChild(createCell(item.qty));
      row.appendChild(createCell(item.notes));
      row.appendChild(createPhotoCell(item));
      row.appendChild(createLinkCell(item));

      tbody.appendChild(row);
    });
  };

  const loadBom = async () => {
    try {
      const indexData = await fetchJson("assets/bom/index.json");
      const itemFiles = Array.isArray(indexData.items) ? indexData.items : [];

      const items = await Promise.all(
        itemFiles.map((name) => fetchJson(`assets/bom/items/${name}`))
      );

      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      renderBomRows(items);

      const activeVariant =
        typeof window.getCurrentVariant === "function" ? window.getCurrentVariant() : "s";
      if (typeof window.applyBomFilter === "function") {
        window.applyBomFilter(activeVariant);
      }
    } catch (error) {
      console.warn("[bom-loader] failed to load BOM", error);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadBom();
  });
})();
