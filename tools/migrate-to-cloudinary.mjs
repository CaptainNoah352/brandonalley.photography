import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(repoRoot, "photo-data.js");
const apply = process.argv.includes("--apply");
const connection = process.env.CLOUDINARY_URL || "";

if (!apply) {
  console.log("Preview only: no assets were uploaded. Re-run with --apply and CLOUDINARY_URL set.");
  process.exit(0);
}

const match = connection.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
if (!match) {
  throw new Error("Set CLOUDINARY_URL to cloudinary://API_KEY:API_SECRET@CLOUD_NAME (do not commit it).");
}

const [, apiKey, apiSecret, cloudName] = match;
let source = await fs.readFile(dataPath, "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(source, context);
const photos = context.GALLERY_IMAGES || [];
let uploaded = 0;

for (const photo of photos) {
  if (photo.cloudinaryPublicId || !photo.src) continue;
  const publicId = `portfolio/photo-${photo.id}`;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`overwrite=false&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  const body = new FormData();
  body.set("file", photo.src);
  body.set("api_key", apiKey);
  body.set("timestamp", String(timestamp));
  body.set("public_id", publicId);
  body.set("overwrite", "false");
  body.set("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`, {
    method: "POST",
    body,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Photo #${photo.id}: ${result.error?.message || response.statusText}`);

  const srcLine = `    src: ${JSON.stringify(photo.src)},`;
  const replacement = `    cloudinaryPublicId: ${JSON.stringify(result.public_id)},\n` +
    `    cloudinaryVersion: ${result.version},\n${srcLine}`;
  if (!source.includes(srcLine)) throw new Error(`Could not update photo #${photo.id} in photo-data.js`);
  source = source.replace(srcLine, replacement);
  uploaded += 1;
  console.log(`Uploaded photo #${photo.id} as ${result.public_id}`);
}

source = source.replace(/cloudName: "[^"]*"/, `cloudName: ${JSON.stringify(cloudName)}`);
await fs.writeFile(dataPath, source);
console.log(`Migrated ${uploaded} photo${uploaded === 1 ? "" : "s"} to Cloudinary.`);
