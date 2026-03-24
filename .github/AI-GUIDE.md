# AI Maintenance Guide — OracleShellInstall Website

> **Read this first.** This is the only file you need to understand the entire project.
> For deep-dive details, read `DEVELOPMENT.md` in the repo root.

## What This Project Is

Static website for **OracleShellInstall** — a shell script that automates Oracle Database installation (11gR2–26ai) on 20+ Linux distros. The site has a command generator, docs, compatibility matrix, user case studies, contribution system, and 255 installation guide pages.

- **Hosting**: GitHub Pages, `main` branch auto-deploys
- **Domain**: www.oracleshellinstall.com
- **Stack**: Vanilla HTML/CSS/JS, no build tools, no frameworks
- **Languages**: Chinese (default) + English via client-side i18n

---

## File Map

```
/                           # repo root = site root
├── index.html              # Homepage (hero + terminal animation + features + trust)
├── generator.html          # Command generator (interactive form → shell command)
├── docs.html               # Documentation (sidebar TOC + search + scroll spy)
├── compat.html             # Compatibility matrix (OS × Oracle version, 182 tutorials)
├── pricing.html            # Edition comparison (社区版 vs 专业版)
├── download.html           # Download center (paid users)
├── contribute.html         # Contribution page (submission channels: email, WeChat, tech community)
├── cases.html              # User case studies listing (reads cases/cases.json)
├── 404.html                # Custom error page
├── css/style.css           # Global stylesheet (CSS variables, components, responsive)
├── js/shared.js            # Core module (nav, footer, i18n, theme, code blocks, floating widgets)
├── js/search.js            # Client-side full-text search
├── sw.js                   # Service Worker (cache: os-v47)
├── manifest.json           # PWA manifest
├── search-index.json       # Search index (190 entries)
├── sitemap.xml             # SEO sitemap
├── DEVELOPMENT.md          # Full development history (38KB, Chinese)
├── guides/                 # 255 installation tutorial pages (author-written)
│   ├── guide.css           # Guide-specific styles
│   ├── *.html              # Individual guides
│   └── img/                # Guide screenshots
├── cases/                  # User-submitted case studies (manually curated)
│   ├── cases.json          # Index of published cases
│   └── case-*.html         # Individual case study pages
├── .github/
│   ├── AI-GUIDE.md         # This file
└── img/                    # Site assets (og-cover, wechat-qr, icons)
```

---

## Critical Architecture Rules

### 1. i18n System (MOST COMMON SOURCE OF BUGS)

**How it works:**
- HTML default content = Chinese. English lives in JS `i18n.en` object.
- Elements marked with `data-i18n="keyName"` get their innerHTML replaced on language switch.
- `setLang()` in `shared.js` saves original Chinese HTML to `data-i18n-zh` attribute on first encounter, then swaps content.

**The #1 rule:**
> `pageI18n.zh["keyName"]` MUST exactly match the HTML element's default innerHTML (byte-for-byte, including whitespace).
> If they differ, switching EN → ZH will show the `pageI18n.zh` value instead of restoring the original HTML, causing visual glitches.

**Where translations live:**
| Scope | Location |
|-------|----------|
| Shared (nav, footer, buttons) | `js/shared.js` → `i18n.zh` / `i18n.en` |
| Page-specific | Each page's inline `<script>` → `pageI18n.zh` / `pageI18n.en`, merged via `Object.assign(i18n.zh, pageI18n.zh)` |

**Adding a new translated element:**
```html
<span data-i18n="myKey">中文内容</span>
```
```javascript
// In the page's inline script or shared.js:
Object.assign(i18n.zh, { myKey: '中文内容' });     // MUST match HTML exactly
Object.assign(i18n.en, { myKey: 'English content' });
```

**Testing i18n round-trip:**
Switch to English → switch back to Chinese → verify Chinese matches original. Automated: use Playwright to compare `el.innerHTML` before and after EN→ZH round-trip.

### 2. Cache Busting

All CSS/JS/manifest references across every HTML file use a query parameter:
```html
<link rel="stylesheet" href="css/style.css?v=20260324b">
<script src="js/shared.js?v=20260324b"></script>
```

When you modify CSS or JS, you MUST update the version string globally:
```bash
# Find current version
grep -r "v=20260324b" --include="*.html" -l | head -5

# Replace everywhere (190+ files including guides/)
find . -name "*.html" -exec sed -i 's/v=20260324b/v=NEW_VERSION/g' {} +
```

Also bump the Service Worker cache name in `sw.js` line 1:
```javascript
const CACHE_NAME = 'os-v47';  // increment from current os-v47
```

### 3. Navigation & Footer

Generated dynamically by `js/shared.js`:
```javascript
document.getElementById('nav').innerHTML = navHTML('home');  // param = active page ID
document.getElementById('footer').innerHTML = footerHTML();
```

Nav links: home, generator, docs, compat, subscribe, download
Footer links: above + contribute, cases
CTA button: links to `generator.html` (not pricing)
Floating widgets: contribute fab (pencil icon, hidden on contribute.html) + WeChat fab (chat icon)

Guide pages use `../` prefix automatically (detected by path).

### 4. Theme System

- Dark theme = default (CSS variables in `:root`)
- Light theme = `[data-theme="light"]` overrides
- Stored in `localStorage('theme')`
- Terminal/code blocks stay dark even in light theme

### 5. docs.html Special Features

- **Dual content blocks**: `.doc-zh` (Chinese) and `.doc-en` (English), toggled by `display:none/block`
- **Sidebar scroll spy**: IntersectionObserver highlights active section
- **Search filter**: Filters sidebar links AND content sections
- **Section IDs**: Chinese sections use `id="quickstart"`, English use `id="en-quickstart"`
- **Sidebar click**: Automatically resolves to correct language prefix

