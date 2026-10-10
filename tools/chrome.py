"""Shared page chrome for the ABNA static site.

The site is plain HTML with no build step. This script keeps the <head>,
header, mobile menu and footer identical across pages: edit the templates
below, then run  `python3 tools/chrome.py`  from the repo root. It rewrites
everything outside <main> in each page and leaves the page content alone.
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://abna.hu"
PHONE = "+36 30 360 3390"
PHONE_HREF = "tel:+36303603390"
EMAIL = "hello@abna.hu"


def icon(name, cls="icon"):
    return f'<svg class="{cls}" aria-hidden="true"><use href="img/icons.svg#i-{name}"></use></svg>'


NAV = [
    ("lakas.html", "Lakás", "house", "Lakásbiztosítás"),
    ("kgfb.html", "KGFB", "car", "KGFB és casco"),
    ("elet.html", "Élet és baleset", "heart-pulse", "Élet- és balesetbiztosítás"),
    ("index.html#rolunk", "Rólunk", "user", "Rólunk"),
    ("felmero.html", "Kapcsolat", "mail", "Kapcsolat és ajánlatkérés"),
]

# Which nav entry is "current" for each page (form pages belong to their product).
SECTION = {
    "lakas.html": "lakas.html", "felmero-lakas.html": "lakas.html",
    "kgfb.html": "kgfb.html", "felmero-kgfb.html": "kgfb.html",
    "elet.html": "elet.html", "felmero-elet.html": "elet.html",
    "felmero.html": "felmero.html",
}

LOGO = f"""<a href="index.html" class="logo" aria-label="ABNA – főoldal">
        <span class="logo-mark" aria-hidden="true">{icon("shield-check")}</span>
        <span class="logo-text">
          <span class="logo-name">ABNA</span>
          <span class="logo-sub">A Biztosítás Nem Alszik</span>
        </span>
      </a>"""


def head(page, meta):
    title = meta["title"]
    desc = meta["description"]
    url = SITE + "/" + ("" if page == "index.html" else page)
    extra = meta.get("extra_head", "")
    robots = '\n  <meta name="robots" content="noindex" />' if meta.get("noindex") else ""
    # The 404 page is served at arbitrary paths, so resolve its relative URLs from the site root.
    base = '\n  <base href="/" />' if page == "404.html" else ""
    return f"""<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />{base}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />{robots}
  <link rel="canonical" href="{url}" />
  <meta name="theme-color" content="#0b1a3f" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ABNA – A Biztosítás Nem Alszik!" />
  <meta property="og:locale" content="hu_HU" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{meta.get("og_title", title)}" />
  <meta property="og:description" content="{meta.get("og_description", desc)}" />
  <meta property="og:image" content="{SITE}/img/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="icon" href="img/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
  <link rel="preload" href="fonts/schibsted-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="css/style.css" />
  <script>document.documentElement.classList.add('js');</script>{extra}
</head>
<body>
"""


def header(page):
    current = SECTION.get(page)
    links, mobile = [], []
    for href, label, ic, long_label in NAV:
        cur = ' aria-current="page"' if href == current else ""
        links.append(f'<li><a href="{href}" class="nav-link"{cur}>{label}</a></li>')
        mobile.append(f'<a href="{href}" class="mobile-link"{cur}>{icon(ic)}<span>{long_label}</span></a>')
    links = "\n          ".join(links)
    mobile = "\n      ".join(mobile)
    return f"""
  <a class="skip-link" href="#main-content">Ugrás a tartalomra</a>

  <header class="navbar" data-navbar>
    <nav class="navbar-inner" aria-label="Főnavigáció">
      {LOGO}

      <ul class="nav-links">
          {links}
      </ul>

      <a href="{PHONE_HREF}" class="nav-cta">{icon("phone")}<span>{PHONE}</span></a>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Menü megnyitása">
        <span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>
      </button>
    </nav>

    <div class="mobile-menu" id="mobile-menu" hidden>
      {mobile}
      <a href="{PHONE_HREF}" class="btn btn-primary btn-block">{icon("phone")}Hívás: {PHONE}</a>
    </div>
  </header>

"""


def footer():
    return f"""

  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          {LOGO}
          <p class="footer-tagline">Személyes biztosítási tanácsadás Tatán és környékén – lakás, gépjármű, élet és baleset.</p>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">Biztosítások</h2>
          <ul class="footer-links">
            <li><a href="lakas.html">Lakásbiztosítás</a></li>
            <li><a href="kgfb.html">KGFB és casco</a></li>
            <li><a href="elet.html">Élet- és balesetbiztosítás</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">Ajánlatkérés</h2>
          <ul class="footer-links">
            <li><a href="felmero-lakas.html">Lakásbiztosítás felmérő</a></li>
            <li><a href="felmero-kgfb.html">KGFB felmérő</a></li>
            <li><a href="felmero-elet.html">Életbiztosítás felmérő</a></li>
            <li><a href="felmero.html">Általános kapcsolatfelvétel</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">Elérhetőség</h2>
          <address class="footer-contact">
            <a href="{PHONE_HREF}">{icon("phone")}{PHONE}</a>
            <a href="mailto:{EMAIL}">{icon("mail")}{EMAIL}</a>
            <span>{icon("map-pin")}Ady Endre utca 29.<br>2890 Tata</span>
          </address>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; <span data-year>2026</span> ABNA – A Biztosítás Nem Alszik!</p>
        <a href="adatvedelem.html">Adatvédelmi tájékoztató és impresszum</a>
      </div>
    </div>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
"""


def read_meta(src):
    def m(pat):
        r = re.search(pat, src)
        return html.unescape(r.group(1)) if r else None
    meta = {
        "title": m(r"<title>(.*?)</title>"),
        "description": m(r'<meta name="description" content="(.*?)"'),
    }
    og_t = m(r'<meta property="og:title" content="(.*?)"')
    og_d = m(r'<meta property="og:description" content="(.*?)"')
    if og_t: meta["og_title"] = og_t
    if og_d: meta["og_description"] = og_d
    ld = re.search(r'\n  <script type="application/ld\+json">.*?</script>', src, re.S)
    if ld: meta["extra_head"] = ld.group(0)
    if 'name="robots" content="noindex"' in src: meta["noindex"] = True
    return {k: html.escape(v, quote=True) if isinstance(v, str) and k != "extra_head" else v
            for k, v in meta.items()}


def build(page):
    path = ROOT / page
    src = path.read_text(encoding="utf-8")
    main = re.search(r"  <main id=\"main-content\".*?</main>", src, re.S).group(0)
    out = head(page, read_meta(src)) + header(page) + main + footer()
    path.write_text(out, encoding="utf-8")


if __name__ == "__main__":
    for p in sorted(ROOT.glob("*.html")):
        build(p.name)
        print("built", p.name)
