const SPECIES_DATA = {
  "Ardea herodias": {
    range: "Found throughout North America from southern Canada to Mexico and the Caribbean. A year-round resident across all of Florida.",
    habitat: "Extremely adaptable — freshwater marshes, swamps, rivers, lakes, ponds, tidal flats, mangroves, and roadside ditches. Found wherever shallow water holds fish.",
    diet: "Primarily fish, but opportunistically takes frogs, snakes, insects, small mammals, and occasionally other birds. Hunts by standing motionless or walking slowly, then striking with a lightning-fast spear of the bill.",
    fieldMarks: "North America's largest heron at 38–54 in tall with a 6-ft wingspan. Blue-gray body, white head with a black stripe extending into a long black plume, yellowish bill. In flight, the neck folds into an S-curve.",
    behavior: "Solitary forager. Nests colonially in tall trees (rookeries) often shared with egrets and cormorants. Gives a harsh, prehistoric 'frahnk' alarm call when flushed. Highly territorial at feeding sites.",
    conservation: "Least Concern",
    funFact: "A Great Blue Heron can strike prey in a fraction of a second — one of the fastest strikes in the animal kingdom relative to body size.",
  },
  "Ardea alba": {
    range: "Found on every continent except Antarctica. Year-round throughout Florida, with large breeding colonies in the Everglades and central Florida lakes.",
    habitat: "Freshwater and saltwater wetlands including marshes, ponds, rivers, tidal flats, swamps, and flooded fields.",
    diet: "Fish, frogs, snakes, aquatic invertebrates, and small mammals. Wades slowly or stands still in shallow water before striking.",
    fieldMarks: "All white plumage, yellow-orange bill, long black legs. About 38 in tall. During breeding season, develops spectacular lacy aigrette plumes extending beyond the tail and a bright green loral patch.",
    behavior: "Defends feeding territories aggressively. Nests colonially in trees, frequently in mixed-species rookeries alongside herons and ibises.",
    conservation: "Least Concern",
    funFact: "The Great Egret's aigrette plumes were so coveted for hat fashion in the 1800s that the species was nearly hunted to extinction. Outrage over this slaughter helped spark the modern conservation movement and led to the founding of the Audubon Society.",
  },
  "Egretta thula": {
    range: "Throughout North and South America — from southern Canada to Argentina, breeding along both the Atlantic and Pacific coasts of the United States. Common year-round resident in Florida, especially along the coasts.",
    habitat: "Saltwater estuaries, tidal marshes, mangroves, freshwater ponds, swamps, and flooded fields.",
    diet: "Fish, shrimp, crayfish, frogs, and insects. Uses a wide variety of active hunting techniques — shuffling feet to flush prey, running and lunging, spreading wings to attract fish with shade.",
    fieldMarks: "All white, slender build, about 22–26 in tall. Black bill, yellow loral patch, and bright yellow feet on black legs — often called 'golden slippers.' Breeding plumage includes elaborate recurved plumes.",
    behavior: "An energetic and active hunter compared to the patient Great Egret. Can be territorial and competitive at feeding sites. Nests colonially in shrubs or low trees, often with other species.",
    conservation: "Least Concern",
    funFact: "Snowy Egrets have been documented using bait — dropping feathers, insects, or other small objects onto the water surface, then snatching the small fish that come to investigate.",
  },
  "Egretta caerulea": {
    range: "Eastern and Gulf Coast United States to South America. Year-round in Florida, with some northward dispersal by young birds in summer.",
    habitat: "Freshwater ponds, swamps, marshes, rivers, and flooded fields; also coastal estuaries and mangroves.",
    diet: "Fish, frogs, crayfish, insects, and other small aquatic animals. Forages slowly and deliberately, often at vegetation margins.",
    fieldMarks: "Adults are slate-blue with a maroon-purple head and neck and a pale bluish bill with a dark tip. About 22–29 in. Juveniles are entirely white — easily confused with Snowy Egret but lacking yellow feet. Immatures pass through a distinctive pied (patchy blue-and-white) phase.",
    behavior: "More solitary and secretive than many herons. Often forages in dense marsh vegetation. Nests in mixed colonies. The year-long presence of all three plumage stages makes this one of Florida's most visually variable herons.",
    conservation: "Least Concern",
    funFact: "White juvenile Little Blue Herons are tolerated by Snowy Egrets at feeding sites — an advantage that allows them to sneak into productive areas. Once they molt into adult plumage, they're treated as competitors and chased off.",
  },
  "Egretta tricolor": {
    range: "Atlantic and Gulf coasts of North America, Central and South America, and the Caribbean. A year-round resident throughout Florida and one of the most common herons along the coast.",
    habitat: "Primarily coastal — saltwater marshes, mangroves, tidal flats, and estuaries. Less common in freshwater habitats inland.",
    diet: "Overwhelmingly fish, supplemented with frogs, lizards, and crustaceans. One of the most active hunters among Florida herons.",
    fieldMarks: "Dark blue-gray head, neck, and back; white belly and stripe down the foreneck; rusty neck streaking. About 24–30 in with a long, slender neck. The white belly contrasting with the dark back is the key field mark in flight.",
    behavior: "A highly animated, aggressive forager. Charges through shallow water, pivots rapidly, spreads wings, and lunges at prey — far more active than the patient Great Blue Heron. Nests in dense coastal colonies.",
    conservation: "Least Concern",
    funFact: "Despite being one of the smaller herons, the Tricolored Heron is one of Florida's most numerous wading birds — and one of the most entertaining to watch hunt.",
  },
  "Egretta rufescens": {
    range: "Gulf Coast of the United States, Caribbean, Mexico, and Central America. In Florida, primarily found along the Gulf Coast, Tampa Bay, the Florida Keys, and the southern tip of the peninsula.",
    habitat: "Shallow, open saltwater flats, mangrove lagoons, and coastal estuaries. Rarely ventures far from saltwater.",
    diet: "Almost entirely fish. Targets shallow-water species using a spectacular and highly active hunting style unlike any other heron.",
    fieldMarks: "Two color morphs: the dark morph has a slate-gray body with a shaggy reddish-brown head and neck; the rare white morph is all white. Both have a distinctive bicolored bill (pink base, dark tip) and blue-gray legs. About 27–32 in tall.",
    behavior: "Famous for frantic 'canopy feeding' — dashing, lunging, spinning, and spreading wings like an umbrella over the water to reduce glare and startle fish into the open. No other Florida heron hunts quite like it.",
    conservation: "Near Threatened",
    funFact: "The Reddish Egret is one of the rarest herons in North America, with fewer than 2,000 nesting pairs in the United States. Florida's coastal flats are among the best places in the world to observe this species.",
  },
  "Bubulcus ibis": {
    range: "Originally native to sub-Saharan Africa and southern Asia. Spread naturally to South America in the 1800s and reached North America by the 1940s. Now found worldwide; common year-round throughout Florida.",
    habitat: "Dry fields, pastures, roadsides, and agricultural land — very unlike most herons. Follows cattle, horses, tractors, and lawn mowers to catch the insects they flush.",
    diet: "Primarily grasshoppers and other large insects. Also takes frogs, small lizards, and occasionally nestlings. Studies show Cattle Egrets forage 50% more efficiently when following large animals.",
    fieldMarks: "Compact, stocky, all-white egret. Non-breeding birds are pure white with a yellow bill and legs. Breeding adults develop buffy-orange plumes on the head, breast, and back; the bill and legs turn orange-red briefly at peak courtship.",
    behavior: "Highly social — often seen in large flocks. Nests in dense colonies, frequently with other herons and ibises. One of the most successful colonizers in avian history; its global range expansion is still ongoing.",
    conservation: "Least Concern",
    funFact: "Cattle Egrets crossed the Atlantic from Africa to South America on their own in the late 19th century — no human help required. They reached Florida by the 1950s and have become one of the most familiar birds in the state.",
  },
  "Butorides virescens": {
    range: "North and Central America and the Caribbean. Year-round in Florida, particularly common in wooded wetlands and along tree-lined waterways.",
    habitat: "Forested wetlands, mangroves, stream banks, pond edges, and any wooded shoreline with dense overhanging vegetation. Prefers cover and avoids open water.",
    diet: "Fish, frogs, crayfish, insects, and other small invertebrates. Hunts by perching motionless on a low branch or root just above the water and striking downward.",
    fieldMarks: "Small and compact at 16–18 in. Deep greenish-black cap, chestnut neck, dark green-gray back, and short orange-yellow legs (may turn bright orange in breeding season). Often appears hunched at rest.",
    behavior: "Secretive and solitary. When alarmed, stretches neck upward and flicks its tail. One of very few birds known to use tools.",
    conservation: "Least Concern",
    funFact: "Green Herons are among a tiny handful of bird species that use tools. They have been observed manufacturing lures from feathers, leaves, and even bread, then actively repositioning the lure if it drifts away from a good fishing spot.",
  },
  "Nycticorax nycticorax": {
    range: "Found on every continent except Australia and Antarctica. Year-round in Florida, often roosting in large communal groups.",
    habitat: "Freshwater marshes, swamps, mangroves, wooded wetlands, and coastal bays. Roosts and nests in dense vegetation, often in trees directly over water.",
    diet: "Fish, frogs, aquatic invertebrates, insects, and occasionally eggs and chicks of other colonial waterbirds. Will also take small mammals and carrion.",
    fieldMarks: "Stocky with a short neck and a large head. Black cap and back, gray wings, white underparts, red eyes. Two to three long white head plumes in breeding plumage. About 23–26 in. Juveniles are heavily streaked brown.",
    behavior: "Primarily crepuscular and nocturnal — most active at dusk, dawn, and through the night. Roosts communally during the day. Call is a distinctive, barking 'quok' frequently heard near wetlands after dark.",
    conservation: "Least Concern",
    funFact: "Black-crowned Night-Herons have been documented stealing food from other herons, egrets, and even ducks. They have also been observed using bread as bait to catch fish — one of only a handful of herons known to fish with lures.",
  },
  "Nyctanassa violacea": {
    range: "Eastern North America, the Caribbean, Central America, and parts of South America. Year-round in Florida, especially common in coastal and mangrove habitats.",
    habitat: "Mangroves, coastal marshes, tidal flats, wooded swamps, and estuaries. More closely tied to saltwater and brackish environments than the Black-crowned Night-Heron.",
    diet: "A specialist in crustaceans — primarily crabs, crayfish, and shrimp. Also takes fish, insects, frogs, and small vertebrates. Its heavier, more powerful bill is adapted for crushing hard-shelled prey.",
    fieldMarks: "Gray body, bold black-and-white facial pattern, pale yellow crown stripe (brightest in breeding adults). Stocky like the Black-crowned, but with a longer neck, longer legs, and a heavier bill. About 21–28 in. Juveniles are dark brown with fine white streaking.",
    behavior: "More crepuscular than fully nocturnal — often active through the day along mangrove edges. Typically more solitary than the Black-crowned. Nests in mangroves and coastal trees.",
    conservation: "Least Concern",
    funFact: "Yellow-crowned Night-Herons can expertly dismantle crabs — breaking off the claws and legs, crushing the carapace, and swallowing the pieces. They have been observed working on a single crab for several minutes before consuming it.",
  },
  "Ardea herodias occidentalis": {
    range: "Found almost exclusively in the Florida Keys, Florida Bay, and the coastal mangroves of extreme southern Florida — the most geographically restricted heron in North America. Rarely wanders to the Gulf Coast or the Dry Tortugas.",
    habitat: "Open saltwater bays, tidal flats, mangrove shorelines, and shallow coastal waters. Almost never found in freshwater environments.",
    diet: "Primarily large fish. Hunts with the same patient, stand-and-wait style as the Great Blue Heron, but almost exclusively in marine environments.",
    fieldMarks: "All white plumage and the same massive size as the Great Blue Heron (38–54 in, 6-ft wingspan) — making it the largest all-white heron in Florida. Yellow bill, pale yellow legs. Lacks the dark legs of the Great Egret.",
    behavior: "Generally less wary than Great Blue Herons and may allow a close approach. Tends to be solitary. Often seen wading on expansive open tidal flats. Most taxonomists treat it as a white color morph of Ardea herodias rather than a full species.",
    conservation: "Special Concern (Florida)",
    funFact: "The Great White Heron is not an albino — it is a genetically distinct white morph found only in the hyper-saline environments of extreme South Florida. It occasionally interbreeds with the Great Blue Heron, producing a rare intermediate form called the 'Würdemann's Heron.'",
  },
  "Ixobrychus exilis": {
    range: "Eastern and central North America, Central America, and parts of South America. Year-round in Florida, though easily overlooked due to its secretive habits.",
    habitat: "Dense freshwater marshes dominated by tall emergent vegetation — cattails, bulrushes, and giant reed. Requires thick stands of reeds for cover and almost never ventures into the open.",
    diet: "Primarily small fish, frogs, and insects. Hunts by perching on reed stems directly above the water and striking downward.",
    fieldMarks: "North America's smallest heron at just 11–14 in — barely larger than a Red-winged Blackbird. Buff underparts, chestnut neck, large pale buff wing patches. Males have a black cap and back; females are streaked brown. Greenish-yellow bill and legs.",
    behavior: "Extraordinarily secretive. Climbs through reeds using its large grasping feet. When alarmed, freezes with bill pointed skyward, blending perfectly into the stems. Far more often heard (a low cooing call) than seen.",
    conservation: "Least Concern",
    funFact: "Least Bitterns can compress their bodies to fit through gaps between reed stems that seem impossibly narrow. This 'reed-walking' ability, gripping two stems simultaneously and inching between them, is unique among North American herons.",
  },
};