### 6. generator.html

- Three modes: single / standalone / rac
- Dynamic form shows/hides parameters per mode
- Real-time command preview (only non-default params included)
- Copy-to-clipboard button

### 7. pricing.html Terminology

- Free tier = **社区版** (Community Edition), NOT "开源版"
- Paid tier = **专业版** (Pro Edition), NOT "付费版"
- Missing features shown with `—` (em dash), NOT `✕` (red cross)
- FAQ explains why some features aren't in community edition

### 8. Contribution & Case Study Pipeline

**Contribution flow (no automation):**
- `contribute.html` provides a guide for users to share their Oracle installation experience
- There is no online form and no GitHub Issue integration
- Cases are manually curated: author receives submissions via email/WeChat, then creates case HTML manually

**contribute.html structure:**
- Hero → 3-step guide → Markdown template → 3 submission channels (email, WeChat, tech community) → Writing tips → CTA

**cases.html structure:**
- Hero → card grid (from cases.json) → empty state if no cases → CTA to contribute
- Each case card shows: title, Oracle version tag, mode tag, OS tag, author, date

**Case study HTML pages** (`cases/case-*.html`):
- Follow same template pattern as `guides/*.html` (guide-article layout, guide.css)
- Back link goes to `../cases.html` instead of `../compat.html`
- Shows: environment info table, install command, install log (optional), verification, experience

### 9. Floating Widgets (shared.js)

Two floating action buttons on the bottom-right, stacked vertically:
- **Contribute fab** (top, pencil icon, red): Opens popup with title, description, 3-step flow, and link to contribute.html. Hidden on contribute.html itself.
- **WeChat fab** (middle, chat icon, green): Opens popup with QR code, WeChat ID, social links, and hint text.
- **Back-to-top** (bottom, arrow, red): Appears on scroll > 400px.

Popups are mutually exclusive — opening one closes the other.

---

## Common Maintenance Tasks

### Add a new page

1. Create HTML file with standard head (copy from existing page)
2. Include `css/style.css?v=CURRENT` and `js/shared.js?v=CURRENT`
3. Add `<div id="nav"></div>` and `<div id="footer"></div>`
4. In inline script: call `navHTML('pageId')`, `footerHTML()`, register pageI18n, call `setLang(currentLang)`
5. Add to `sitemap.xml` and `search-index.json`
6. Add nav link in `shared.js` if it should appear in navigation

### Modify shared nav/footer

Edit `js/shared.js` — search for `function navHTML` or `function footerHTML`.

### Update search index

Edit `search-index.json`. Each entry:
```json
{ "url": "page.html", "title": "Page Title", "desc": "Short description", "text": "Full text content for search matching" }
```

### Add a guide tutorial

1. Create `guides/TIMESTAMP.html` (use existing guide as template)
2. Add entry to `search-index.json`
3. Add `<url>` to `sitemap.xml`
4. Add link in `compat.html` compatibility matrix

### Case study management

Case studies are manually created (not auto-generated).
- To manually add a case, create the HTML file and add an entry to `cases/cases.json`
- `cases/cases.json` format: `[{id, title, os, oracle, mode, author, date, issue}]`
- Case HTML follows guide template pattern but uses `../cases.html` as back link

---

## CSS Design Tokens

```
Brand red:    --red: #C74634
Glow red:     --red-glow: #e05a48
Background:   --bg: #0a0a0e → --bg2: #111118 → --bg3: #181822
Cards:        --card: #14141d
Text:         --text: #e8e6e3 → --text-dim: #9a9aaa → --text-muted: #5a5a6e
Border:       --border: #232334
Accent:       --accent2: #e8934a, --green: #3aba6a, --blue: #4a8fe8
Fonts:        --font: 'Noto Sans SC', --mono: 'JetBrains Mono', --display: 'Orbitron'
Radii:        --r-sm: 6px, --r: 10px, --r-lg: 14px
Nav height:   --nav-h: 64px
Max width:    --max-w: 1160px
```

Responsive breakpoints: 768px (mobile), 900px (tablet), 1200px (wide)

---

## Git Conventions

- Commit prefixes: `feat:`, `fix:`, `enhance:`, `cleanup:`, `refactor:`, `docs:`
- Push to `main` = auto-deploy to GitHub Pages
- No build step needed
- `.playwright-cli/` is gitignored (test artifacts)

---

## Known Pitfalls

1. **i18n zh mismatch**: If HTML default and `pageI18n.zh` differ, EN→ZH switch breaks. Always keep them identical.
2. **Cache stale**: After editing CSS/JS, forgetting to bump `?v=` means users see old versions.
3. **SW cache name**: Must bump `CACHE_NAME` in `sw.js` when changing static assets, or old SW serves stale files.
4. **Guide paths**: Guides are in `guides/` subdirectory — all asset references use `../css/`, `../js/`, `../img/`.
5. **Large page edits**: `docs.html` has dual zh/en content blocks (~1200 lines). Edits to one language block must be mirrored in the other.
6. **Tables in docs.html**: Parameter tables use `resp-cards` class for mobile card layout. New tables need `<div class="doc-table-wrap"><table class="param-table resp-cards">`.
7. **XSS in dynamic content**: When rendering JSON data into innerHTML (e.g., `cases.html`), always use `escapeHtml()` for text and `encodeURIComponent()` for URLs.
8. **Aria-labels**: All interactive elements in `shared.js` use bilingual aria-labels via `currentLang` ternary. New elements must follow this pattern.
9. **Focus trapping**: Popup modals (contribute, WeChat) have focus traps via `trapFocus()`. New modals must also call this function.
10. **theme-color meta**: Main HTML pages include `<meta name="theme-color">` with dark/light variants. New pages should include these tags.
