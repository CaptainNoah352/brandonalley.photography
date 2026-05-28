// Photo data (GALLERY_IMAGES, SPECIES_DATA) lives in photo-data.js, loaded before this file.

const pageType = document.body?.dataset?.page || "home";

const dom = {
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  mobileMenuClose: document.getElementById("mobileMenuClose"),
  yearNode: document.getElementById("year"),
  gallery: document.getElementById("gallery"),
  homeLocationsGrid: document.getElementById("homeLocationsGrid"),
  locationsGrid: document.getElementById("locationsGrid"),
  locationGallery: document.getElementById("location-gallery"),
  locationGalleryTitle: document.getElementById("locationGalleryTitle"),
  locationGalleryIntro: document.getElementById("locationGalleryIntro"),
  locationGalleryCount: document.getElementById("locationGalleryCount"),
  homeCarousel: document.getElementById("homeCarousel"),
  carouselTrack: document.getElementById("carouselTrack"),
  carouselPrev: document.getElementById("carouselPrev"),
  carouselNext: document.getElementById("carouselNext"),
  carouselDots: document.getElementById("carouselDots"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  lightboxCaption: document.getElementById("lightboxCaption"),
  lightboxCounter: document.getElementById("lightboxCounter"),
  lightboxClose: document.getElementById("lightboxClose"),
  lightboxPrevZone: document.getElementById("lightboxPrevZone"),
  lightboxNextZone: document.getElementById("lightboxNextZone"),
  lightboxFigure: document.getElementById("lightboxFigure"),
  lightboxFlickrLink: document.getElementById("lightboxFlickrLink"),
  projectGallery: document.getElementById("project-gallery"),
  speciesModal: document.getElementById("speciesModal"),
  speciesModalBackdrop: document.getElementById("speciesModalBackdrop"),
  speciesModalClose: document.getElementById("speciesModalClose"),
  speciesModalTitle: document.getElementById("speciesModalTitle"),
  speciesModalScientific: document.getElementById("speciesModalScientific"),
  speciesModalConservation: document.getElementById("speciesModalConservation"),
  speciesModalDocumented: document.getElementById("speciesModalDocumented"),
  speciesModalDetails: document.getElementById("speciesModalDetails"),
  speciesModalPhotoWrap: document.getElementById("speciesModalPhotoWrap"),
};

const state = {
  orderedGalleryImages: [],
  availableLightboxItems: [],
  currentLightboxPosition: 0,
  lightboxUiVisible: true,
  hideUiTimeoutId: null,
  touchStartX: 0,
  touchStartY: 0,
  hasAlignedInitialHash: false,
  speciesModalOpener: null,
};

const CONTROL_HIDE_DELAY_MS = 1500;

function normalizeSlug(value, fallback = "uncategorized") {
  const slug = (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || fallback;
}

function normalizeGalleryImages(images) {
  if (!Array.isArray(images)) return [];
  return images
    .map((image) => {
      const src = (image?.src || image?.image_url || "").toString().trim();
      if (!src) return null;
      return {
        ...image,
        src,
        alt: (image?.alt || image?.title || "Portfolio photo").toString(),
      };
    })
    .filter(Boolean);
}

function hashFromSeed(seedText) {
  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seedText) {
  let hash = hashFromSeed(seedText);
  return () => {
    hash += 0x6d2b79f5;
    let t = hash;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(array, seedText) {
  const shuffled = [...array];
  const random = seededRandom(seedText);
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function flickrPageUrlFromSrc(src) {
  return src || null;
}

function refreshLightboxItems() {
  if (dom.homeCarousel) {
    state.availableLightboxItems = Array.from(
      dom.homeCarousel.querySelectorAll(".carousel-slide img")
    ).filter((img) => img.dataset.broken !== "true");
    return;
  }
  const galleryEl = dom.locationGallery || dom.projectGallery || dom.gallery;
  if (!galleryEl) return;
  state.availableLightboxItems = Array.from(
    galleryEl.querySelectorAll(".gallery-item img")
  ).filter((img) => img.dataset.broken !== "true");
}

function updateLightboxView(direction = "next") {
  const activeImage = state.availableLightboxItems[state.currentLightboxPosition];
  if (!activeImage || !dom.lightboxImage || !dom.lightboxCounter || !dom.lightboxCaption) return;

  if (dom.lightboxFigure) {
    const animationClass = direction === "prev" ? "slide-prev" : "slide-next";
    dom.lightboxFigure.classList.remove("slide-next", "slide-prev");
    void dom.lightboxFigure.offsetWidth;
    dom.lightboxFigure.classList.add(animationClass);
  }

  dom.lightboxImage.src = activeImage.src;
  dom.lightboxImage.alt = activeImage.alt || "Gallery image";
  dom.lightboxCaption.textContent = activeImage.alt || "";
  dom.lightboxCounter.textContent = `${state.currentLightboxPosition + 1} / ${state.availableLightboxItems.length}`;

  if (dom.lightboxFlickrLink) {
    const flickrUrl = flickrPageUrlFromSrc(activeImage.src);
    dom.lightboxFlickrLink.href = flickrUrl || "#";
  }
}

function clearUiHideTimer() {
  if (!state.hideUiTimeoutId) return;
  clearTimeout(state.hideUiTimeoutId);
  state.hideUiTimeoutId = null;
}

function setLightboxUiVisibility(visible) {
  if (!dom.lightbox) return;
  state.lightboxUiVisible = visible;
  dom.lightbox.classList.toggle("ui-visible", visible);
  dom.lightbox.classList.toggle("ui-hidden", !visible);
}

function scheduleUiHide() {
  clearUiHideTimer();
  state.hideUiTimeoutId = window.setTimeout(() => {
    if (!dom.lightbox || !dom.lightbox.classList.contains("open")) return;
    setLightboxUiVisibility(false);
  }, CONTROL_HIDE_DELAY_MS);
}

function revealLightboxUi() {
  setLightboxUiVisibility(true);
  scheduleUiHide();
}

function openLightboxByImageNode(imageNode) {
  if (!dom.lightbox || !imageNode) return;
  refreshLightboxItems();
  const clickedPosition = state.availableLightboxItems.indexOf(imageNode);
  if (clickedPosition < 0) return;

  state.currentLightboxPosition = clickedPosition;
  updateLightboxView("next");
  dom.lightbox.classList.add("open");
  dom.lightbox.setAttribute("aria-hidden", "false");
  revealLightboxUi();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!dom.lightbox) return;
  dom.lightbox.classList.remove("open");
  dom.lightbox.setAttribute("aria-hidden", "true");
  clearUiHideTimer();
  setLightboxUiVisibility(true);
  state.touchStartX = 0;
  state.touchStartY = 0;
  document.body.style.overflow = "";
}

function showNextImage() {
  if (!state.availableLightboxItems.length) return;
  state.currentLightboxPosition = (state.currentLightboxPosition + 1) % state.availableLightboxItems.length;
  updateLightboxView("next");
  revealLightboxUi();
}

function showPreviousImage() {
  if (!state.availableLightboxItems.length) return;
  state.currentLightboxPosition = (state.currentLightboxPosition - 1 + state.availableLightboxItems.length) % state.availableLightboxItems.length;
  updateLightboxView("prev");
  revealLightboxUi();
}

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

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = "lazy";
    img.decoding = "async";

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

    article.appendChild(img);
    dom.gallery.appendChild(article);
  });

  refreshLightboxItems();
}

function renderFeaturedCarousel(images) {
  if (!dom.homeCarousel || !dom.carouselTrack || !dom.carouselDots) return;

  const featured = images.filter((img) => img.is_featured);
  const slides = featured.length ? featured : images;

  dom.carouselTrack.innerHTML = "";
  dom.carouselDots.innerHTML = "";

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  let touchStartX = 0;

  slides.forEach((image, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (i === 0 ? " is-active" : "");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "";
    img.loading = i === 0 ? "eager" : "lazy";
    img.decoding = "async";
    img.addEventListener("load", () => {
      refreshLightboxItems();
      if (i === currentIndex) fitCarouselToImage(img);
    });
    img.addEventListener("error", () => { img.dataset.broken = "true"; refreshLightboxItems(); });

    slide.appendChild(img);
    slide.addEventListener("click", () => {
      if (img.dataset.broken === "true") return;
      openLightboxByImageNode(img);
    });
    dom.carouselTrack.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
    dot.type = "button";
    dot.addEventListener("click", () => { goToSlide(i); startAuto(); });
    dom.carouselDots.appendChild(dot);
  });

  refreshLightboxItems();

  function fitCarouselToImage(img) {
    if (!img || !dom.homeCarousel) return;
    if (!img.naturalWidth || !img.naturalHeight) return;
    const w = dom.homeCarousel.offsetWidth || window.innerWidth;
    const ratio = img.naturalWidth / img.naturalHeight;
    const h = Math.round(Math.max(180, Math.min(w / ratio, window.innerHeight * 0.9)));
    dom.homeCarousel.style.height = h + "px";
  }

  function goToSlide(index) {
    dom.carouselTrack.children[currentIndex]?.classList.remove("is-active");
    dom.carouselDots.children[currentIndex]?.classList.remove("is-active");
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    dom.carouselTrack.children[currentIndex]?.classList.add("is-active");
    dom.carouselDots.children[currentIndex]?.classList.add("is-active");
    const activeImg = dom.carouselTrack.children[currentIndex]?.querySelector("img");
    if (activeImg?.complete && activeImg.naturalWidth) {
      fitCarouselToImage(activeImg);
    }
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentIndex + 1), 4500);
  }

  dom.carouselPrev?.addEventListener("click", () => { goToSlide(currentIndex - 1); startAuto(); });
  dom.carouselNext?.addEventListener("click", () => { goToSlide(currentIndex + 1); startAuto(); });

  dom.homeCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  dom.homeCarousel.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 48) {
      goToSlide(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
      startAuto();
    }
  }, { passive: true });

  dom.homeCarousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
  dom.homeCarousel.addEventListener("mouseleave", startAuto);

  window.addEventListener("resize", () => {
    const activeImg = dom.carouselTrack.children[currentIndex]?.querySelector("img");
    if (activeImg?.naturalWidth) fitCarouselToImage(activeImg);
  }, { passive: true });

  startAuto();
}



