# ABNA – A Biztosítás Nem Alszik!

Static website for Szabó Balázs Márton's insurance advisory in Tata. Plain HTML, CSS and
JavaScript: no build step and no third-party scripts. Fonts and icons are self-hosted.
Upload the folder to any static host (it expects to sit at the domain root, e.g. `https://abna.hu/`).

## Before going live

1. **Photo.** Save the advisor's portrait as `img/szabo-balazs-marton.jpg` (portrait 4:5, about
   880×1100 px, under 200 KB). Until then the page tries the old `abna.hu/images/...` URL, and if
   that also fails it shows a monogram placeholder.
2. **Privacy notice and imprint.** Fill in every highlighted *kitöltendő* field in `adatvedelem.html`:
   business form, tax number, MNB intermediary registration number, partner insurer, hosting provider,
   and confirm the data-retention period.
3. **Confirm the claims.** These are taken from the old site and need to be true: 500+ clients,
   10+ years, "5 csillagos értékelések", the three testimonials, 24-hour response time. One more:
   the form pages say "Mi összehasonlítjuk az ajánlatokat" (we compare offers), but the About section
   says he works with one international insurer. Check which wording is accurate.
4. **Forms.** By default, submitting a form opens the visitor's email app with a pre-filled message
   to `hello@abna.hu`. To receive submissions directly instead, create a form endpoint
   (e.g. [Formspree](https://formspree.io)) and add `action="https://formspree.io/f/…"` to the
   `<form class="abna-form">` in each `felmero*.html`. The script then posts with `fetch` and shows
   the thank-you state, or an error message with the phone number if sending fails.

## Editing

- **Page content** lives in each page's `<main>`.
- **Header, footer and `<head>`** are shared. Edit the templates in `tools/chrome.py` and run
  `python3 tools/chrome.py`, which rewrites everything outside `<main>` on every page.
- **Icons**: `img/icons.svg` is a sprite of [Lucide](https://lucide.dev) icons (ISC licence).
  Use one with `<svg class="icon" aria-hidden="true"><use href="img/icons.svg#i-phone"></use></svg>`.
- **Design tokens** (colours, type, spacing, motion) are at the top of `css/style.css`. See `DESIGN.md`.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home page |
| `lakas.html`, `kgfb.html`, `elet.html` | Product pages |
| `felmero*.html` | Quote request forms (one per product + general contact) |
| `adatvedelem.html` | Privacy notice and imprint |
| `404.html` | Not-found page (configure your host to serve it) |
| `css/style.css`, `js/main.js` | Styles and behaviour |
| `fonts/` | Schibsted Grotesk and Inter (SIL Open Font License), latin + latin-ext |
| `img/` | Icon sprite, favicon, touch icon, social share image |
| `robots.txt`, `sitemap.xml` | Search engines |
