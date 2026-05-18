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
│   └── main.js                  ← Section loader · nav · animations · Bluesky feed
│
├── sections/                    ← ★ Edit content here ★
│   ├── hero.html                ← Hero / landing section
│   ├── about.html               ← About the lab + graphical abstract
│   ├── team.html                ← PI card + team member cards
│   ├── software.html            ← Web apps, R packages, tools in development
│   ├── publications.html        ← Selected publications (year-grouped timeline)
│   ├── news.html                ← Social buttons; Bluesky feed is auto-loaded
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
│   └── photos/                  ← Team + group photos
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
| `sections/publications.html` | Add papers grouped by year |
| `sections/software.html` | Add tools, update links and descriptions |
| `sections/alumni.html` | Add former members (most recent departure first) |
| `sections/outreach.html` | Add/update science communication games |
| `sections/about.html` | Lab description, graphical abstract |
| `sections/hero.html` | Headline, tagline, affiliation badges |
| `sections/news.html` | Social button URLs (Bluesky feed is automatic) |
| `sections/location.html` | Address text, map pin |
| `index.html` | Funding logos (static block near the footer) |

### Adding a team member

Copy any `.member-card` block in `sections/team.html` and update:
- Name, flag emoji, role badge
- Bio (`.member-bio`), research interests (`.member-interests`), fun fact (`.member-fun-fact`)
- Email `href` and display text
- Social links (ORCID, LinkedIn, Bluesky, GitHub — use `href="#"` to hide unused ones)
- Photo: replace `<div class="member-photo"><img src="..." /></div>` with your image path

Photos are automatically cropped to a consistent `5/4` aspect ratio — any size works.

### Adding a publication

Publications are grouped by year. Copy a `.pub-paper` block inside the matching `.pub-year-papers` container (or copy a full `.pub-year-group` block to start a new year). Keep years in reverse chronological order.

### Adding an alumni entry

Add an `<li class="alumni-item">` in `sections/alumni.html`:
```html
<li class="alumni-item">
  <a href="https://linkedin.com/in/..." target="_blank" rel="noopener">Full Name</a>
  <span class="alumni-meta">· Role · (2021–2025)</span>
</li>
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

*Disease Transcriptomics Lab · NOVA Medical School · Lisboa, Portugal*