function getLocationsData() {
  return Array.isArray(window.LOCATIONS_DATA) ? window.LOCATIONS_DATA : [];
}

function getLocationImages(locationSlug) {
  return state.orderedGalleryImages.filter((img) => img.location === locationSlug);
}

function getLocationCover(location, locationImages) {
  if (!location) return null;
  return state.orderedGalleryImages.find((img) => img.id === location.coverImageId)
    || locationImages[0]
    || state.orderedGalleryImages[0]
    || null;
}

function createLocationCard(location, options = {}) {
  const locationImages = getLocationImages(location.slug);
  const cover = getLocationCover(location, locationImages);
  const article = document.createElement("article");
  article.className = "location-card scroll-reveal";

  const href = options.compact
    ? `locations.html#${location.slug}`
    : `#${location.slug}`;

  article.innerHTML = `
    <a class="location-card-link" href="${href}" aria-label="View photos from ${location.name}">
      <figure class="location-card-figure">
        ${cover ? `<img src="${cover.src}" alt="${cover.alt || location.name}" loading="lazy" decoding="async">` : ""}
      </figure>
      <div class="location-card-body">
        <p class="location-card-kicker">${location.status || "Location"}</p>
        <h3>${location.name}</h3>
        <p class="location-card-region">${location.region || ""}</p>
        <p class="location-card-summary">${location.summary || ""}</p>
        <span class="location-card-count">${locationImages.length} ${locationImages.length === 1 ? "photo" : "photos"}</span>
      </div>
    </a>
  `;

  return article;
}

