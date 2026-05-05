// Edit these to add or change photos.
// Duplicate an entry to add a photo. Remove an entry to remove it.
// - src:         full image URL
// - alt:         describe the photo (used in lightbox caption)
// - is_featured: true = shows in the homepage carousel
const GALLERY_IMAGES = [
  {
    src: "https://live.staticflickr.com/65535/55225222323_4a86a6f175_b.jpg",
    alt: "Jae & Sandra Vow Renewal",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55201917211_89fd523944_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55198152423_a55f5c0f74_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55198253464_4d51f096c6_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55198253354_35cd84e9f9_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55197113802_cb0715fa72_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55198151633_86139082e9_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55180946771_7b699ca1e8_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55181203194_3b584271e8_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55174718119_fcc96e9679_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55174862805_62b4b2bb62_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55174717824_9f229d66e3_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55141237211_d22ab4de9a_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55139720299_06e2216dc4_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
];

const pageType = document.body?.dataset?.page || "home";

const dom = {
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  mobileMenuClose: document.getElementById("mobileMenuClose"),
  yearNode: document.getElementById("year"),
  gallery: document.getElementById("gallery"),
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

function refreshLightboxItems() {
  if (dom.homeCarousel) {
    state.availableLightboxItems = Array.from(
      dom.homeCarousel.querySelectorAll(".carousel-slide img")
    ).filter((img) => img.dataset.broken !== "true");
    return;
  }
  if (!dom.gallery) return;
  state.availableLightboxItems = Array.from(
    dom.gallery.querySelectorAll(".gallery-item img")
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
    emptyState.innerHTML = `<h3>No photos yet</h3><p>Add image URLs to the GALLERY_IMAGES array in script.js to populate this gallery.</p>`;
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
    img.addEventListener("load", refreshLightboxItems);
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

  function goToSlide(index) {
    dom.carouselTrack.children[currentIndex]?.classList.remove("is-active");
    dom.carouselDots.children[currentIndex]?.classList.remove("is-active");
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    const activeSlide = dom.carouselTrack.children[currentIndex];
    activeSlide?.classList.add("is-active");
    dom.carouselDots.children[currentIndex]?.classList.add("is-active");
    if (activeSlide) {
      const padLeft = parseFloat(getComputedStyle(dom.homeCarousel).paddingLeft) || 0;
      dom.carouselTrack.style.transform = `translateX(-${activeSlide.offsetLeft - padLeft}px)`;
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

  startAuto();
}


function renderCurrentPageGallery() {
  if (pageType === "home") {
    renderFeaturedCarousel(state.orderedGalleryImages);
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

  state.orderedGalleryImages = normalizeGalleryImages(seededShuffle(GALLERY_IMAGES, "v1"));

  renderCurrentPageGallery();
  initializeScrollReveal();
  requestAnimationFrame(alignInitialHashTarget);
}

initializeGallery();
window.addEventListener("load", alignInitialHashTarget);
