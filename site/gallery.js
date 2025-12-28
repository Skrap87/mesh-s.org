(() => {
  const galleryItems = [
    // Добавляйте новые фото в assets/gallery и дополняйте список ниже.
    {
      src: "assets/gallery/knoten-01.webp",
      thumb: "assets/gallery/knoten-01.webp",
      alt: "Solarknoten im Außeneinsatz",
    },
    {
      src: "assets/gallery/knoten-02.webp",
      thumb: "assets/gallery/knoten-02.webp",
      alt: "Antenne am MESH-S-Knoten",
    },
    {
      src: "assets/gallery/knoten-03.webp",
      thumb: "assets/gallery/knoten-03.webp",
      alt: "Gehäuse und Dichtung im Detail",
    },
  ];

  const renderGallery = () => {
    const grid = document.querySelector(".gallery-grid");
    if (!grid) return;

    galleryItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item";
      button.setAttribute("data-full", item.src);
      button.setAttribute("aria-label", "Bild öffnen");

      const img = document.createElement("img");
      img.src = item.thumb || item.src;
      img.alt = item.alt || "";
      img.loading = "lazy";
      img.decoding = "async";

      button.appendChild(img);
      grid.appendChild(button);
    });
  };

  document.addEventListener("DOMContentLoaded", renderGallery);
})();