function renderHomeLocationPreview() {
  if (!dom.homeLocationsGrid) return;
  const locations = getLocationsData();
  dom.homeLocationsGrid.innerHTML = "";

  locations.slice(0, 3).forEach((location) => {
    dom.homeLocationsGrid.appendChild(createLocationCard(location, { compact: true }));
  });
}

function renderLocationsPage() {
  const locations = getLocationsData();
  if (!locations.length) return;

  if (dom.locationsGrid && !dom.locationsGrid.children.length) {
    locations.forEach((location) => {
      dom.locationsGrid.appendChild(createLocationCard(location));
    });
  }

  const activeSlug = normalizeSlug(window.location.hash.replace("#", ""), locations[0].slug);
  const activeLocation = locations.find((location) => location.slug === activeSlug) || locations[0];
  const locationImages = getLocationImages(activeLocation.slug);

  if (dom.locationGalleryTitle) dom.locationGalleryTitle.textContent = activeLocation.name;
  if (dom.locationGalleryIntro) dom.locationGalleryIntro.textContent = activeLocation.description || activeLocation.summary || "";
  if (dom.locationGalleryCount) {
    dom.locationGalleryCount.textContent = `${locationImages.length} ${locationImages.length === 1 ? "photo" : "photos"}`;
  }

  if (!dom.locationGallery) return;
  dom.locationGallery.innerHTML = "";

  if (!locationImages.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "gallery-empty-state";
    emptyState.setAttribute("role", "status");
    emptyState.innerHTML = `<h3>No photos yet</h3><p>Tag photos with <code>location: "${activeLocation.slug}"</code> in photo-data.js to populate this place gallery.</p>`;
    dom.locationGallery.appendChild(emptyState);
    refreshLightboxItems();
    return;
  }

  locationImages.forEach((image) => {
    const article = document.createElement("article");
    article.className = "gallery-item";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = "lazy";
    img.decoding = "async";

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

    article.appendChild(img);
    dom.locationGallery.appendChild(article);
  });

  refreshLightboxItems();
}

