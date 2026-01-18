(() => {
  const galleryItems = [
    // Füge neue Fotos in assets/gallery hinzu und erweitere die folgende Liste.
    {
      src: "assets/gallery/knoten-01.jpg",
      thumb: "assets/gallery/knoten-01.jpg",
      alt: "Solarknoten im Außeneinsatz",
    },
    {
      src: "assets/gallery/knoten-02.jpg",
      thumb: "assets/gallery/knoten-02.jpg",
      alt: "Solarknoten im Außeneinsatz",
    },
    {
      src: "assets/gallery/knoten-03.jpg",
      thumb: "assets/gallery/knoten-03.jpg",
      alt: "Gehäuse und Dichtung im Detail",
    },
	{
      src: "assets/gallery/knoten-04.jpg",
      thumb: "assets/gallery/knoten-04.jpg",
      alt: "Gehäuse im Detail",
    },
	{
      src: "assets/gallery/knoten-05.jpg",
      thumb: "assets/gallery/knoten-05.jpg",
      alt: "Vorbereitung",
    },
	{
      src: "assets/gallery/knoten-06.jpg",
      thumb: "assets/gallery/knoten-06.jpg",
      alt: "MESH-S / M",
    },
	{
      src: "assets/gallery/knoten-07.jpg",
      thumb: "assets/gallery/knoten-07.jpg",
      alt: "MESH-S / M",
    },
	{
      src: "assets/gallery/knoten-08.jpg",
      thumb: "assets/gallery/knoten-08.jpg",
      alt: "MESH-S / M Prototype",
    },
	{
      src: "assets/gallery/knoten-09.jpg",
      thumb: "assets/gallery/knoten-09.jpg",
      alt: "MESH-S / Unter Schnee",
    },
	{
      src: "assets/gallery/knoten-10.jpg",
      thumb: "assets/gallery/knoten-10.jpg",
      alt: "MESH-S / Unter Schnee",
    },
	{
      src: "assets/gallery/knoten-11.jpg",
      thumb: "assets/gallery/knoten-11.jpg",
      alt: "MESH-S / Unter Schnee",
    },
	{
      src: "assets/gallery/knoten-12.jpg",
      thumb: "assets/gallery/knoten-12.jpg",
      alt: "MESH-S / Unter Schnee",
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
