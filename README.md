# NMorais Lab — Disease Transcriptomics Lab Website

> **Built with the assistance of [Claude Sonnet 4.6](https://www.anthropic.com/claude) by Anthropic.**  
> The initial codebase, structure, and design were generated and refined using Claude Sonnet 4.6 as a senior web development assistant. All scientific content and logos belong to the NMorais Lab.

---

## Overview

A static, single-repository website for the **Disease Transcriptomics Lab (NMorais Lab)** at NOVA Medical School, Lisbon. Designed to be hosted on **GitHub Pages** with a custom domain.

---

## File Architecture

```
nmoraislab/
│
├── index.html                  ← Main entry point — assembles all sections via <script> includes
│
├── css/
│   └── styles.css              ← All design tokens, layout, and component styles
│
├── js/
│   └── main.js                 ← Navigation, scroll animations, mobile menu
│
├── sections/
│   ├── hero.html               ← Hero / landing section
│   ├── about.html              ← About the lab + mission
│   ├── team.html               ← PI card + team member cards ← EDIT TEAM HERE
│   ├── software.html           ← Web apps + software tools   ← EDIT TOOLS HERE
│   ├── publications.html       ← Selected publications list  ← EDIT PUBS HERE
│   └── news.html               ← Social media feed widget    ← EDIT NEWS HERE
│
└── assets/
    └── logos/ 
        ├── logo-icon.png           ← DNA icon (white, transparent bg) — used in nav
        └── logo-full-dark.png      ← Full logo (white text, transparent bg) — used in hero
```

---

## How to Edit Content (No Coding Required)

Each section lives in its own file inside `/sections/`. Open the relevant file in any text editor (Notepad, TextEdit, VS Code) and look for the `<!-- EDIT ... HERE -->` comments.

| File | What to edit |
|---|---|
| `sections/team.html` | Add/remove team member cards, update names, emails, roles, social links |
| `sections/software.html` | Add new tools, update links, change descriptions |
| `sections/publications.html` | Add publications in reverse chronological order |
| `sections/news.html` | Paste your Curator.io / Elfsight social feed embed code |
| `sections/about.html` | Update lab description, replace lab photo |
| `sections/hero.html` | Edit headline and hero tagline |

---

## Hosting on GitHub Pages (Recommended)

### Step 1 — Create a repository
1. Go to [github.com](https://github.com) and create a **new repository**.
2. Name it `nmoraislab.github.io` (for a root URL) **or** any name like `website` (the site will be at `yourusername.github.io/website`).
3. Set visibility to **Public**.

### Step 2 — Upload the files
Upload the entire folder contents (all files and folders) to the repository root.  
Or use Git:
```bash
git init
git add .
git commit -m "Initial lab website"
git remote add origin https://github.com/YOUR_ORG/nmoraislab.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to **Settings → Pages**.
2. Under *Source*, select **Deploy from a branch → main → / (root)**.
3. Click **Save**. Your site will be live at `https://YOUR_ORG.github.io` within ~2 minutes.

### Step 4 — Connect a custom domain (e.g. `lab.nmoraislab.org`)
1. In the repository root, create a file named exactly `CNAME` containing just your domain:
   ```
   lab.nmoraislab.org
   ```
2. In your DNS provider, add these **A records** pointing to GitHub's servers:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. Also add a **CNAME record**: `www` → `YOUR_ORG.github.io`
4. Back in GitHub → Settings → Pages → Custom domain, enter `lab.nmoraislab.org` and enable **Enforce HTTPS**.

DNS propagation takes up to 48 hours. After that, HTTPS is automatic via Let's Encrypt.

---

## Social Feed (News Section)

The news section is designed to host a **Curator.io** embed (free tier supports ~25 posts).

1. Sign up at [curator.io](https://curator.io)
2. Connect your **LinkedIn Company page** and/or **Bluesky** account
3. Create a feed, style it to match the site (teal/white palette)
4. Copy the two-line embed code and paste it into `sections/news.html`  
   Look for: `<!-- PASTE CURATOR.IO EMBED CODE HERE -->`

---

## Updating the Site

After any edit, simply **commit and push** to the `main` branch on GitHub. Pages re-deploys automatically within ~60 seconds.

For non-Git users: use the **GitHub web editor** (click any file → pencil icon ✏️ → edit → Commit changes).

---

## Credits

- Website generated with **Claude Sonnet 4.6** (Anthropic, 2025)
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- Social feed: [Curator.io](https://curator.io)
- Hosting: [GitHub Pages](https://pages.github.com)
- Lab logo design: NMorais Lab

---

*NMorais Lab · Disease Transcriptomics · NOVA Medical School · GIMM · Lisbon, Portugal*
