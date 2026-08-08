// Main site entry point. Feature logic lives in the js/ files loaded before this file.

function renderCurrentPageGallery() {
  if (pageType === "home") {
    renderHomepageHero(state.orderedGalleryImages);
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

function alignInitialHashTarget() {
  if (state.hasAlignedInitialHash || pageType !== "home") return;
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  target.scrollIntoView({ block: "start", behavior: "auto" });
  state.hasAlignedInitialHash = true;
}

function getPublicGalleryImages() {
  return GALLERY_IMAGES.filter((image) => image.usage !== "about");
}

function initializeGallery() {
  if (dom.yearNode) dom.yearNode.textContent = new Date().getFullYear();

  bindGlobalEvents();
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  if (pageType === "locations") {
    window.addEventListener("hashchange", renderLocationsPage);
  }

  state.orderedGalleryImages = normalizeGalleryImages(seededShuffle(getPublicGalleryImages(), "v1"));

  const aboutPortrait = document.getElementById("aboutPortraitImage");
  const aboutPhoto = normalizeGalleryImages(GALLERY_IMAGES.filter((image) => image.usage === "about"))[0];
  if (aboutPortrait && aboutPhoto) {
    aboutPortrait.src = aboutPhoto.src;
    if (aboutPhoto.srcset) aboutPortrait.srcset = aboutPhoto.srcset;
    aboutPortrait.sizes = "(max-width: 700px) 100vw, 50vw";
    aboutPortrait.alt = aboutPhoto.alt;
  }

  renderCurrentPageGallery();
  initializeScrollReveal();
  requestAnimationFrame(alignInitialHashTarget);
}

initializeGallery();
window.addEventListener("load", alignInitialHashTarget);
