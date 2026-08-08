// Portfolio-style masonry gallery rendering.

function renderGallery(images) {
  if (!dom.gallery) return;
  dom.gallery.innerHTML = "";

  const uniqueImages = normalizeGalleryImages(images).filter((image, index, allImages) => {
    const key = image.id || image.src;
    return allImages.findIndex((entry) => (entry.id || entry.src) === key) === index;
  });

  if (!uniqueImages.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "gallery-empty-state";
    emptyState.setAttribute("role", "status");
    emptyState.innerHTML = `<h3>No photos yet</h3><p>Add image URLs to the GALLERY_IMAGES array in photo-data.js to populate this gallery.</p>`;
    dom.gallery.appendChild(emptyState);
    refreshLightboxItems();
    return;
  }

  uniqueImages.forEach((image) => {
    const article = document.createElement("article");
    article.className = "gallery-item";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Open photo: ${image.alt || "Gallery photo"}`);

    const img = document.createElement("img");
    img.src = image.src;
    if (image.srcset) img.srcset = image.srcset;
    img.sizes = "(max-width: 700px) 100vw, 50vw";
    img.alt = image.alt;
    img.loading = "lazy";
    img.decoding = "async";
    applyLightboxData(img, image);

    img.addEventListener("load", () => {
      img.classList.add("is-visible");
      refreshLightboxItems();
    });

    img.addEventListener("error", () => {
      img.dataset.broken = "true";
      article.classList.add("is-broken");
      refreshLightboxItems();
    });

    article.addEventListener("click", () => {
      if (img.dataset.broken === "true") return;
      openLightboxByImageNode(img);
    });
    article.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (img.dataset.broken !== "true") openLightboxByImageNode(img);
    });

    article.appendChild(img);
    const caption = document.createElement("p");
    caption.className = "gallery-item-caption";
    caption.textContent = image.alt || "Gallery photo";
    article.appendChild(caption);
    dom.gallery.appendChild(article);
  });

  refreshLightboxItems();
}
