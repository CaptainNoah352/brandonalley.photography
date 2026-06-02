import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const FLICKR_USER_ID = "204244048@N05";
const FEED_URL = `https://www.flickr.com/services/feeds/photos_public.gne?id=${FLICKR_USER_ID}&format=json&nojsoncallback=1`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const dataPath = path.join(repoRoot, "photo-data.js");
const shouldApply = process.argv.includes("--apply");
const limitArgIndex = process.argv.indexOf("--limit");
const limit = limitArgIndex >= 0 ? Number(process.argv[limitArgIndex + 1]) : 20;

function decodeHtml(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value) {
  return decodeHtml(String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function metaContent(html, key) {
  const patternA = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`, "i");
  const patternB = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`, "i");
  return decodeHtml((html.match(patternA) || html.match(patternB) || [])[1] || "");
}

function exifRows(html) {
  const rows = {};
  for (const match of html.matchAll(/<tr[^>]*>\s*<th[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi)) {
    rows[stripHtml(match[1])] = stripHtml(match[2]);
  }
  return rows;
}

function flickrIdFromUrl(value) {
  const text = String(value || "");
  return (text.match(/\/photos\/[^/]+\/(\d+)/) || text.match(/\/65535\/(\d+)_/) || [])[1] || "";
}

function fullImageUrl(value) {
  return String(value || "").replace(/_[a-z]\.jpg$/i, "_b.jpg");
}

function shutterFromExposure(value) {
  return (String(value || "").match(/\(([^)]+)\)/) || [])[1] || String(value || "").replace(/\s*sec.*/i, "").trim();
}

function jsString(value) {
  return JSON.stringify(String(value || ""));
}

function formatPhoto(photo) {
  return [
    "  {",
    `    id: ${photo.id},`,
    `    src: ${jsString(photo.src)},`,
    `    alt: ${jsString(photo.alt)},`,
    `    is_featured: ${photo.is_featured},`,
    "  },",
  ].join("\n");
}

function formatMetadataEntry(id, metadata) {
  const fields = [
    `flickrId: ${jsString(metadata.flickrId)}`,
    `title: ${jsString(metadata.title)}`,
    `dateTaken: ${jsString(metadata.dateTaken)}`,
    `width: ${jsString(metadata.width)}`,
    `height: ${jsString(metadata.height)}`,
  ].filter(Boolean);
  return `  ${id}: { ${fields.join(", ")} },`;
}

function formatCameraEntry(id, camera) {
  const fields = [
    ["camera", camera.camera],
    ["lens", camera.lens],
    ["shutter", camera.shutter],
    ["aperture", camera.aperture],
    ["iso", camera.iso],
    ["focalLength", camera.focalLength],
    ["flash", camera.flash],
    ["exposureMode", camera.exposureMode],
    ["meteringMode", camera.meteringMode],
    ["whiteBalance", camera.whiteBalance],
  ]
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${jsString(value)}`);

  return fields.length ? `  ${id}: { ${fields.join(", ")} },` : "";
}

async function fetchPhoto(link, feedItem) {
  const response = await fetch(link);
  const html = await response.text();
  if (!response.ok) throw new Error(`Flickr returned ${response.status} for ${link}`);

  const imageUrl = fullImageUrl(metaContent(html, "og:image") || feedItem.media?.m || "");
  const stats = html.match(/"photo-stats-models":\[\{"data":\{[^}]*?"dateTaken":"([^"]*)","datePosted":"([^"]*)","id":"([^"]*)"/);
  let exif = {};
  try {
    const metaResponse = await fetch(`${link.replace(/\/?$/, "/")}meta`);
    exif = exifRows(await metaResponse.text());
  } catch {
    exif = {};
  }

  return {
    photo: {
      src: imageUrl,
      alt: "Photography by Brandon Alley",
      is_featured: false,
    },
    metadata: {
      flickrId: flickrIdFromUrl(link),
      title: metaContent(html, "og:title") || feedItem.title || "",
      dateTaken: stats?.[1] || feedItem.date_taken || "",
      width: metaContent(html, "og:image:width"),
      height: metaContent(html, "og:image:height"),
    },
    camera: {
      camera: exif.Camera || "",
      lens: exif.Lens || exif["Lens Model"] || "",
      shutter: shutterFromExposure(exif.Exposure),
      aperture: exif.Aperture || exif["F-Number"] || "",
      iso: exif["ISO Speed"] || exif.ISO || exif["Recommended Exposure Index"] || "",
      focalLength: exif["Focal Length"] || "",
      flash: exif.Flash === "No Flash" ? "Flash (off, did not fire)" : exif.Flash || "",
      exposureMode: exif["Exposure Mode"] || exif["Exposure Program"] || "",
      meteringMode: exif["Metering Mode"] || "",
      whiteBalance: exif["White Balance"] || "",
    },
  };
}

function loadSiteData(source) {
  const context = {};
  vm.createContext(context);
  vm.runInContext(source, context);
  return context;
}

function appendGalleryImage(source, photo) {
  return source.replace(/\r?\n\];\r?\n\r?\nvar FLICKR_METADATA = /, `\n${formatPhoto(photo)}\n];\n\nvar FLICKR_METADATA = `);
}

function appendMetadata(source, id, metadata) {
  return source.replace(/\r?\n\};\r?\n\r?\nvar FLICKR_CAMERA_METADATA = /, `\n${formatMetadataEntry(id, metadata)}\n};\n\nvar FLICKR_CAMERA_METADATA = `);
}

function appendCameraMetadata(source, id, camera) {
  const entry = formatCameraEntry(id, camera);
  if (!entry) return source;
  return source.replace(/\r?\n\};\s*$/, `\n${entry}\n};\n`);
}

const source = await fs.readFile(dataPath, "utf8");
const site = loadSiteData(source);
const gallery = Array.isArray(site.GALLERY_IMAGES) ? site.GALLERY_IMAGES : [];
const flickrMetadata = site.FLICKR_METADATA || {};
const existingFlickrIds = new Set([
  ...gallery.map((photo) => flickrIdFromUrl(photo.src)).filter(Boolean),
  ...Object.values(flickrMetadata).map((entry) => entry?.flickrId).filter(Boolean),
]);
let nextPhotoId = Math.max(0, ...gallery.map((photo) => Number(photo.id) || 0)) + 1;

const feed = await fetch(FEED_URL).then((response) => response.json());
const items = Array.isArray(feed.items) ? feed.items.slice(0, limit) : [];
const newItems = items.filter((item) => {
  const id = flickrIdFromUrl(item.link);
  return id && !existingFlickrIds.has(id);
});

let updated = source;
const added = [];
const skipped = [];

for (const item of newItems) {
  try {
    const fetched = await fetchPhoto(item.link, item);
    const id = nextPhotoId;
    nextPhotoId += 1;
    fetched.photo.id = id;
    existingFlickrIds.add(fetched.metadata.flickrId);

    updated = appendGalleryImage(updated, fetched.photo);
    updated = appendMetadata(updated, id, fetched.metadata);
    updated = appendCameraMetadata(updated, id, fetched.camera);

    added.push({
      id,
      flickrId: fetched.metadata.flickrId,
      title: fetched.metadata.title,
      src: fetched.photo.src,
    });
    await new Promise((resolve) => setTimeout(resolve, 120));
  } catch (error) {
    skipped.push({ link: item.link, reason: error.message });
  }
}

if (shouldApply && added.length) {
  await fs.writeFile(dataPath, updated, "utf8");
}

console.log(JSON.stringify({
  dryRun: !shouldApply,
  checked: items.length,
  newPhotosFound: newItems.length,
  photosAdded: shouldApply ? added.length : 0,
  nextPhotoId,
  added,
  skipped,
}, null, 2));