function renderProjectGallery(projectSlug) {
  const container = dom.projectGallery;
  if (!container) return;

  const projectImages = state.orderedGalleryImages.filter(
    (img) => img.project === projectSlug
  );

  container.innerHTML = "";

  if (!projectImages.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "gallery-empty-state";
    emptyState.setAttribute("role", "status");
    emptyState.innerHTML = `<h3>No photos yet</h3><p>Photos will appear here as species are documented.</p>`;
    container.appendChild(emptyState);
    refreshLightboxItems();
    return;
  }

  projectImages.forEach((image) => {
    const article = document.createElement("article");
    article.className = "gallery-item";

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (image.species) img.dataset.species = image.species;

    img.addEventListener("load", () => {
      img.classList.add("is-visible");
      refreshLightboxItems();
      hydrateSpeciesCards();
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

    article.appendChild(img);
    container.appendChild(article);
  });

  refreshLightboxItems();
  hydrateSpeciesCards();
}

function openSpeciesModal(scientificName, openerEl) {
  const data = SPECIES_DATA[scientificName];
  if (!data || !dom.speciesModal) return;

  state.speciesModalOpener = openerEl || null;

  const commonName = openerEl
    ? (openerEl.querySelector(".species-common")?.textContent || scientificName)
    : scientificName;

  if (dom.speciesModalTitle) dom.speciesModalTitle.textContent = commonName;
  if (dom.speciesModalScientific) dom.speciesModalScientific.textContent = scientificName;

  if (dom.speciesModalConservation) {
    dom.speciesModalConservation.textContent = data.conservation;
    dom.speciesModalConservation.dataset.status = data.conservation
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[()]/g, "");
  }

  const matchingImgNode = dom.projectGallery
    ? Array.from(dom.projectGallery.querySelectorAll(".gallery-item img[data-species]")).find(
        (img) => img.dataset.species === scientificName && img.dataset.broken !== "true" && img.complete && img.naturalWidth
      )
    : null;

  if (dom.speciesModalDocumented) {
    dom.speciesModalDocumented.textContent = matchingImgNode ? "Documented" : "Not yet photographed";
    dom.speciesModalDocumented.dataset.state = matchingImgNode ? "documented" : "pending";
  }

  if (dom.speciesModalPhotoWrap) {
    dom.speciesModalPhotoWrap.innerHTML = "";
    if (matchingImgNode) {
      const img = document.createElement("img");
      img.src = matchingImgNode.src;
      img.alt = commonName;
      img.className = "species-modal-photo";
      if (matchingImgNode.naturalWidth > matchingImgNode.naturalHeight) {
        img.classList.add("species-modal-photo--landscape");
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "species-modal-view-btn";
      btn.textContent = "View photo →";
      btn.addEventListener("click", () => {
        closeSpeciesModal();
        openLightboxByImageNode(matchingImgNode);
      });
      dom.speciesModalPhotoWrap.appendChild(img);
      dom.speciesModalPhotoWrap.appendChild(btn);
    }
  }

  if (dom.speciesModalDetails) {
    const fields = [
      { label: "Range", value: data.range },
      { label: "Habitat", value: data.habitat },
      { label: "Diet", value: data.diet },
      { label: "Field marks", value: data.fieldMarks },
      { label: "Behavior", value: data.behavior },
      { label: "Did you know", value: data.funFact },
    ];
    dom.speciesModalDetails.innerHTML = fields
      .map(({ label, value }) => `<dt>${label}</dt><dd>${value}</dd>`)
      .join("");
  }

  dom.speciesModal.classList.add("open");
  dom.speciesModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const focusTarget = dom.speciesModalClose;
  if (focusTarget) requestAnimationFrame(() => focusTarget.focus());
}

function closeSpeciesModal() {
  if (!dom.speciesModal) return;
  dom.speciesModal.classList.remove("open");
  dom.speciesModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (state.speciesModalOpener) {
    state.speciesModalOpener.focus();
    state.speciesModalOpener = null;
  }
}

function initSpeciesCardClicks() {
  document.querySelectorAll(".species-card[data-species]").forEach((card) => {
    if (card.dataset.modalWired) return;
    card.dataset.modalWired = "true";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (e.target.closest(".species-thumb")) return;
      openSpeciesModal(card.dataset.species, card);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSpeciesModal(card.dataset.species, card);
      }
    });
  });
}

