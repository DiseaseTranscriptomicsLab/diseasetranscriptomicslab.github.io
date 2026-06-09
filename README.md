# Disease Transcriptomics Lab — Website

Static website for the **Disease Transcriptomics Lab** at NOVA Medical School, Lisbon.  
Hosted on **GitHub Pages** at [`https://nmoraislab.github.io`](https://nmoraislab.github.io).

---

## File structure

```
nmoraislab.github.io/
│
├── index.html                   ← Shell: nav, section placeholders, funding block, footer
│                                  (edit section content in sections/ instead)
├── css/
│   └── styles.css               ← All design tokens, layout, and component styles
├── js/
│   ├── main.js                  ← Section loader · nav · animations · Bluesky feed
│   └── news-data.js             ← ★ All lab news items (LAB_NEWS array) — edit here ★
│
├── sections/                    ← ★ Edit content here ★
│   ├── hero.html                ← Hero / landing section
│   ├── about.html               ← About the lab + graphical abstract
│   ├── team.html                ← PI card + team member cards
│   ├── nuno.html                ← Nuno Barbosa-Morais full profile page (standalone)
│   ├── research.html            ← Research themes, ongoing projects, area publications
│   ├── software.html            ← Web apps, R packages, tools in development
│   ├── publications.html        ← Full publication list (year-grouped, filterable, searchable)
│   ├── news.html                ← Social buttons; Bluesky feed + BIOMICS spotlight
│   ├── outreach.html            ← Science communication games
│   ├── alumni.html              ← Former lab members
│   └── location.html            ← Address + OpenStreetMap embed
│
├── assets/
│   ├── logos/
│   │   ├── logo-icon.png        ← DNA icon (white on transparent) — nav + footer
│   │   ├── logo-icon-black.png  ← Same icon inverted — favicon on light-mode tabs
│   │   ├── logo-full-dark.png   ← Full logo (white on transparent) — hero
│   │   └── funding/             ← Funder logos (EMBO, FCT, BIOMICS, EU flag)
│   ├── photos/                  ← Team + group photos
│   └── news/                    ← ★ Photos for news items — store new ones here ★
│
└── games/
    ├── monster-scientists.html  ← Outreach game (bilingual EN/PT)
    └── arvore_inteligente.html  ← Outreach game (PT only; In development)
```

---

## How it works

`index.html` is a shell containing only the nav, empty `<div>` placeholders, a static funding block, and the footer. On page load, `js/main.js` fetches each `sections/*.html` file and injects it into its placeholder — keeping every section independently editable without touching `index.html`.

---

## Local preview

> **Opening `index.html` directly in your browser will show a blank page.**  
> Browsers block `fetch()` on `file://`. You need a local HTTP server.

```bash
cd /path/to/diseasetranscriptomicslab.github.io
python3 -m http.server 8000
```

Then open **[http://localhost:8000](http://localhost:8000)**. A yellow banner appears automatically if you've opened the file directly.

---

## Editing content

| File | What to edit |
|---|---|
| `sections/team.html` | Add/remove members, update names, roles, emails, bios, fun facts, social links |
| `sections/nuno.html` | Nuno's detailed profile page — background, **master publication list**, press |
| `sections/research.html` | Research themes, ongoing project cards, area publications (collapsible) |
| `sections/publications.html` | Container only — **do not add papers here**; manage via `nuno.html` (see below) |
| `sections/software.html` | Add/update tools, badges, links |
| `sections/alumni.html` | Add former members (most recent departure first) |
| `sections/outreach.html` | Add/update science communication games |
| `sections/about.html` | Lab description, graphical abstract |
| `sections/hero.html` | Headline, tagline, affiliation badges |
| `sections/news.html` | Social button URLs; BIOMICS videos; Bluesky feed is automatic |
| `sections/location.html` | Address text, map pin |
| `index.html` | Funding logos (static block near the footer), footer links |

### Nuno's profile page (`sections/nuno.html`)

This is a standalone HTML page (not injected via the section loader) with its own `<head>`, inline CSS, and scripts. It uses relative paths (`../css/`, `../assets/`, `../js/`) because it lives inside `sections/`. The PI card in `sections/team.html` links to it.

The "Back to team" link in `sections/nuno.html` points to `../index.html#team`. The `#team` hash scroll is handled by `js/main.js` after sections finish loading asynchronously.

### Adding a team member

Copy any `.member-card` block in `sections/team.html` and update:
- Name, flag emoji, role badge
- Bio (`.member-bio`), research interests (`.member-interests`), fun fact (`.member-fun-fact`)
- Email `href` and display text
- Social links (ORCID, LinkedIn, Bluesky, GitHub — use `href="#"` to hide unused ones)
- Photo: replace `<div class="member-photo"><img src="..." /></div>` with your image path

Photos are automatically cropped to a consistent `5/4` aspect ratio — any size works.

### Adding a publication

`sections/nuno.html` is the **single source of truth** for all publications. The main website's Publications section is auto-populated from it by `js/main.js` at page load — there is no paper data in `sections/publications.html`.

To add a paper:

1. Open `sections/nuno.html` and find the correct year section (or Preprints) in the publication list.
2. Add a new `<li class="nuno-pub-item">` with the citation.
3. If the paper should appear in the **main Publications section**, also add:
   ```html
   <li class="nuno-pub-item key-paper"
       data-selected="true"
       data-year="2025"
       data-authors="Smith A, Jones B, Barbosa-Morais NL"
       data-journal="Nature, 2025;123:456"
       data-tags="cancer,RNA-seq">
   ```
   - `key-paper` shows a ★ star on Nuno's page.
   - `data-selected="true"` makes the paper appear in the main publications section.
   - `data-year` controls which year group it appears under (`"preprint"` for preprints).
   - `data-tags` enables keyword filtering.

4. Push — both pages update automatically.

### Adding an alumni entry

Add an `<li class="alumni-item">` in `sections/alumni.html`:
```html
<li class="alumni-item">
  <a href="https://linkedin.com/in/..." target="_blank" rel="noopener">Full Name</a>
  <span class="alumni-meta">· Role · (2021–2025)</span>
</li>
```

---

## Adding news items

All news lives in **`js/news-data.js`** as a JavaScript array called `LAB_NEWS`. Items are displayed newest-first: the first item in the array is the most recent. The homepage shows the 4 most recent; `news.html` shows all of them.

### Basic structure

```js
{
  date:     "June 2025",            // Month + year (displayed as-is)
  title:    "Short, clear headline",
  image:    "assets/news/my-photo.jpg",   // ← always try to include a photo (see below)
  imageAlt: "Brief description of the image for accessibility",
  summary:  "One or two sentences shown on the news card.",
  content: `
    <p>Full HTML content shown when the card is clicked. Can include
    <a href="https://..." target="_blank" rel="noopener">links</a>,
    <strong>bold text</strong>, multiple paragraphs, etc.</p>
  `,
},
```

Add new items at the **top** of the array (before the current first item) so they appear first.

### Photos — best practices

**Always try to include a photo.** News cards without images look sparse; a graphical abstract, screenshot, group photo, or poster image makes a big difference.

- **Store photos in `assets/news/`** — not in `assets/photos/` (that folder is for team photos).
- **Use descriptive filenames**: `voyAGEr.jpg`, `icsa2019-poster.jpg`, `lab-retreat-2025.jpg`. Avoid generic names like `image1.jpg`.
- **Preferred formats**: JPEG for photos/graphical abstracts, PNG if transparency is needed.
- **Size**: aim for images at least 800 px wide. Very large files (>2 MB) should be compressed before adding — free tools like [Squoosh](https://squoosh.app) work well.
- Set a meaningful `imageAlt` string — it is read by screen readers and shown if the image fails to load.

Good sources for paper news items:
- **Graphical abstracts** from the paper PDF or journal page
- **Key figures** that summarise the main finding
- **Screenshots** of web tools (voyAGEr, betAS, psichomics…)
- **Event photos** for conferences, awards, retreats

### Multiple images (gallery)

If you want a gallery inside the modal (click to expand, lightbox on click), use the `images` array instead of a single `image`:

```js
{
  date:  "June 2025",
  title: "Lab retreat 2025",
  images: [
    { src: "assets/news/retreat-2025-group.jpg",   alt: "Lab group photo at retreat" },
    { src: "assets/news/retreat-2025-hiking.jpg",  alt: "Hiking on day two" },
    { src: "assets/news/retreat-2025-dinner.jpg",  alt: "Dinner on the last evening" },
  ],
  summary: "...",
  content: `...`,
},
```

The first image in the `images` array is also used as the card thumbnail.

### Links in content

Always open external links in a new tab:
```html
<a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener">Read the paper ↗</a>
```

### Example — paper announcement

```js
{
  date:     "June 2025",
  title:    "Our new paper on RNA splicing published in Nature",
  image:    "assets/news/splicing-2025.jpg",
  imageAlt: "Graphical abstract: exon inclusion rates across cancer types",
  summary:  "Our study on tissue-specific alternative splicing dysregulation in cancer is now published in Nature.",
  content: `
    <p>
      Our paper <em>"Widespread alternative splicing dysregulation in cancer"</em>
      is now published in <em>Nature</em>. 🎉
    </p>
    <p>
      <a href="https://doi.org/10.1038/..." target="_blank" rel="noopener">Read the paper ↗</a>
    </p>
  `,
},
```

---

## Bluesky feed

The News section automatically fetches the most recent posts from `@nmoraislab.bsky.social` via the public AT Protocol API (no key required). Reposts are filtered out. To change the account, edit the `HANDLE` constant at the top of `loadBlueskyFeed()` in `js/main.js`.

---

## Deploying

Push to `main` — GitHub Pages redeploys automatically within ~60 seconds.

**First-time setup:** Settings → Pages → Source → Deploy from branch → `main` → `/ (root)`.

For non-Git users: edit any file on GitHub (click it → pencil icon ✏ → Commit changes).

---

---

## Acknowledgements

The first draft of this website — structure, layout, CSS design system, JavaScript, and outreach games — was built with **[Claude Sonnet 4.6](https://www.anthropic.com/claude)** (Anthropic) via Cowork mode.

---

*Disease Transcriptomics Lab · NOVA Medical School · Lisboa, Portugal*
