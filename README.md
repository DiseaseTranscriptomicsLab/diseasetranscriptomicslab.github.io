# Disease Transcriptomics Lab — Website

Static website for the **Disease Transcriptomics Lab** at NOVA Medical School, Lisbon.  
Hosted on **GitHub Pages** at [`https://nmoraislab.github.io`](https://nmoraislab.github.io).

---

## File structure

```
nmoraislab.github.io/
│
├── index.html                   ← Shell: nav, section placeholders, funding block, footer
├── publications.html            ← Standalone full publications page
├── news.html                    ← Standalone all-news page
│
├── css/
│   └── styles.css               ← All design tokens, layout, and component styles
├── js/
│   ├── main.js                  ← Section loader · nav · animations · Bluesky feed
│   └── news-data.js             ← ★ All lab news items (LAB_NEWS array) — edit here ★
│
├── sections/                    ← ★ Edit section content here ★
│   ├── hero.html                ← Hero / landing section
│   ├── about.html               ← About the lab + graphical abstract
│   ├── team.html                ← PI card + team member cards
│   ├── research.html            ← Research themes, project cards, area publications
│   ├── software.html            ← Web apps, R packages, tools in development
│   ├── publications.html        ← Publications highlights widget on the main page
│   ├── news.html                ← Social buttons; Bluesky feed + BIOMICS spotlight
│   ├── alumni.html              ← Former lab members (timeline)
│   ├── outreach.html            ← Science communication games
│   ├── funding.html             ← Funding logos
│   └── location.html            ← Address + OpenStreetMap embed
│
├── sections/nuno.html           ← Nuno Barbosa-Morais full profile page (standalone)
│
└── assets/
    ├── logos/                   ← Lab logos and funder logos (logos/funding/)
    ├── photos/
    │   ├── *.jpg                ← Current team member photos
    │   ├── alumni/              ← ★ Alumni photos go here ★
    │   └── group_old/           ← Group/retreat photos for the alumni slideshow
    └── news/                    ← ★ Photos for news items go here ★
```

---

## How it works

`index.html` is a shell. On page load, `js/main.js` fetches each `sections/*.html` file and injects it into the right placeholder — so every section is independently editable without touching `index.html`.

`publications.html`, `news.html`, and `sections/nuno.html` are fully standalone pages (not injected).

---

## Local preview

> **Opening `index.html` directly will show a blank page.**  
> Browsers block `fetch()` on `file://`. You need a local HTTP server.

```bash
cd /path/to/nmoraislab.github.io
python3 -m http.server 8000
```

Then open **[http://localhost:8000](http://localhost:8000)**.

---

## Deploying

Push to `main` — GitHub Pages redeploys automatically within ~60 seconds.

For non-Git users: edit files directly on GitHub (click the file → pencil icon ✏ → Commit changes).

**First-time setup:** Settings → Pages → Source → Deploy from branch → `main` → `/ (root)`.

---

## Section-by-section editing guide

Sections are listed in the order they appear on the website.

---

### 🏠 Hero — `sections/hero.html`

Edit the headline, tagline, and affiliation badges. This is the first thing visitors see.

---

### 🧪 About — `sections/about.html`

Edit the lab description text and replace `assets/photos/graphical-abstract.png` to update the graphical abstract image.

---

### 🧑‍🔬 Team — `sections/team.html`

**To add a new member**, copy any existing `.member-card` block and update:
- Name, flag emoji, role badge (`.member-role`)
- Bio (`.member-bio`), research interests (`.member-interests`), fun fact (`.member-fun-fact`)
- Email `href` and display text
- Social links (ORCID, LinkedIn, Bluesky, GitHub) — set `href="#"` to hide unused ones
- Photo path in `<img src="assets/photos/YourPhoto.jpg" />`

Save the photo to `assets/photos/`. Any size works — photos are automatically cropped to a 5:4 ratio.

**To remove a member**, delete the entire `.member-card` block.

**To update the PI card**, edit the `.pi-card` block at the top of the file.

---

### 🔬 Research — `sections/research.html`

Two parts: **project cards** (ongoing work) and **publications by theme** (finished work).

#### Adding or editing a project card

Copy any existing `.research-card` block and update:
- `data-theme` on the outer div: `"cancer"`, `"neuro"`, or `"bioinformatics"`
- `.research-card-stripe` and `.research-theme-pill` class (must match `data-theme`)
- `.research-card-title` — short project name
- `.research-keywords` — add/remove `<span class="research-keyword">` tags
- `.research-card-people` — current members and collaborators
- `.research-card-desc` — one paragraph description
- `.research-card-pub-list` — relevant papers (use bold for lab members, `<sup>*</sup>` for co-firsts)

#### Adding a paper to a theme panel

In the "Finished work: publications by theme" section, find the right `<details>` panel and add a `<li>`:

```html
<li><strong>Smith A</strong><sup>*</sup>, <strong>Barbosa-Morais NL</strong>. <em>Nature</em>, 2026;123:456. [<a href="https://doi.org/..." target="_blank" rel="noopener">Paper</a>]</li>
```

The legend (`* co-first authors`) is already shown above the panels — no per-entry note needed here.

---

### 🛠 Software — `sections/software.html`

Each tool is a card. Copy an existing card and update the tool name, description, links (paper, GitHub, web app), and status badge.

---

### 📰 News — `js/news-data.js`

All news lives in `js/news-data.js` as a JavaScript array called `LAB_NEWS`. The **first item in the array is the most recent**. The homepage shows the 4 most recent; `news.html` shows all of them.

**To add a news item**, insert a new entry at the **top** of the array:

```js
{
  date:     "June 2026",
  title:    "Short, clear headline",
  image:    "assets/news/my-photo.jpg",
  imageAlt: "Brief description of the image",
  summary:  "One or two sentences shown on the news card.",
  content: `
    <p>Full HTML shown when the card is expanded. Can include
    <a href="https://doi.org/..." target="_blank" rel="noopener">links</a>,
    <strong>bold text</strong>, multiple paragraphs, etc.</p>
  `,
},
```

Save photos to `assets/news/`. Aim for at least 800 px wide, under 2 MB (compress with [Squoosh](https://squoosh.app) if needed).

**Multiple images (gallery):** use `images` instead of `image`:

```js
{
  date: "June 2026",
  title: "Lab retreat 2026",
  images: [
    { src: "assets/news/retreat-group.jpg",   alt: "Group photo" },
    { src: "assets/news/retreat-hiking.jpg",  alt: "Hiking day two" },
  ],
  summary: "...",
  content: `...`,
},
```

The first image in the array is also used as the card thumbnail.

---

### 📚 Publications widget — `sections/publications.html`

This is the short highlights widget shown on the **main page** (not the full publications page). It auto-populates from the entries marked `data-selected="true"` in `publications.html`. You generally don't need to edit this file directly — just toggle `pubs-selected` on the papers you want featured.

---

### 🎮 Outreach — `sections/outreach.html`

Each game is a `.outreach-card` block. There are currently two games:

| File | Status | Language |
|---|---|---|
| `games/monster-scientists.html` | Live | EN / PT |
| `games/arvore_inteligente.html` | In development | PT |

**To launch a "coming soon" game** (make it playable), change its card class and header class:

```html
<!-- Before (coming soon) -->
<div class="outreach-card outreach-card--soon ...">
  <div class="outreach-card-header outreach-header--soon">
    ...
    <span class="outreach-status-pill outreach-pill--soon">🌱 Sprouting Soon</span>
  </div>
  ...
</div>

<!-- After (live) -->
<div class="outreach-card outreach-card--live ...">
  <a href="games/your-game.html" target="_blank" rel="noopener"
     class="outreach-card-header outreach-header--live outreach-header--link"
     aria-label="Play Your Game">
    ...
    <span class="outreach-status-pill outreach-pill--live">▶ Play Now</span>
  </a>
  ...
</div>
```

**To add a new game**, copy an entire `.outreach-card` block (from any existing entry), paste it inside `.outreach-grid`, and update:
- `href` to the game file in `games/`
- `.outreach-card-title` — game name
- `.outreach-card-subtitle` — one-liner (e.g. language badges)
- `.outreach-card-desc` — short description for players
- `.outreach-concept-box` — the science behind it
- `.outreach-tags` — concept labels
- Use `outreach-card--soon` if it's not ready yet; `outreach-card--live` once it's playable

Game HTML files live in the `games/` folder.

---

### 🎓 Alumni — `sections/alumni.html`

Former members are listed in a vertical timeline, grouped by year of departure (most recent first).

**To add a former member**, find the correct year group or create a new one, then add a `<li class="alumni-entry">` inside `<ul class="alumni-year-people">`.

**Creating a new year group** (insert before the most recent existing one):

```html
<!-- 2027 -->
<div class="alumni-year-group">
  <span class="alumni-year-label">2027</span>
  <ul class="alumni-year-people">
    <!-- entries here -->
  </ul>
  <div class="alumni-year-photos" aria-hidden="true">
    <!-- photos here, in the same order as the entries above -->
  </div>
</div>
```

**Entry with LinkedIn link:**

```html
<li class="alumni-entry">
  <span class="alumni-entry-name">
    <a class="alumni-entry-name-link" href="https://www.linkedin.com/in/HANDLE/" target="_blank" rel="noopener">
      <!-- copy the LinkedIn SVG icon from any existing entry -->
      Full Name
    </a>
  </span>
  <span class="alumni-role-badge badge-phd">PhD Student</span>
  <span class="alumni-entry-years">2021–2027</span>
  <span class="alumni-entry-context">Program or institution (optional)</span>
  <span class="alumni-entry-pubs">
    <span class="pubs-label">Pubs with lab:</span>
    <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener">[1]</a>
    <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener">[2]</a>
  </span>
</li>
```

If no LinkedIn, replace the `<a class="alumni-entry-name-link">` with a plain `<span>` containing the name. `alumni-entry-context` and `alumni-entry-pubs` are optional.

**Photo:** add a matching `<img>` to `<div class="alumni-year-photos">` in the **same position** as the entry (the hover highlight links them by index):

```html
<img class="alumni-year-photo" src="assets/photos/alumni/Filename.jpg" alt="Full Name" loading="lazy" />
```

Save the photo to `assets/photos/alumni/`. Square crops look best.

**Badge classes:**

| Class | Colour | Use for |
|---|---|---|
| `badge-postdoc` | teal | Postdoctoral researcher |
| `badge-phd` | blue | PhD student |
| `badge-visiting` | purple | Visiting researcher / fellow |
| `badge-msc` | amber | MSc student |
| `badge-trainee` | rose | Intern / rotation / trainee |

---

### 🖼 Group photo slideshow

1. Save the photo to `assets/photos/group_old/`. Wide-format works best (16:5 ratio, e.g. 960 × 300 px). Resize with [Squoosh](https://squoosh.app).
2. Open `js/main.js` and find the `SLIDES` array inside `initAlumniSlideshow()`.
3. Add one entry at the correct chronological position (oldest → newest):

```js
{ src: "assets/photos/group_old/Jun2026_retreat.jpg", caption: "Lab retreat — June 2026" },
```

---

### 📍 Location — `sections/location.html`

Update the address text and the OpenStreetMap `<iframe>` embed URL if the lab moves.

---

### 💰 Funding logos — `index.html`

Funding logos live in a static block near the footer of `index.html` (not in `sections/`). Add or remove logos there; images go in `assets/logos/funding/`.

---

## Standalone pages

These are full HTML pages not injected from `sections/`.

---

### 📚 Full publications page — `publications.html`

**To add a paper**, find the correct year block (e.g. `<!-- 2026 -->`) and add a new `<li class="pubs-item">` inside the `<ul class="pubs-list">`. Copy the format of an existing entry:

```html
<li class="pubs-item"
    data-year="2026"
    data-authors="Smith A, Jones B, Barbosa-Morais NL"
    data-journal="Nature, 2026;123:456"
    data-tags="cancer,RNA-seq">
  Smith A, <strong>Jones B</strong>, <strong>Barbosa-Morais NL</strong>.
  "<a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener">Paper title.</a>"
  <em>Nature</em>, 2026;123:456.
  [<a href="https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/" target="_blank" rel="noopener">PubMed</a>]
</li>
```

**Lab member names must be wrapped in `<strong>`** so they appear bold.

**For co-first authors**, add `<sup>*</sup>` after each name, and a note at the end of the entry:
```html
Smith A<sup>*</sup>, <strong>Jones B</strong><sup>*</sup>, ...
(<sup>*</sup> co-first authors)
```

**To highlight a paper** (shows ★, also appears on the main page), add `pubs-selected` to the class and `data-selected="true"`:
```html
<li class="pubs-item pubs-selected" data-selected="true" data-year="2026" ...>
```

**To add a new year**, insert a year header and empty list before the previous year block:
```html
<div class="pubs-year">2027</div>
<ul class="pubs-list">
  <!-- papers here -->
</ul>
```

**For preprints**, add to the existing `Preprints` section at the top.

**Numbering is fully automatic** — JavaScript numbers all peer-reviewed lab publications from oldest [1] to newest. Never add or edit numbers manually.

---

### 👤 Nuno's page — `sections/nuno.html`

Standalone page with Nuno's full profile: bio, CV timeline, complete publication list, press coverage.

**To add a publication**, find the correct year section and add a `<li class="nuno-pub-item">` inside the matching `<ul class="nuno-pub-list">`:

```html
<li class="nuno-pub-item">
  <span class="nuno-pub-num"></span>
  Smith A, <strong>Barbosa-Morais NL</strong>.
  "Paper title."
  <em>Journal Name</em>, 2026;1(1):1–10.
  [<a href="https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/" target="_blank" rel="noopener">PubMed</a>]
</li>
```

Leave `<span class="nuno-pub-num">` **empty** — numbers are assigned automatically by JavaScript.

For **highlighted papers**, add the class `key-paper`:
```html
<li class="nuno-pub-item key-paper">
```

**To add a new year**, insert a year header before the previous year:
```html
<div class="nuno-pub-year">2027</div>
<ul class="nuno-pub-list">
  <!-- papers -->
</ul>
```

---

## Formatting conventions

### Bold lab members
Wherever author names appear (publications, research panels), **current and former lab members must be wrapped in `<strong>`** so they render bold. This applies everywhere: `publications.html`, `sections/nuno.html`, and `sections/research.html`.

### Co-first authors
Use `<sup>*</sup>` immediately after each co-first author name:
```html
Smith A<sup>*</sup>, <strong>Jones B</strong><sup>*</sup>
```
In `publications.html` and `nuno.html`, add a note at the end of the entry: `(<sup>*</sup> co-first authors)`.  
In the research section panels, the global legend is already shown — no per-entry note needed.

### External links
Always open external links in a new tab:
```html
<a href="https://..." target="_blank" rel="noopener">Link text</a>
```

---

## Bluesky feed

The News section automatically fetches the most recent posts from `@nmoraislab.bsky.social` via the public AT Protocol API (no key required). Reposts are filtered out. To change the account, edit the `HANDLE` constant at the top of `loadBlueskyFeed()` in `js/main.js`.

---

## Analytics

The site supports **Google Analytics 4**. To activate it, create a property at [analytics.google.com](https://analytics.google.com), then add the following snippet inside the `<head>` of `index.html`, `publications.html`, `news.html`, and `sections/nuno.html` — replacing `G-XXXXXXXXXX` with your Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Acknowledgements

The first draft of this website — structure, layout, CSS design system, JavaScript, and outreach games — was built with **[Claude Sonnet 4.6](https://www.anthropic.com/claude)** (Anthropic) via Cowork mode.

---

*Disease Transcriptomics Lab · NOVA Medical School · Lisboa, Portugal*
