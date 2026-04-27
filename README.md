# Brandon Alley Photography

Static photography portfolio site built with plain HTML, CSS, and JavaScript. It can be opened directly in a browser or deployed from the repository root on GitHub Pages.

## Project Structure

```text
.
|-- index.html          # Homepage with featured carousel, About, Contact, and lightbox
|-- portfolio.html      # Full gallery page with lightbox
|-- style.css           # Shared site styling
|-- script.js           # Gallery data, carousel, mobile menu, and lightbox
|-- logo-component.html # Standalone logo markup
|-- CNAME               # Custom domain for GitHub Pages
`-- README.md           # Project notes
```

## Editing Photos

Add, remove, or reorder photos in the `GALLERY_IMAGES` array near the top of `script.js`.

Each photo supports:

```js
{
  src: "https://example.com/photo.jpg",
  alt: "Short image description",
  is_featured: true
}
```

Use `is_featured: true` to include a photo in the homepage carousel.

## Local Preview

You can open `index.html` directly, or run a small local server:

```bash
python -m http.server 3000
```

Then visit `http://localhost:3000`.

## Checks

Validate the JavaScript with:

```bash
node --check script.js
```

## Deploy

No build step is required. For GitHub Pages, deploy from the repository root.