// Edit these to add or change photos.
// Duplicate an entry to add a photo. Remove an entry to remove it.
// - src:         full image URL
// - alt:         describe the photo (used in lightbox caption)
// - is_featured: true = shows in the homepage carousel
// - project:     project slug, e.g. "herons" — adds photo to that project gallery
// - species:     scientific name, e.g. "Ardea herodias" — links photo to species card
const GALLERY_IMAGES = [
  {
    src: "https://live.staticflickr.com/65535/55275393790_e70c958e89_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55274997711_a476e4b222_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55275129113_70d94a57ca_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55275393450_ec5b55797a_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55274080112_6213a4d98d_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55275128673_79dac08b00_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55250254275_f0fc9c0970_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55174862805_526015f4ef_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55268958145_c1c8cb087b_b.jpg",
    alt: "Yellow-crowned Night-Heron",
    is_featured: true,
    project: "herons",
    species: "Nyctanassa violacea",
  },
  {
    src: "https://live.staticflickr.com/65535/55268957900_7aff49f7d3_b.jpg",
    alt: "Yellow-crowned Night-Heron",
    is_featured: true,
    project: "herons",
    species: "Nyctanassa violacea",
  },
  {
    src: "https://live.staticflickr.com/65535/55267648392_f20c890bff_b.jpg",
    alt: "Great Blue Heron",
    is_featured: true,
    project: "herons",
    species: "Ardea herodias",
  },
  {
    src: "https://live.staticflickr.com/65535/55269065449_aafc10cc7a_b.jpg",
    alt: "Snowy Egret",
    is_featured: true,
    project: "herons",
    species: "Egretta thula",
  },
  {
    src: "https://live.staticflickr.com/65535/55249900291_75c53ab3e9_b.jpg",
    alt: "Great Egret",
    is_featured: true,
    project: "herons",
    species: "Ardea alba",
  },
  {
    src: "https://live.staticflickr.com/65535/55249990758_8bf1386914_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55249847956_9420a2b4ba_b.jpg",
    alt: "Photography by Brandon Alley",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55225222323_4a86a6f175_b.jpg",
    alt: "Jae & Sandra Vow Renewal",
    is_featured: true,
  },
  {
    src: "https://live.staticflickr.com/65535/55201917211_89fd523944_b.jpg",
    alt: "Snowy Egret",
    is_featured: true,
    project: "herons",
    species: "Egretta thula",
  },
  {
    src: "https://live.staticflickr.com/65535/55198152423_a55f5c0f74_b.jpg",
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
    src: "https://live.staticflickr.com/65535/55174718119_fcc96e9679_b.jpg",
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
  const galleryEl = dom.projectGallery || dom.gallery;
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
