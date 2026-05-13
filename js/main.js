/* ================================================================
   NMorais Lab — main.js
   Section loader · Navigation · Scroll animations · Bluesky feed
   ================================================================ */

/* ── Section loader ─────────────────────────────────────────────
   Each section lives in sections/*.html and is fetched at runtime.
   This works on GitHub Pages (HTTPS). For local development, run
   a simple HTTP server:  python3 -m http.server 8000
   ──────────────────────────────────────────────────────────────── */
async function loadSection(id, file) {
  try {
    const res = await fetch(`sections/${file}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  } catch (e) {
    console.warn(`Could not load section "${file}":`, e.message);
  }
}

async function loadSections() {
  await Promise.all([
    loadSection('section-hero',         'hero.html'),
    loadSection('section-about',        'about.html'),
    loadSection('section-team',         'team.html'),
    loadSection('section-software',     'software.html'),
    loadSection('section-publications', 'publications.html'),
    loadSection('section-news',         'news.html'),
    loadSection('section-alumni',       'alumni.html'),
    loadSection('section-location',     'location.html'),
  ]);
}

/* ── Navigation ─────────────────────────────────────────────────── */
function initNav() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const drawer    = document.getElementById('nav-drawer');
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.toggle('open'));
    drawer.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => drawer.classList.remove('open'))
    );
  }

  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }
}

/* ── Scroll-triggered fade-up animations ───────────────────────── */
function initAnimations() {
  const fadeEls = document.querySelectorAll('.fade-up:not(.visible)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }
}

/* ── Smooth scroll ──────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Copyright year ─────────────────────────────────────────────── */
function updateYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Bluesky live feed ──────────────────────────────────────────
   Uses the public AT Protocol API — no API key required.
   Posts are loaded after sections are injected into the DOM.
   Images (single, pair, or grid) are rendered when present.
   ──────────────────────────────────────────────────────────────── */
function loadBlueskyFeed() {
  const HANDLE  = 'nmoraislab.bsky.social';
  const LIMIT   = 6;
  const API_URL = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed` +
                  `?actor=${HANDLE}&limit=${LIMIT}&filter=posts_no_replies`;

  function formatDate(isoStr) {
    return new Date(isoStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  function esc(str) {
    return (str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderImages(embed) {
    if (!embed) return '';
    let images = [];
    const type = embed.$type || '';
    if (type === 'app.bsky.embed.images#view') {
      images = embed.images || [];
    } else if (
      type === 'app.bsky.embed.recordWithMedia#view' &&
      embed.media && embed.media.$type === 'app.bsky.embed.images#view'
    ) {
      images = embed.media.images || [];
    }
    if (!images.length) return '';
    const cls = images.length === 1 ? 'bsky-img-single'
              : images.length === 2 ? 'bsky-img-double'
              : 'bsky-img-grid';
    const imgs = images
      .map(img => `<img src="${esc(img.thumb)}" alt="${esc(img.alt || '')}" loading="lazy" />`)
      .join('');
    return `<div class="bsky-images ${cls}">${imgs}</div>`;
  }

  function renderCard(item) {
    const post    = item.post;
    const record  = post.record;
    const author  = post.author;
    const text    = esc(record.text || '').replace(/\n/g, '<br>');
    const date    = formatDate(record.createdAt);
    const rkey    = post.uri.split('/').pop();
    const postUrl = `https://bsky.app/profile/${author.handle}/post/${rkey}`;
    const avatar  = author.avatar
      ? `<img src="${esc(author.avatar)}" alt="${esc(author.displayName || author.handle)}" loading="lazy" />`
      : '';
    return `
      <div class="bsky-card">
        <div class="bsky-card-header">
          <div class="bsky-avatar">${avatar}</div>
          <span class="bsky-handle">@${esc(author.handle)}</span>
          <span class="bsky-date">${date}</span>
        </div>
        <p class="bsky-text">${text}</p>
        ${renderImages(post.embed)}
        <a class="bsky-link" href="${esc(postUrl)}" target="_blank" rel="noopener">
          View on Bluesky ↗
        </a>
      </div>`;
  }

  const grid = document.getElementById('bsky-feed-grid');
  if (!grid) return;

  fetch(API_URL)
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
    .then(data => {
      const feed = (data.feed || []).filter(item => !item.reason); // skip reposts
      if (!feed.length) {
        grid.innerHTML = '<p class="bsky-loading">No posts yet — check back soon!</p>';
        return;
      }
      grid.innerHTML = feed.slice(0, LIMIT).map(renderCard).join('');
    })
    .catch(() => {
      grid.innerHTML =
        `<p class="bsky-error">Could not load posts. ` +
        `<a href="https://bsky.app/profile/${HANDLE}" target="_blank" rel="noopener">` +
        `Visit our Bluesky profile ↗</a></p>`;
    });
}

/* ── Local-server guard ─────────────────────────────────────────
   fetch() is blocked on file:// by all modern browsers.
   Show a clear on-screen banner instead of a blank page.
   ──────────────────────────────────────────────────────────────── */
function checkProtocol() {
  if (window.location.protocol !== 'file:') return false; // all good

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="local-dev-banner" style="
      position:fixed; top:0; left:0; right:0; z-index:9999;
      background:#FEF3C7; color:#78350F;
      padding:1rem 1.5rem; font-family:system-ui,sans-serif;
      font-size:.9rem; text-align:center; line-height:1.6;
      box-shadow:0 2px 12px rgba(0,0,0,.12);">
      <strong>⚠ Local preview:</strong>
      Open a terminal in the site folder and run
      <code style="background:#FDE68A;padding:.15rem .5rem;border-radius:4px;font-size:.85rem;">
        python3 -m http.server 8000
      </code>
      then open
      <a href="http://localhost:8000" style="color:#92400E;font-weight:600;">
        http://localhost:8000
      </a>
      &nbsp;·&nbsp;
      <em>Sections load via fetch() and require an HTTP server.</em>
    </div>
  `);
  // Push the nav down so it isn't hidden behind the banner
  const nav = document.getElementById('main-nav');
  if (nav) nav.style.top = '56px';
  return true;
}

/* ── Bootstrap ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  updateYear();
  initNav();

  if (checkProtocol()) return; // on file://, stop here — show banner only

  await loadSections(); // fetch + inject all sections into placeholders
  initAnimations();     // observe .fade-up elements now that sections are in the DOM
  initSmoothScroll();   // wire anchor links in freshly-injected sections
  loadBlueskyFeed();    // #bsky-feed-grid is now available in the DOM
});
