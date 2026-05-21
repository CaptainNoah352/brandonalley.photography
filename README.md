# Brandon Alley Photography

Static photography portfolio site built with plain HTML, CSS, and JavaScript. Deployed from the repository root on GitHub Pages.

## Project Structure

```text
.
|-- index.html          # Homepage with featured carousel, About, Contact, and lightbox
|-- portfolio.html      # Full gallery page with lightbox
|-- projects.html       # Herons of Florida project page
|-- about.html          # About page
|-- contact.html        # Contact page
|-- photo-data.js       # All photo and species data — edit this file to change photos
|-- script.js           # Gallery rendering, carousel, lightbox, and mobile menu
|-- style.css           # Shared site styling
|-- admin.html          # Admin reference panel (read-only photo viewer with ID numbers)
|-- admin.js            # Admin panel logic
|-- admin.css           # Admin panel styles
|-- logo-component.html # Standalone logo markup
|-- CNAME               # Custom domain for GitHub Pages
`-- README.md           # Project notes
```

---

## Admin Panel

Open `admin.html` in a browser (or at `yourdomain.com/admin.html`) to see every photo with its reference number, thumbnail, and current metadata.

The panel is **read-only** — it shows what's in `photo-data.js`. To change anything, tell Claude which photo number to update (see workflows below).

**Filters:**
- **Project** — show only photos in a specific project (e.g., "herons")
- **Featured** — show only photos marked as carousel-featured

---

## Photo Reference Numbers

Every photo has a stable `id` number (1–25 for the current set). These numbers:

- **Never change** — even if you reorder or delete other photos
- **Are never reused** — a deleted photo's number stays retired
- **Always grow** — new photos get the next available integer

Use these numbers when talking to Claude: *"Update photo #7"*, *"Remove photo #12"*, *"Add a species tag to photo #5"*.

---

## Photo Fields Reference

All photo data lives in the `GALLERY_IMAGES` array in `photo-data.js`.

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Stable integer. Never change or reuse. New photos get the next number after the last entry. |
| `src` | Yes | Full Flickr image URL (use `_b.jpg` suffix for full resolution) |
| `alt` | Yes | Photo description — shown as the lightbox caption |
| `is_featured` | No | `true` = included in the homepage carousel |
| `project` | No | Project slug (e.g. `"herons"`) — adds the photo to that project gallery |
| `species` | No | Scientific name (e.g. `"Ardea herodias"`) — links the photo to its species card in Projects |

**Example:**
```js
{
  id: 26,
  src: "https://live.staticflickr.com/65535/PHOTOID_HASH_b.jpg",
  alt: "Great Blue Heron wading at sunrise",
  is_featured: true,
  project: "herons",
  species: "Ardea herodias",
},
```

---

## Workflows

### Adding New Photos from Flickr

1. Upload your photos to Flickr as usual.
2. Copy the Flickr page URLs for the new photos (e.g. `https://www.flickr.com/photos/204244048@N05/12345678901/`).
3. Tell Claude:

   > "Add new photos from my Flickr. Here are the photo page URLs: [paste URLs]"

   Claude will fetch the `_b.jpg` download URLs from each Flickr page, append new entries to `GALLERY_IMAGES` in `photo-data.js` with the next available IDs, then commit and push. The site updates automatically.

**Tip:** You can also paste the direct `_b.jpg` image URLs if you already have them from Flickr's "All sizes" page or the embed code.

---

### Updating Photo Metadata

1. Open `admin.html` to find the photo number.
2. Tell Claude what to change, referencing the number:

   > "Update photo #7 alt text to 'Great Blue Heron at sunrise, Ocala National Forest'"

   > "Set photo #16 is_featured to false"

   > "Add project 'herons' and species 'Ardea herodias' to photo #11"

   > "Remove photo #3"

Claude edits `photo-data.js`, commits, and pushes. The site updates automatically.

---

### Updating Species Metadata (Herons Project)

Species data lives in the `SPECIES_DATA` object in `photo-data.js`. Each entry has: `range`, `habitat`, `diet`, `fieldMarks`, `behavior`, `conservation`, `funFact`.

Tell Claude:

> "Update the funFact for Great Blue Heron (Ardea herodias) to: '...'"

> "Change the conservation status for Reddish Egret to 'Least Concern'"

---

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 3000
```

Then visit `http://localhost:3000`.

---

## Checks

Validate JavaScript syntax:

```bash
node --check script.js
node --check photo-data.js
```

> Note: `node --check` validates syntax only. `GALLERY_IMAGES` and `SPECIES_DATA` appear undefined in `script.js` because they are loaded by a preceding `<script>` tag in the browser — this is expected and not an error.

---

## Deploy

No build step required. Deploy from the repository root to GitHub Pages.