function hydrateSpeciesCards() {
  if (!dom.projectGallery) return;
  const cards = document.querySelectorAll(".species-card[data-species]");
  if (!cards.length) return;

  const galleryImgs = Array.from(
    dom.projectGallery.querySelectorAll(".gallery-item img[data-species]")
  );

  cards.forEach((card) => {
    if (card.dataset.hydrated) return;
    const speciesKey = card.dataset.species;
    const matchingImg = galleryImgs.find(
      (img) => img.dataset.species === speciesKey && img.dataset.broken !== "true"
    );
    if (!matchingImg || !matchingImg.complete || !matchingImg.naturalWidth) return;

    card.classList.remove("species-card--pending");
    card.classList.add("species-card--complete");
    card.dataset.hydrated = "true";
    card.style.cursor = "pointer";

    const thumb = document.createElement("img");
    thumb.src = matchingImg.src;
    thumb.alt = "";
    thumb.className = "species-thumb";
    thumb.loading = "lazy";
    thumb.decoding = "async";
    thumb.setAttribute("aria-hidden", "true");
    thumb.title = "View photo";
    card.insertBefore(thumb, card.querySelector(".species-status-dot"));

    thumb.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightboxByImageNode(matchingImg);
    });
  });
}

function updateProjectProgress(projectSlug, totalSpecies) {
  const projectImages = state.orderedGalleryImages.filter(
    (img) => img.project === projectSlug && img.species
  );
  const documentedSpecies = new Set(projectImages.map((img) => img.species));
  const count = documentedSpecies.size;
  const pct = totalSpecies > 0 ? Math.round((count / totalSpecies) * 100) : 0;

  const countEl = document.getElementById("heronProgressCount");
  const barEl = document.querySelector(".project-progress-bar");
  const fillEl = document.querySelector(".project-progress-fill");

  if (countEl) countEl.textContent = `${count} of ${totalSpecies} species documented`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (barEl) {
    barEl.setAttribute("aria-valuenow", String(count));
    barEl.setAttribute("aria-valuemax", String(totalSpecies));
  }
}

function renderCurrentPageGallery() {
  if (pageType === "home") {
    renderFeaturedCarousel(state.orderedGalleryImages);
    renderHomeLocationPreview();
    return;
  }

  if (pageType === "locations") {
    renderLocationsPage();
    return;
  }

  if (pageType === "projects") {
    renderProjectGallery("herons");
    updateProjectProgress("herons", 12);
    initSpeciesCardClicks();
    return;
  }

  renderGallery(state.orderedGalleryImages);
}

function setMobileMenuOpen(isOpen) {
  if (!dom.menuToggle || !dom.mobileMenu) return;
  dom.menuToggle.classList.toggle("burger--active", isOpen);
  dom.menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  dom.mobileMenu.classList.toggle("open", isOpen);
  dom.mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  document.body.style.overflow = isOpen ? "hidden" : "";

  if (isOpen) {
    dom.mobileMenu.querySelector("a")?.focus();
  } else if (document.activeElement && dom.mobileMenu.contains(document.activeElement)) {
    dom.menuToggle.focus();
  }
}

function isMobileMenuOpen() {
  return Boolean(dom.mobileMenu?.classList.contains("open"));
}

