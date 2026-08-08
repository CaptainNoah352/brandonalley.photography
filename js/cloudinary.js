// Cloudinary delivery URL helpers shared by the public site and admin panel.
// The cloud name is public delivery configuration; never put an API secret here.

function getCloudinaryConfig() {
  return typeof CLOUDINARY_CONFIG !== "undefined" ? CLOUDINARY_CONFIG : {};
}

function cloudinaryImageUrl(photo, options = {}) {
  if (!photo) return "";
  const config = getCloudinaryConfig();
  const publicId = String(photo.cloudinaryPublicId || "").trim();
  const cloudName = String(config.cloudName || "").trim();

  if (!publicId || !cloudName) return String(photo.src || photo.image_url || "").trim();

  const width = Number(options.width || 0);
  const baseTransformations = options.original
    ? ["q_auto:best", "f_auto"]
    : ["q_auto:good", "f_auto", "dpr_auto", ...(width ? [`c_limit`, `w_${Math.round(width)}`] : [])];
  const transformations = options.transformations || baseTransformations.join(",");
  const version = photo.cloudinaryVersion ? `/v${photo.cloudinaryVersion}` : "";
  const encodedId = publicId.split("/").map(encodeURIComponent).join("/");

  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/${transformations}${version}/${encodedId}`;
}

function cloudinarySrcset(photo, widths = [640, 1024, 1600, 2400]) {
  if (!photo?.cloudinaryPublicId || !getCloudinaryConfig().cloudName) return "";
  return widths.map((width) => `${cloudinaryImageUrl(photo, { width })} ${width}w`).join(", ");
}
