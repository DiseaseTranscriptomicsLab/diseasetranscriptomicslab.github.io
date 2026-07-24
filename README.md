# Disease Transcriptomics Lab - Website

Static website for the **Disease Transcriptomics Lab** at NOVA Medical School, Lisbon.  
Hosted on **GitHub Pages** at [`https://diseasetranscriptomicslab.github.io`](https://diseasetranscriptomicslab.github.io).

> ℹ️ **This repository is public.** GitHub Pages requires a public repo on the free plan (private-repo Pages needs a paid GitHub Team/Enterprise org plan), so the source - including photos, drafts, and the outreach games - is visible to anyone. Nothing sensitive should be committed here; if content ever needs to stay private (e.g. unpublished data, IP-sensitive material), keep it out of this repo entirely rather than relying on repo privacy.

---

## File structure

```
nmoraislab.github.io/
│
├── index.html                   ← Shell: nav, section placeholders, funding block, footer
├── publications.html            ← Standalone full publications page
├── news.html                    ← Standalone all-news page
├── join.html                    ← Standalone "Join the Lab" page (open positions + how to apply)
│
├── css/
│   └── styles.css               ← All design tokens, layout, and component styles
├── js/
│   ├── main.js                  ← Section loader · nav · animations · Bluesky feed
│   └── news-data.js             ← ★ All lab news items (LAB_NEWS array) - edit here ★
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
├── sections/nuno/               ← Archived press clippings and documents linked from sections/nuno.html
│
├── games/                       ← Standalone outreach game pages (own <head>, linked from sections/outreach.html)
│   ├── monster-scientists.html
│   └── arvore_inteligente.html
│
├── .github/workflows/deploy.yml ← GitHub Actions workflow that deploys to GitHub Pages on push to main
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

## Branch workflow

> ⚠️ **`main` deploys automatically to the live website. Please do not push directly to it.**

`main` is not technically protected, so GitHub will let you push - but doing so updates the live site immediately. All changes should go through a pull request instead:

1. Create a new branch (e.g. `add-new-member`) or switch to the `dev` branch.
2. **Make sure your branch is up to date with `main`** - on GitHub, open your branch, and if it shows "X commits behind main", click **Sync fork** or **Update branch** to pull in the latest changes.
3. Make your changes and commit them.
4. Open a pull request into `main` on GitHub.
5. Someone reviews and merges - the site updates within ~60 seconds.

---

## How it works

`index.html` is a shell. On page load, `js/main.js` fetches each `sections/*.html` file and injects it into the right placeholder - so every section is independently editable without touching `index.html`.

`publications.html`, `news.html`, `join.html`, and `sections/nuno.html` are fully standalone pages (not injected).

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

Deployment is handled by a **GitHub Actions workflow** at `.github/workflows/deploy.yml`. It runs automatically on every push to `main` (including PR merges) and can also be triggered manually from the **Actions** tab (`workflow_dispatch`). No build step is needed - it uploads the repository as-is and publishes it via `actions/deploy-pages`.

**Never push directly to `main`** - see the branch workflow above.

**One-time repo setup (already done for this repo, kept here for reference):**
1. Settings → Pages → **Source** → set to **GitHub Actions** (not "Deploy from a branch").
2. The repository must be **public** on the free GitHub plan - Pages for private repos requires a paid GitHub Team/Enterprise org plan.

Once merged, check the **Actions** tab for the workflow run; the deployed URL also appears there when it finishes.

---

## Section-by-section editing guide

Sections are listed in the order they appear on the website.

---

### 🏠 Hero - `sections/hero.html`

Edit the headline, tagline, and affiliation badges. This is the first thing visitors see.

---

### 🧪 About - `sections/about.html`

Edit the lab description text and replace `assets/photos/graphical-abstract.png` to update the graphical abstract image.

---

### 🧑‍🔬 Team - `sections/team.html`

**To add a new member**, copy any existing `.member-card` block and update:
- Name, flag emoji, role badge (`.member-role`)
- Bio (`.member-bio`), research interests (`.member-interests`), fun fact (`.member-fun-fact`)
- Email `href` and display text
- Social links (ORCID, LinkedIn, Bluesky, GitHub) - set `href="#"` to hide unused ones
- Photo path in `<img src="assets/photos/YourPhoto.jpg" />`

Save the photo to `assets/photos/`. Any size works - photos are automatically cropped to a 5:4 ratio.

**To remove a member**, delete the entire `.member-card` block.

**To update the PI card**, edit the `.pi-card` block at the top of the file.

---

### 🔬 Research - `sections/research.html`

Two parts: **project cards** (ongoing work) and **publications by theme** (finished work).

---

#### Research themes

Each project card belongs to one or more **themes**. A theme controls three visual elements simultaneously: the coloured stripe at the top of the card, the pill badge(s) inside the card, and the filter button at the top of the section. A card can carry multiple themes - e.g. a neuro project that was brought in from outside the lab carries both `neuro` and `external`.

**Current themes:**

| Theme key | Label | Stripe / dot colour | Meaning |
|---|---|---|---|
| `cancer` | RNA in cancer | `#fca5a5` (red) | Projects where the main disease context is cancer |
| `neuro` | Neuro-biology | `#c4b5fd` (violet) | Neuroscience and sleep biology |
| `bioinformatics` | Bioinformatics | `#5eead4` (teal) | Software tools and computational pipelines - same teal as the Software section |
| `biostatistics` | Biostatistics | `#fcd34d` (amber) | Projects with a primary methodological/statistical contribution |
| `evolutionary` | Evolutionary biology | `#86efac` (green) | Molecular evolution and comparative genomics |
| `external` | External collaboration | `#7dd3fc` (sky-blue) | Projects initiated by and led from another lab, where Nuno is co-PI |

**In-house vs external collaboration:** projects where Nuno is listed as **PI** are in-house. Projects where Nuno is listed as **co-PI** alongside an external PI were brought in from outside - these cards carry `external` in addition to their scientific theme, e.g. `data-theme="neuro external"`.

> The bioinformatics teal (`#5eead4`) intentionally matches the "Launch" button hover colour in the Software section, to visually link the two.

---

#### Adding or editing a project card

Copy any existing `.research-card` block and update:

- `data-theme` on the outer div - one or more theme keys, space-separated. Example: `data-theme="cancer external"`. JS automatically renders a gradient stripe when multiple themes are present.
- `.research-card-stripe` - set the class to the **primary** (first/main) theme; JS overwrites the background colour for gradients.
- `.research-theme-pills` wrapper - add one `.research-theme-pill.THEME` per theme, in the same order as `data-theme`.
- `.research-card-title` - the project title. Convention: use the project description (one sentence) as the title, not an invented headline.
- `.research-keywords` - see the Keywords section below.
- `.research-card-people` - list current members then collaborators. Format: `Name (role)`. Use `(PI)`, `(co-PI)`, `(Junior researcher)`, etc.
- `.research-card-desc` - the full project abstract, shown when the card is clicked. Use verbatim text from project documents where available - do not paraphrase.

**To add a preprint link** on a card, include a `.research-card-preprint` paragraph inside `.research-card-detail`:

```html
<p class="research-card-preprint">
  <a href="https://www.biorxiv.org/content/10.1101/XXXX" target="_blank" rel="noopener">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    Preprint (bioRxiv)
  </a>
</p>
```

Preprints appear on the card and in the modal. They go on the **card** only - not in the "Finished work" panels below (those are for peer-reviewed publications).

Each card has a **"Read abstract"** toggle at the bottom. Clicking anywhere on the card (or pressing Enter/Space) opens a modal with the full abstract and any preprint link.

---

#### Keywords

Keywords appear as small chips below the card title and power a **search field** above the cards. Typing in the field (with autocomplete suggestions) filters cards in real time - partial matches work. Clearing the field restores all cards.

To add or edit keywords on a card, modify the `.research-keywords` block:

```html
<div class="research-keywords">
  <span class="research-keyword">cancer</span>
  <span class="research-keyword">transcriptomics</span>
</div>
```

The autocomplete datalist is built dynamically from all `.research-keyword` spans - no manual list to maintain. Typing a theme filter resets the keyword search, and vice versa.

---

#### Adding a paper to a theme panel

In the "Finished work: publications by theme" section, find the right `<details>` panel and add a `<li>`:

**If a panel doesn't exist yet** (e.g. Evolutionary biology, Collaboration, Biostatistics), it is kept as a commented-out block at the bottom of the publications section. To activate it, find the large comment block that starts with `EMPTY PANELS`, locate the correct `<details>` block inside, and uncomment it by removing the `<!--` / `-->` delimiters around it. Then add `<li>` entries inside the `<ul>`.

```html
<li><strong>Smith A</strong><sup>*</sup>, <strong>Barbosa-Morais NL</strong>. <em>Nature</em>, 2026;123:456. [<a href="https://doi.org/..." target="_blank" rel="noopener">Paper</a>]</li>
```

The co-first-author legend is already shown globally - no per-entry note needed.

---

#### Adding a new research theme

A theme lives in **three files**. You must edit all three for a new theme to work - missing any one of them will cause broken colours or a non-functional filter button.

> **Pick a theme key first.** The key is a short, lowercase, no-spaces identifier (e.g. `ageing`, `immunology`). You'll use the exact same key string in all three files. Choose something you won't need to rename later - it's used as a CSS class, a JS object property, and an HTML `data-theme` value everywhere.

---

**Step 1 - `css/styles.css` (four rules)**

Open `css/styles.css` and search for `rfilter-dot.cancer` to find the colour block. Add four lines for your new theme immediately after the last `.rfilter-dot` line in that block:

```css
/* Inside the "Theme colour dots in filter buttons" block - after the last .rfilter-dot line */
.rfilter-dot.myfield  { background: #DOTCOLOUR; }

/* Inside the ".research-theme-pill" block - after the last pill line */
.research-theme-pill.myfield  { background: #PILLBG; color: #PILLTEXT; }

/* Inside the ".research-card[data-theme~=...]" hover block - after the last hover rule */
.research-card[data-theme~="myfield"]:hover { border-color: #DOTCOLOUR; background: #HOVERBG; }

/* Inside the ".research-pub-panel-summary" block - after the last panel-summary line */
.research-pub-panel-summary.myfield { border-left: 4px solid #DOTCOLOUR; }
```

**Choosing colours:** The dot/stripe colour should be a pastel (~300-weight). The pill text colour must have ≥ 4.5:1 contrast against the pill background to pass WCAG AA - use a dark shade of the same hue (700-800-weight). The hover background should be an extremely pale tint of the same hue. If the theme corresponds to a feature already present elsewhere on the site (e.g. bioinformatics tools also appear in the Software section), reuse that section's accent colour.

```
Example using a hypothetical "ageing" orange theme:
  DOTCOLOUR  = #fdba74   (orange-300, pastel - used for dot, stripe, hover border, panel border)
  PILLBG     = #fff7ed   (orange-50, near-white - pill chip background)
  PILLTEXT   = #9a3412   (orange-800, dark - pill text, ≥ 4.5:1 on #fff7ed)
  HOVERBG    = #fffaf5   (barely-there tint - card background on hover)
```

---

**Step 2 - `js/main.js` (one line)**

Open `js/main.js` and search for `RESEARCH_THEME_COLOURS`. You'll find an object near the top of the file:

```js
const RESEARCH_THEME_COLOURS = {
  cancer:          '#fca5a5',
  neuro:           '#c4b5fd',
  bioinformatics:  '#5eead4',
  biostatistics:   '#fcd34d',
  evolutionary:    '#86efac',
  external:        '#7dd3fc',
  // ← add your theme here:
  myfield:         '#DOTCOLOUR',
};
```

This object is what drives the coloured stripe at the top of each card. Without this entry, multi-theme gradient stripes won't include your colour.

---

**Step 3 - `sections/research.html` (filter button + pub panel)**

Open `sections/research.html`.

**3a.** Search for `research-filter-bar`. Inside that `<div>`, add a button for your theme after the last existing `<button>`:

```html
<button class="research-filter-btn" data-filter="myfield">
  <span class="rfilter-dot myfield"></span>My field label
</button>
```

`data-filter` must match the key exactly. The text after the dot span is what appears in the UI.

**3b.** Scroll to the bottom of the file, to the `<!-- ══ EMPTY PANELS` comment block. Add a new `<details>` block inside the comment (keeping it commented out until publications exist):

```html
<details class="research-pub-panel" data-theme="myfield">
  <summary class="research-pub-panel-summary myfield">
    <span class="rfilter-dot myfield" style="margin-right:.5rem;"></span>
    My field label
    <svg class="research-pub-panel-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  </summary>
  <ul class="research-pub-panel-list">
    <li>Author A, <strong>Barbosa-Morais NL</strong>. <em>Journal</em>, year. [<a href="#" target="_blank" rel="noopener">Paper</a>]</li>
  </ul>
</details>
```

When publications are ready, move this block out of the comment and into the live section above it.

---

**Step 4 - assign the theme to cards**

On each `.research-card` that should carry this theme, add the key to `data-theme` (space-separated if multi-theme), add the matching `.research-card-stripe` class (for single-theme cards), and add a `.research-theme-pill.myfield` inside `.research-theme-pills`:

```html
<!-- Single theme -->
<div class="research-card" data-theme="myfield">
  <div class="research-card-stripe myfield"></div>
  <div class="research-card-body">
    <div class="research-theme-pills">
      <span class="research-theme-pill myfield">My field label</span>
    </div>
    ...
  </div>
</div>

<!-- Multi-theme (e.g. also neuro) - stripe uses primary theme; JS sets gradient -->
<div class="research-card" data-theme="neuro myfield">
  <div class="research-card-stripe neuro"></div>
  <div class="research-card-body">
    <div class="research-theme-pills">
      <span class="research-theme-pill neuro">Neuro-biology</span>
      <span class="research-theme-pill myfield">My field label</span>
    </div>
    ...
  </div>
</div>
```

---

### 🛠 Software - `sections/software.html`

Each tool is a `.tool-card`. Copy an existing card and update the tool name, description, links (paper, GitHub, web app), and badge(s).

**`data-tool-type`** on the outer `.tool-card` drives the filter bar (All / Web Apps / R-Bioconductor / Deprecated) and accepts **one or more** space-separated values, e.g. `data-tool-type="webapp pkg"` for a tool that's both a hosted web app and an R package. A card matches a filter if any of its listed types match.

**Badges** live inside a `.tool-badges` wrapper so a card can show more than one, e.g. markeR and psichomics each show both "Online Web App" and "R/Bioconductor":

```html
<div class="tool-badges">
  <span class="tool-badge webapp">...svg... Online Web App</span>
  <span class="tool-badge pkg">...svg... R/Bioconductor</span>
</div>
```

Use `tool-badge pkg` with the text "R/Bioconductor" for packages on Bioconductor, or "R Package (GitHub)" for R packages distributed only via GitHub (e.g. betAS).

Each card's `.tool-links` has a secondary `.tool-link-row` (Paper, Bioconductor, GitHub, etc.) and one primary `.tool-link.launch` CTA - use "Launch app ↗" linking to the hosted web app when one exists, otherwise "Bioconductor ↗" linking to the package page.

---

### 📰 News - `js/news-data.js`

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

### 📡 BIOMICS news feed - `sections/news.html`

The News section includes a **BIOMICS spotlight** that auto-fetches the latest news items from [biomics.gimm.pt/news/feed/](https://biomics.gimm.pt/news/feed/) via an RSS-to-JSON proxy (`rss2json.com`). No API key is required. The feed is loaded by `loadBiomicsNews()` in `js/main.js` and rendered as photo cards.

To change the feed URL, update the `BIOMICS_FEED_URL` constant near the top of `loadBiomicsNews()`.

### 🎬 BIOMICS videos - `sections/news.html`

The BIOMICS YouTube videos also live in the News section and are specified in the `BIOMICS_VIDEOS` array in `js/main.js`. Each entry has a `videoId` and `title`.

**To add a video**, push a new entry to the array:

```js
{ videoId: 'dQw4w9WgXcQ', title: 'BIOMICS Talk - June 2026' }
```

**Click-to-play pattern** - videos render as a static thumbnail with a play button overlay. Clicking loads the YouTube iframe with autoplay. This defers the iframe until the user explicitly plays the video, keeping the page fast. Thumbnails are fetched directly from YouTube's CDN (`hqdefault.jpg`, 480×360) - no API key needed.

**Play button ARIA**: each thumbnail wrap has `role="button"`, `tabindex="0"`, and an `aria-label` of `"Play <title>"` for keyboard and screen-reader access.

---

### 📚 Publications widget - `sections/publications.html`

This is the short highlights widget shown on the **main page** (not the full publications page). It auto-populates from the entries marked `data-selected="true"` in `publications.html`. You generally don't need to edit this file directly - just toggle `pubs-selected` on the papers you want featured.

---

### 🎮 Outreach - `sections/outreach.html`

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
- `.outreach-card-title` - game name
- `.outreach-card-subtitle` - one-liner (e.g. language badges)
- `.outreach-card-desc` - short description for players
- `.outreach-concept-box` - the science behind it
- `.outreach-tags` - concept labels
- Use `outreach-card--soon` if it's not ready yet; `outreach-card--live` once it's playable

Game HTML files live in the `games/` folder.

---

### 🎓 Alumni - `sections/alumni.html`

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
  <span class="alumni-entry-years">2021-2027</span>
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
{ src: "assets/photos/group_old/Jun2026_retreat.jpg", caption: "Lab retreat - June 2026" },
```

---

### 📍 Location - `sections/location.html`

Update the address text and the OpenStreetMap `<iframe>` embed URL if the lab moves.

---

### 💰 Funding logos - `index.html`

Funding logos live in a static block near the footer of `index.html` (not in `sections/`). Add or remove logos there; images go in `assets/logos/funding/`.

---

## Standalone pages

These are full HTML pages not injected from `sections/`.

---

### 📚 Full publications page - `publications.html`

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

**Numbering is fully automatic** - JavaScript numbers all peer-reviewed lab publications from oldest [1] to newest. Never add or edit numbers manually.

---

### 🔬 Join the Lab page - `join.html`

This page has three parts: (1) an **Open Positions** banner at the top for active calls, (2) a general **How to Apply** description, and (3) fixed **Opportunity type** blocks (Postdoc, PhD, Masters, Short-term).

The opportunity type blocks and how-to-apply text should be edited directly in `join.html` when the lab's situation changes. The section below covers the most common task: **advertising and closing open positions**.

---

#### Adding an open position

When a funded call or specific position opens:

1. Open `join.html` and find the comment block that starts with:
   ```
   <!-- ── Add position cards here when calls are open ──
   ```
2. **Remove** (or leave, it's harmless) the `<p class="no-positions">` paragraph.
3. **Uncomment the example card** (remove the `<!--` and `-->` around it), then fill in the details:

```html
<div class="position-card">
  <div class="position-card-type">PhD Fellowship</div>
  <h3>Title of the position</h3>
  <p>
    Short description of what the candidate will work on and any
    eligibility requirements (nationality, degree, etc.).
  </p>
  <p class="position-card-deadline">
    Application deadline: <span>31 July 2025</span>
  </p>
  <a href="mailto:eid-mesg-disease-transcriptomics@groups.nms.unl.pt?subject=PhD%20application"
     class="btn btn-primary">Apply / Enquire</a>
</div>
```

**`position-card-type` values** - use whichever fits:
- `Postdoctoral Fellowship`
- `PhD Fellowship`
- `Masters Thesis`
- `Short-term Training`
- `Research Assistant`

**Multiple open positions:** add multiple `.position-card` blocks one after another - each becomes its own card.

**Linking to a full call document:** replace or supplement the `mailto:` link with a link to the PDF/URL of the official call if one exists.

---

#### Closing a position (call is over)

1. **Delete** the `.position-card` block for that position.
2. If no other cards remain, **restore** (or uncomment) the "no positions" message:
   ```html
   <p class="no-positions">
     No positions are currently advertised. Please check back or get in touch
     speculatively - we are always happy to hear from exceptional candidates.
   </p>
   ```

---

### 👤 Nuno's page - `sections/nuno.html`

Standalone page with Nuno's full profile: bio, CV timeline, complete publication list, press coverage.

Older press clippings and documents (PDFs, scanned photos) linked from the "In the Press" tab live in `sections/nuno/` - keep new attachments there too, and link to them as `nuno/filename.ext`.

**To add a publication**, find the correct year section and add a `<li class="nuno-pub-item">` inside the matching `<ul class="nuno-pub-list">`:

```html
<li class="nuno-pub-item">
  <span class="nuno-pub-num"></span>
  Smith A, <strong>Barbosa-Morais NL</strong>.
  "Paper title."
  <em>Journal Name</em>, 2026;1(1):1-10.
  [<a href="https://pubmed.ncbi.nlm.nih.gov/XXXXXXXX/" target="_blank" rel="noopener">PubMed</a>]
</li>
```

Leave `<span class="nuno-pub-num">` **empty** - numbers are assigned automatically by JavaScript.

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
In the research section panels, the global legend is already shown - no per-entry note needed.

### External links
Always open external links in a new tab:
```html
<a href="https://..." target="_blank" rel="noopener">Link text</a>
```

---

## Accessibility (ARIA)

**ARIA** stands for *Accessible Rich Internet Applications*. It is a set of HTML attributes defined by the W3C (the web standards body) that describe the *purpose and state* of UI elements to assistive technologies - primarily screen readers used by people with visual impairments.

Without ARIA, a screen reader encountering a `<div>` that opens a modal when clicked has no idea what it does. ARIA lets you annotate it: `role="button"` says "this is a button", `aria-label="Close modal"` says what the button does, `aria-modal="true"` tells the screen reader the dialog is modal so it doesn't read background content.

### What has been implemented on this site

- **Research card modals** - each card has `role="button"`, `tabindex="0"` (keyboard focusable), and responds to Enter/Space. The modal itself has `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title heading. Focus is moved to the Close button when the modal opens.
- **Modal close button** - labelled with `aria-label="Close modal"` (visible icon only, no text).
- **Bluesky feed cards** - each post card has `tabindex="0"`, `role="button"`, and an `aria-label` with the post text.
- **Photo lightbox** - `role="dialog"`, `aria-modal="true"`, `aria-label="Full-size photo"`.
- **Carousel navigation buttons** - each dot/button has `aria-label="Go to slide N"`.
- **Decorative icons and images** - marked `aria-hidden="true"` so screen readers skip them.
- **RSS feed icon** in the BIOMICS news label - `aria-hidden="true"`.
- **BIOMICS video thumbnails** - each thumbnail wrapper has `role="button"`, `tabindex="0"`, and `aria-label="Play <video title>"`. The SVG play icon is `aria-hidden="true"`. Pressing Enter or Space triggers playback.

### WCAG AA colour contrast

All foreground/background colour combinations were audited programmatically against the WCAG 2.1 Level AA threshold (4.5:1 for normal text, 3:1 for large text). Several colours were adjusted to pass - see the colour variables in `css/styles.css` (`:root`) for the current accessible values. The key changes were:

| Token | Before | After | Reason |
|---|---|---|---|
| `--teal` | `#0D9488` | `#087c72` | Failed on white (3.74:1) |
| `--teal-on-dark` | - | `#14B8A6` | Separate token for dark-bg contexts |
| `--slate` | `#64748B` | `#5f6e85` | Failed on fog bg (4.31:1) |
| Muted captions | `#94A3B8` | `#65707e` | Failed on white (2.56:1) |
| Cancer pill text | `#e11d48` | `#c71640` | Failed on pill bg (4.28:1) |
| Bio pill text | `#0d9488` | `#087c72` | Failed on pill bg (3.59:1) |
| Biostatistics pill text | - | `#92400e` (amber-800) | New theme; ~7.5:1 on `#fffbeb` pill bg |
| Evolutionary pill text  | - | `#166534` (green-800) | New theme; ~7:1 on `#f0fdf4` pill bg |
| Collaboration pill text | - | `#0369a1` (sky-700)   | New theme; ~5.7:1 on `#f0f9ff` pill bg |

### Further improvements to consider

- Add `lang="en"` to the `<html>` tag in all pages (already present in `index.html` - verify standalone pages).
- Add `<title>` elements to standalone pages that are currently generic.
- Ensure all form inputs (if any are added in future) have associated `<label>` elements.
- Test with an actual screen reader (e.g. VoiceOver on macOS: Cmd+F5) for a real-world check.

---

## Bluesky feed

The News section automatically fetches the most recent posts from `@nmoraislab.bsky.social` via the public AT Protocol API (no key required). Reposts are filtered out. To change the account, edit the `HANDLE` constant at the top of `loadBlueskyFeed()` in `js/main.js`.

---

## Analytics

The site runs **Google Analytics 4**, property Measurement ID **`G-6FLD1GNCMB`**. The Measurement ID is not a secret - it's meant to appear in public page source, and on its own can't be used to read the analytics dashboard or modify the site (only Google accounts granted access to the GA property can view data).

The tag is installed in the `<head>` of every **standalone** page - i.e. every file with its own `<head>`, `<title>`, and URL:
- `index.html`
- `join.html`
- `news.html`
- `publications.html`
- `sections/nuno.html`
- `games/monster-scientists.html`
- `games/arvore_inteligente.html`

Files under `sections/` (other than `nuno.html`) are **fragments** with no `<head>` - they're fetched by `js/main.js` and injected into `index.html` at runtime, so they're already covered by the tag on `index.html` and must never get their own copy.

**To change the Measurement ID** (e.g. new property), replace `G-6FLD1GNCMB` in the snippet below across all seven files listed above:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6FLD1GNCMB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6FLD1GNCMB');
</script>
```

**Per-page breakdowns** (e.g. news.html vs publications.html visits) are available in GA under Reports → Engagement → Pages and screens - one property, all pages, no separate setup needed per page.

---

### Checking analytics data

1. Go to [analytics.google.com](https://analytics.google.com) and sign in with an account that has access to this property.
2. **Reports → Realtime** shows visits happening right now (within seconds/minutes) - the fastest way to confirm the tag is working. Open the live site yourself in a normal browser tab (no ad blocker, no "Do Not Track") and watch a visit appear.
3. **Reports → Engagement → Pages and screens** shows visits broken down by individual page (homepage, news.html, publications.html, etc.) over a selected date range.
4. **Reports → Acquisition** shows where visitors are coming from (Google search, direct link, social, referral).

**New properties** can take 24-48 hours before data appears in the standard Reports section (not Realtime) - this is expected GA processing latency, not a sign anything is broken.

If Realtime shows nothing after visiting the live site yourself, check that the GA tag is actually present in the page source (View Page Source in the browser, search for `G-6FLD1GNCMB`), and check GA Admin → Data Streams → your web stream to confirm the stream URL matches `https://diseasetranscriptomicslab.github.io`.

---

## Google Search - indexing & Search Console

The site is registered with **Google Search Console** so its pages can be found via Google Search and to monitor indexing issues.

### Checking indexing status

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and select the `diseasetranscriptomicslab.github.io` property.
2. **URL Inspection** (search bar at the top) - paste any page URL (e.g. the homepage) to see whether Google has indexed it, when it was last crawled, and any errors found. Use **"Test Live URL"** to check the current live version rather than Google's last cached crawl.
3. **Indexing → Pages** (left sidebar) shows a breakdown of indexed vs excluded pages sitewide, with reasons for any exclusions.
4. To request indexing of a page that isn't showing up yet, run a URL Inspection on it and click **Request indexing** - this nudges Google to crawl it sooner rather than waiting for its own schedule (which can otherwise take weeks for new pages).

### Checking the sitemap

1. **Sitemaps** (left sidebar, under Indexing) shows the submission status of `sitemap.xml` - pages found, videos found, and last read date.
2. The sitemap lives at `sitemap.xml` (repo root) and lists the standalone pages worth indexing (homepage, publications, news, join, Nuno's profile). It's referenced from `robots.txt`.
3. **If Search Console shows "couldn't read" or "couldn't fetch" the sitemap**, first confirm the file itself is fine by opening `https://diseasetranscriptomicslab.github.io/sitemap.xml` directly in a browser - it should show XML content, not an error page. If it looks fine there, the Search Console status is usually just stale (cached from an earlier failed attempt, e.g. before a fix was deployed or before the repo was made public) - remove the sitemap entry and resubmit, then allow up to a day for Google to re-crawl. Search Console errors ("Ocorreu um erro" / "An error occurred, try again in a few hours") are sometimes just transient issues on Google's own backend, unrelated to the site.

### Updating the sitemap

When adding a new standalone page (not a `sections/*.html` fragment), add a `<url>` entry to `sitemap.xml`:

```xml
<url>
  <loc>https://diseasetranscriptomicslab.github.io/your-new-page.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

Fragments injected into `index.html` don't need their own sitemap entry - the homepage entry already covers them.

### Structured data

`index.html` includes a `ResearchOrganization` JSON-LD block (in `<head>`) that helps Google understand who the lab is for rich search results. If you ever edit it, validate the JSON syntax first (a single missing or trailing comma will break it) - Search Console's **Enhancements** report will flag `"Detected structured data with syntax errors"` if it's invalid.

---

## Acknowledgements

The first draft of this website - structure, layout, CSS design system, JavaScript, and outreach games - was built with **[Claude Sonnet 4.6](https://www.anthropic.com/claude)** (Anthropic) via Cowork mode.

---

*Disease Transcriptomics Lab · NOVA Medical School · Lisboa, Portugal*