function bindGlobalEvents() {
  dom.menuToggle?.addEventListener("click", () => setMobileMenuOpen(!isMobileMenuOpen()));
  dom.mobileMenuClose?.addEventListener("click", () => setMobileMenuOpen(false));
  dom.mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMobileMenuOpen(false)));

  dom.mobileMenu?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = dom.mobileMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  dom.speciesModalClose?.addEventListener("click", closeSpeciesModal);
  dom.speciesModalBackdrop?.addEventListener("click", closeSpeciesModal);

  dom.lightboxClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLightbox();
  });
  dom.lightboxNextZone?.addEventListener("click", (event) => {
    event.stopPropagation();
    showNextImage();
  });
  dom.lightboxPrevZone?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPreviousImage();
  });

  dom.lightbox?.addEventListener("click", (event) => {
    if (!dom.lightbox.classList.contains("open")) return;
    if (event.target.closest(".lightbox-control, .lightbox-tap-zone")) return;
    if (!state.lightboxUiVisible) return revealLightboxUi();
    setLightboxUiVisibility(false);
    clearUiHideTimer();
  });

  dom.lightbox?.addEventListener("pointermove", () => {
    if (dom.lightbox.classList.contains("open")) revealLightboxUi();
  });

  dom.lightbox?.addEventListener("touchstart", (event) => {
    if (!dom.lightbox.classList.contains("open") || !event.touches.length) return;
    state.touchStartX = event.touches[0].clientX;
    state.touchStartY = event.touches[0].clientY;
    revealLightboxUi();
  }, { passive: true });

  dom.lightbox?.addEventListener("touchend", (event) => {
    if (!dom.lightbox.classList.contains("open") || !event.changedTouches.length) return;
    const deltaX = event.changedTouches[0].clientX - state.touchStartX;
    const deltaY = event.changedTouches[0].clientY - state.touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY);
    if (!isHorizontalSwipe) return revealLightboxUi();
    if (deltaX < 0) showNextImage();
    else showPreviousImage();
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileMenuOpen()) {
      setMobileMenuOpen(false);
      return;
    }
    if (event.key === "Escape" && dom.speciesModal?.classList.contains("open")) {
      closeSpeciesModal();
      return;
    }
    if (!dom.lightbox?.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNextImage();
    if (event.key === "ArrowLeft") showPreviousImage();
    revealLightboxUi();
  });

}

function updateActiveNavLink() {
  const navLinks = document.querySelectorAll(".site-nav > a");
  if (!navLinks.length) return;

  if (pageType === "portfolio") {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isPortfolio = href === "portfolio.html" || href.endsWith("/portfolio.html");
      link.classList.toggle("active", isPortfolio);
    });
    return;
  }

  if (pageType === "contact") {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isContact = href === "contact.html" || href.endsWith("/contact.html");
      link.classList.toggle("active", isContact);
    });
    return;
  }

  if (pageType === "about") {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isAbout = href === "about.html" || href.endsWith("/about.html");
      link.classList.toggle("active", isAbout);
    });
    return;
  }

  if (pageType === "projects") {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isProjects = href === "projects.html" || href.endsWith("/projects.html");
      link.classList.toggle("active", isProjects);
    });
    return;
  }

  if (pageType === "locations") {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isLocations = href === "locations.html" || href.endsWith("/locations.html");
      link.classList.toggle("active", isLocations);
    });
    return;
  }

  let currentId = "";
  document.querySelectorAll("section[id]").forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) currentId = section.id;
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === `#${currentId}` || href.endsWith(`#${currentId}`));
  });
}

function initializeScrollReveal() {
  const revealTargets = document.querySelectorAll(".scroll-reveal");
  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((node) => node.classList.add("is-revealed"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

  revealTargets.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    revealObserver.observe(node);
  });
}

function alignInitialHashTarget() {
  if (state.hasAlignedInitialHash || pageType !== "home") return;
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  target.scrollIntoView({ block: "start", behavior: "auto" });
  state.hasAlignedInitialHash = true;
}

function initializeGallery() {
  if (dom.yearNode) dom.yearNode.textContent = new Date().getFullYear();

  bindGlobalEvents();
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  if (pageType === "locations") {
    window.addEventListener("hashchange", renderLocationsPage);
  }

  state.orderedGalleryImages = normalizeGalleryImages(seededShuffle(GALLERY_IMAGES, "v1"));

  renderCurrentPageGallery();
  initializeScrollReveal();
  requestAnimationFrame(alignInitialHashTarget);
}

initializeGallery();
window.addEventListener("load", alignInitialHashTarget);
