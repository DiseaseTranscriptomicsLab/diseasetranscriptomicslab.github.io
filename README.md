# Disease Transcriptomics Lab — Website

> Built with [Claude Sonnet 4.6](https://www.anthropic.com/claude) (Anthropic).
> All scientific content and logos belong to the Disease Transcriptomics Lab.

---

## Overview

Static website for the **Disease Transcriptomics Lab** at NOVA Medical School, Lisbon.  
Hosted on **GitHub Pages** at `https://diseasetranscriptomicslab.github.io` (or a custom domain).

---

## File Architecture

```
nmoraislab.github.io/
│
├── index.html                   ← Shell: nav + section placeholders + footer
│                                  (do not put content here — edit sections/ instead)
├── css/
│   └── styles.css               ← All design tokens, layout, and component styles
│
├── js/
│   └── main.js                  ← Section loader · Nav · Animations · Bluesky feed
│
├── sections/                    ← ★ EDIT CONTENT HERE ★
│   ├── hero.html                ← Hero / landing section
│   ├── about.html               ← About the lab + lab photo
│   ├── team.html                ← PI card + team member cards
│   ├── software.html            ← Web apps, R packages, tools in development
│   ├── publications.html        ← Selected publications list
│   ├── news.html                ← Social follow buttons (Bluesky feed is auto-loaded)
│   ├── alumni.html              ← Former lab members
│   └── location.html            ← Address + OpenStreetMap embed
│
└── assets/
    ├── logos/
    │   ├── logo-icon.png        ← DNA icon (white on transparent) — nav + footer
    │   └── logo-full-dark.png   ← Full logo (white on transparent) — hero
    └── photos/                  ← Team photos (add here, reference in team.html)
```

---

## How It Works

`index.html` is a **shell** — it contains only the navigation, placeholder `<div>`s, and the footer. When the page loads, `js/main.js` fetches each `sections/*.html` file over HTTP and injects it into the matching placeholder. This keeps every section independently editable.

---

### ⚠ Local preview — you must use an HTTP server

> **Opening `index.html` directly in your browser will show a blank page.**  
> Browsers block `fetch()` on `file://` for security. This is expected behaviour.

**To preview the site locally:**

1. Open a **Terminal** (on Mac: Spotlight → "Terminal")
2. Navigate to the site folder:
   ```bash
   cd /path/to/nmoraislab.github.io
   ```
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open **[http://localhost:8000](http://localhost:8000)** in your browser

If you see a yellow banner at the top of the page, you opened the file directly — follow the instructions in the banner.

> **On GitHub Pages (HTTPS), everything works automatically** — no server needed after pushing.

---

---

## How to Edit Content

Open the relevant file in `sections/`, make your changes, then commit and push.

| File | What to edit |
|---|---|
| `sections/team.html` | Add/remove team members, update names, emails, roles, ORCID, social links, bios |
| `sections/software.html` | Add tools, update links and descriptions |
| `sections/publications.html` | Add papers (newest first) |
| `sections/alumni.html` | Add former members (newest departure first) |
| `sections/about.html` | Lab description, replace lab photo placeholder |
| `sections/hero.html` | Headline, tagline, affiliation badges |
| `sections/news.html` | Social button URLs (Bluesky/LinkedIn/X); Bluesky feed is automatic |
| `sections/location.html` | Address text, map pin coordinates |

### Adding a team member

Copy any `.member-card` block in `sections/team.html` and update:
- Name, flag emoji, role badge
- Bio text (`.member-bio`)
- Research interests (`.member-interests`)
- Email `href` and display text
- Social links: ORCID, LinkedIn, Bluesky, GitHub (use `href="#"` to hide unused ones)
- Photo: replace `<div class="member-photo-placeholder">XX</div>` with `<img src="assets/photos/firstname-lastname.jpg" />`

### Adding a publication

Copy a `.pub-item` block in `sections/publications.html` and update the year, title, DOI link, authors, journal, and tags.

### Adding an alumni entry

Add an `<li class="alumni-item">` to the list in `sections/alumni.html`:
```html
<li class="alumni-item">
  <a href="https://linkedin.com/in/..." target="_blank" rel="noopener">Full Name</a>
  <span class="alumni-meta">· Role · (2021–2025)</span>
</li>
```
Keep entries ordered by most recent departure date.

---

## Bluesky Live Feed

The News section automatically fetches and displays the 6 most recent posts from `@nmoraislab.bsky.social` using the **public AT Protocol API** — no account or API key required.

- Posts include images when present (single, pair, or grid layout)
- Reposts are filtered out (original posts only)
- To change the account, edit the `HANDLE` constant at the top of `loadBlueskyFeed()` in `js/main.js`

---

## Design Tokens

To retheme the site, edit the CSS variables at the top of `css/styles.css`:

```css
:root {
  --navy:       #0D1B2A;   /* dark background, headings */
  --teal:       #0D9488;   /* accent colour             */
  --teal-light: #14B8A6;   /* hover states              */
  --slate:      #64748B;   /* secondary text            */
  --fog:        #F0F4F8;   /* alternate section bg      */
}
```

---

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**.
3. The site is live at `https://YOUR_ORG.github.io` within ~2 minutes.

### Custom domain

Create a `CNAME` file in the repository root containing your domain:
```
lab.nmoraislab.org
```
Add DNS **A records** pointing to GitHub's IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
And a **CNAME record**: `www` → `YOUR_ORG.github.io`.

Enable **Enforce HTTPS** in GitHub → Settings → Pages.

---

## Updating the Site

After any edit, commit and push to `main`. GitHub Pages redeploys automatically within ~60 seconds.

For non-Git users: use the **GitHub web editor** (click a file → pencil icon ✏ → edit → Commit changes).

---

## Credits

- Website built with **Claude Sonnet 4.6** (Anthropic, 2025)
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Map: [OpenStreetMap](https://www.openstreetmap.org) (free, no API key)
- Social feed: [AT Protocol public API](https://docs.bsky.app) (free, no key)
- Hosting: [GitHub Pages](https://pages.github.com)
- Icons: inline SVG (Simple Icons for brand logos)
- Lab logo: Disease Transcriptomics Lab

---

*Disease Transcriptomics Lab · NOVA Medical School · Lisboa, Portugal*
