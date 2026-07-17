/* ================================================================
   NMorais Lab - main.js
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
    loadSection('section-research',     'research.html'),
    loadSection('section-software',     'software.html'),
    loadSection('section-news',         'news.html'),
    loadSection('section-outreach',     'outreach.html'),
    loadSection('section-publications', 'publications.html'),
    loadSection('section-alumni',       'alumni.html'),
    loadSection('section-location',     'location.html'),
  ]);

  /* Alternate section backgrounds automatically.
     Hero, about, and location keep their own styles. */
  const skipIds = new Set(['hero', 'about', 'location']);
  document.querySelectorAll('body > section').forEach((section, i) => {
    if (skipIds.has(section.id)) return;
    section.style.background = i % 2 === 0
      ? 'var(--fog)'
      : 'var(--white)';
  });
}

/* ── Research filter + pub-panel accordions ─────────────────────── */

// Theme colours used for stripe gradients and filter logic
const RESEARCH_THEME_COLOURS = {
  cancer:          '#fca5a5',
  neuro:           '#c4b5fd',
  bioinformatics:  '#5eead4',
  biostatistics:   '#fcd34d',
  evolutionary:    '#86efac',
  external:   '#7dd3fc',
};

// Render the coloured top stripe for each card.
// Supports a single theme (solid) or multiple themes (gradient).
function initResearchStripes() {
  document.querySelectorAll('#research-card-grid .research-card').forEach(card => {
    const stripe = card.querySelector('.research-card-stripe');
    if (!stripe) return;
    const themes = (card.dataset.theme || '').split(' ').map(t => t.trim()).filter(Boolean);
    const colours = themes.map(t => RESEARCH_THEME_COLOURS[t]).filter(Boolean);
    if (colours.length === 0) return;
    stripe.style.background = colours.length === 1
      ? colours[0]
      : `linear-gradient(to right, ${colours.join(', ')})`;
  });
}

function initResearchFilter() {
  // Filter bar - show/hide project cards and pub panels by theme
  const bar = document.getElementById('research-filter-bar');
  if (bar) {
    bar.querySelectorAll('.research-filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;
        bar.querySelectorAll('.research-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('#research-card-grid .research-card').forEach(card => {
          // A card matches if it has the filter theme anywhere in its space-separated list
          const themes = (card.dataset.theme || '').split(' ');
          card.style.display = (filter === 'all' || themes.includes(filter)) ? '' : 'none';
        });

        document.querySelectorAll('#research-pub-panels .research-pub-panel').forEach(panel => {
          panel.style.display = (filter === 'all' || panel.dataset.theme === filter) ? '' : 'none';
        });
      });
    });
  }

  // ── Research project modal ──────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'research-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'research-modal-title-heading');
  overlay.innerHTML = `
    <div class="research-modal">
      <button class="research-modal-close" aria-label="Close modal">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div class="research-modal-content"></div>
    </div>`;
  document.body.appendChild(overlay);

  function closeResearchModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', e => { if (e.target === overlay) closeResearchModal(); });
  overlay.querySelector('.research-modal-close').addEventListener('click', closeResearchModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeResearchModal(); });

  document.querySelectorAll('.research-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });

    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;

      // Collect all theme pills (single pill or multiple inside .research-theme-pills)
      const pillsEl  = this.querySelector('.research-theme-pills') || this.querySelector('.research-theme-pill');
      const pillsHTML = pillsEl ? pillsEl.outerHTML : '';
      const title    = this.querySelector('.research-card-title').innerHTML;
      const detail    = this.querySelector('.research-card-detail');
      const desc      = detail.querySelector('.research-card-desc').innerHTML;
      const preprint  = detail.querySelector('.research-card-preprint');
      const pubItems  = [...detail.querySelectorAll('.research-card-pub-list li')]
                          .map(li => `<li>${li.innerHTML}</li>`).join('');

      overlay.querySelector('.research-modal-content').innerHTML = `
        ${pillsHTML}
        <h3 id="research-modal-title-heading" class="research-modal-title">${title}</h3>
        <p class="research-modal-desc">${desc}</p>
        ${preprint ? preprint.outerHTML : ''}
        ${pubItems ? `
          <p class="research-modal-pubs-label">Publications in this area</p>
          <ul class="research-modal-pub-list">${pubItems}</ul>` : ''}
      `;

      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      overlay.querySelector('.research-modal-close').focus();
    });
  });
}

/* ── Research keyword filter ────────────────────────────────────── */
function initResearchKeywordFilter() {
  const input    = document.getElementById('research-keyword-search');
  const datalist = document.getElementById('research-keywords-datalist');
  if (!input || !datalist) return;

  const cards = [...document.querySelectorAll('#research-card-grid .research-card')];

  // Collect all unique keywords, sorted alphabetically, populate datalist
  const allKeywords = [...new Set(
    cards.flatMap(card =>
      [...card.querySelectorAll('.research-keyword')].map(el => el.textContent.trim())
    )
  )].sort((a, b) => a.localeCompare(b));

  datalist.innerHTML = allKeywords.map(kw => `<option value="${kw}">`).join('');

  function applyKeywordFilter(value) {
    const kw = value.trim().toLowerCase();
    if (!kw) {
      // Empty - restore whatever the theme filter dictates
      cards.forEach(card => { card.style.display = ''; });
      const themeBar = document.getElementById('research-filter-bar');
      const activeThemeBtn = themeBar && themeBar.querySelector('.research-filter-btn.active');
      if (activeThemeBtn && activeThemeBtn.dataset.filter !== 'all') {
        activeThemeBtn.click();
      }
      return;
    }
    // Reset theme filter to "all" visually
    const themeBar = document.getElementById('research-filter-bar');
    if (themeBar) {
      themeBar.querySelectorAll('.research-filter-btn').forEach(b => b.classList.remove('active'));
      const allBtn = themeBar.querySelector('[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
    }
    cards.forEach(card => {
      const cardKeywords = [...card.querySelectorAll('.research-keyword')]
        .map(el => el.textContent.trim().toLowerCase());
      card.style.display = cardKeywords.some(k => k.includes(kw)) ? '' : 'none';
    });
  }

  input.addEventListener('input', () => applyKeywordFilter(input.value));

  // When theme filter is clicked, clear keyword search
  const themeBar = document.getElementById('research-filter-bar');
  if (themeBar) {
    themeBar.querySelectorAll('.research-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => { input.value = ''; });
    });
  }
}

/* ── Software section filter ────────────────────────────────────── */
function initSoftwareFilter() {
  const bar = document.getElementById('software-filter-bar');
  if (!bar) return;

  bar.querySelectorAll('.software-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // Update active button
      bar.querySelectorAll('.software-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Show/hide individual tool cards
      document.querySelectorAll('#software-all-grid .tool-card').forEach(card => {
        if (filter === 'all' || card.dataset.toolType === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Publications - auto-populated from nuno.html ───────────────────
   Selected papers are marked in sections/nuno.html with:
     data-selected="true"
     data-year="YYYY"        (or "preprint")
     data-authors="..."
     data-journal="..."
     data-tags="tag1,tag2"
   This function fetches nuno.html, extracts those papers, and
   renders them grouped by year in #pub-selected-container.
   ──────────────────────────────────────────────────────────────── */
function escHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function loadSelectedPublications() {
  const container = document.getElementById('pub-selected-container');
  if (!container) return;

  try {
    const res = await fetch('publications.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const selected = tmp.querySelectorAll('.pubs-item[data-selected="true"]');
    if (!selected.length) {
      container.innerHTML = '<p style="color:var(--slate);padding:1rem 0;">No selected publications found.</p>';
      return;
    }

    /* Group by year - "preprint" first, then numeric years desc */
    const byYear = {};
    selected.forEach(li => {
      const year = (li.dataset.year || 'preprint').trim();
      if (!byYear[year]) byYear[year] = [];
      const link = li.querySelector('a');
      byYear[year].push({
        title:   (link?.textContent || '').trim().replace(/\.$/, ''),
        url:     link?.getAttribute('href') || '#',
        authors: (li.dataset.authors || '').trim(),
        journal: (li.dataset.journal || '').trim(),
        tags:    (li.dataset.tags   || '').split(',').map(t => t.trim()).filter(Boolean),
      });
    });

    const numericYears = Object.keys(byYear)
      .filter(y => y !== 'preprint' && !isNaN(parseInt(y)))
      .sort((a, b) => parseInt(b) - parseInt(a));
    const years = byYear['preprint']
      ? ['preprint', ...numericYears]
      : numericYears;

    container.innerHTML = years.map(year => `
      <div class="pub-year-group fade-up" data-pub-year="${escHtml(year)}">
        <div class="pub-year-header">
          <div class="pub-year-dot"></div>
          <span class="pub-year-label">${year === 'preprint' ? 'Preprints' : escHtml(year)}</span>
        </div>
        <div class="pub-year-papers">
          ${byYear[year].map(p => `
            <div class="pub-paper" data-selected="true">
              <div class="pub-title">
                <a href="${escHtml(p.url)}" target="_blank" rel="noopener">${escHtml(p.title)}</a>
              </div>
              ${p.authors ? `<div class="pub-authors">${escHtml(p.authors)}</div>` : ''}
              ${p.journal ? `<div class="pub-journal">${escHtml(p.journal)}</div>` : ''}
              ${p.tags.length ? `<div class="pub-tags">${p.tags.map(t => `<span class="pub-tag">${escHtml(t)}</span>`).join('')}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>`).join('');

    initPublicationsKeywordSearch();
    initAnimations(); // animate freshly injected .fade-up elements

  } catch (e) {
    console.warn('Could not load selected publications:', e);
    container.innerHTML =
      `<p style="color:var(--slate);padding:1rem 0;">
        Could not load publications.
        <a href="sections/nuno.html#publications" style="color:var(--teal);">View on Nuno\'s page ↗</a>
      </p>`;
  }
}

/* ── Publications keyword search (no filter buttons) ────────────── */
function initPublicationsKeywordSearch() {
  const input = document.getElementById('pub-keyword-search');
  if (!input) return;

  /* Clone to remove any previous listener */
  const fresh = input.cloneNode(true);
  input.parentNode.replaceChild(fresh, input);

  fresh.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('#pub-selected-container .pub-year-group').forEach(group => {
      let anyVisible = false;
      group.querySelectorAll('.pub-paper').forEach(paper => {
        const show = !q || paper.textContent.toLowerCase().includes(q);
        paper.style.display = show ? '' : 'none';
        if (show) anyVisible = true;
      });
      group.style.display = anyVisible ? '' : 'none';
    });
  });
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
   Uses the public AT Protocol API - no API key required.
   Posts are loaded after sections are injected into the DOM.
   Images (single, pair, or grid) are rendered when present.
   ──────────────────────────────────────────────────────────────── */
function loadBlueskyFeed() {
  const HANDLE   = 'nmoraislab.bsky.social';
  const DISPLAY  = 3;   // posts to show (3 columns × 1 row)
  const FETCH    = 20;  // fetch more so filtering reposts still leaves enough
  const API_URL  = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed` +
                   `?actor=${HANDLE}&limit=${FETCH}&filter=posts_no_replies`;

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
    return `
      <div class="bsky-card">
        <span class="bsky-card-date"><span class="bsky-card-dot"></span>${date}</span>
        <p class="bsky-text">${text}</p>
        <a class="bsky-link" href="${esc(postUrl)}" target="_blank" rel="noopener">View on Bluesky ↗</a>
      </div>`;
  }

  const grid = document.getElementById('bsky-feed-grid');
  if (!grid) return;

  /* Safari-safe fetch: explicit CORS mode, no cache, 8-second timeout */
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 8000);

  fetch(API_URL, {
    method: 'GET',
    mode:   'cors',
    cache:  'no-store',
    signal: controller.signal
  })
    .then(res => {
      clearTimeout(timeoutId);
      /* Opaque responses (Safari cross-origin quirk) carry no data */
      if (!res.ok || res.type === 'opaque') throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const feed = (data.feed || []).filter(item => !item.reason); // skip reposts
      if (!feed.length) {
        grid.innerHTML = '<p class="bsky-loading">No posts yet - check back soon!</p>';
        return;
      }
      grid.innerHTML = feed.slice(0, DISPLAY).map(renderCard).join('');
    })
    .catch(() => {
      clearTimeout(timeoutId);
      grid.innerHTML =
        `<p class="bsky-error">Could not load posts. ` +
        `<a href="https://bsky.app/profile/${HANDLE}" target="_blank" rel="noopener">` +
        `Visit our Bluesky profile ↗</a></p>`;
    });
}

/* ── BIOMICS YouTube feed ───────────────────────────────────────
   Tries multiple CORS proxies in sequence to fetch the public
   YouTube RSS feed. Shows all videos oldest-first (episode order),
   capped at MAX. Falls back to hardcoded known videos only if every
   proxy fails.
   ──────────────────────────────────────────────────────────────── */
async function loadBiomicsVideos() {
  const CHANNEL_ID = 'UCfC8a-vm4VWLkw3OH3gR91w'; // @BIOMICSTwinning
  const RSS_URL    = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const MAX        = 2; // maximum cards to show

  /* Hardcoded fallback - only used if all proxies fail */
  const FALLBACK_VIDEOS = [
    { videoId: 'T5ZpgSiowY8', title: 'Getting to know BIOMICS members - Manuel Irimia',   date: 'May 2026'     },
    { videoId: 'iqlB74ldyos', title: 'Getting to know BIOMICS members - Pedro Beltrão',  date: 'October 2025' },
  ];

  const grid = document.getElementById('biomics-video-grid');
  if (!grid) return;

  function renderCards(videos) {
    if (!videos.length) return;
    /* Click-to-play: show a high-quality thumbnail and only load the
       iframe when the user clicks play. hqdefault.jpg = 480×360 (crisp).
       Mid-video frames are available at 1.jpg/2.jpg/3.jpg but are only
       120×90 px and look blurry when scaled up - not recommended. */
    grid.innerHTML = videos.map(v => `
      <div class="biomics-video-card">
        <div class="biomics-video-wrap biomics-video-thumb-wrap"
             data-videoid="${escHtml(v.videoId)}"
             role="button" tabindex="0"
             aria-label="Play ${escHtml(v.title)}">
          <img class="biomics-video-thumb"
               src="https://img.youtube.com/vi/${escHtml(v.videoId)}/hqdefault.jpg"
               alt="${escHtml(v.title)}"
               loading="lazy">
          <div class="biomics-video-play-btn" aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48" xmlns="http://www.w3.org/2000/svg">
              <rect width="68" height="48" rx="10" fill="rgba(0,0,0,.65)"/>
              <polygon points="27,13 27,35 51,24" fill="#fff"/>
            </svg>
          </div>
        </div>
        <div class="biomics-video-info">
          <span class="biomics-video-tag">BIOMICS Twinning</span>
          <div class="biomics-video-title">${escHtml(v.title)}</div>
          ${v.date ? `<span class="biomics-video-date">${escHtml(v.date)}</span>` : ''}
        </div>
      </div>`).join('');

    /* Attach click / keyboard handlers - swap thumbnail → autoplay iframe */
    grid.querySelectorAll('.biomics-video-thumb-wrap').forEach(wrap => {
      function activateVideo() {
        const videoId = wrap.dataset.videoid;
        const label   = wrap.getAttribute('aria-label') || 'BIOMICS video';
        wrap.innerHTML = `<iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
          title="${label}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>`;
      }
      wrap.addEventListener('click', activateVideo);
      wrap.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateVideo(); }
      });
    });
  }

  /* Parse XML text from YouTube RSS into video objects */
  function parseRssXml(xmlText) {
    const xml     = new DOMParser().parseFromString(xmlText, 'application/xml');
    const entries = Array.from(xml.querySelectorAll('entry'));
    if (!entries.length) return null;
    /* YouTube returns newest-first; take the first MAX (most recent) */
    const videos = entries.slice(0, MAX).map(entry => {
      const href    = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || '';
      const videoId = (href.match(/[?&]v=([^&]+)/) || [])[1] || '';
      if (!videoId) return null;
      const title     = entry.querySelector('title')?.textContent?.trim() || '';
      const published = entry.querySelector('published')?.textContent || '';
      const date      = published
        ? new Date(published).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
        : '';
      return { videoId, title, date };
    }).filter(Boolean);
    return videos.length ? videos : null;
  }

  /* Try each proxy in order; return parsed videos or null */
  async function tryProxy(proxyUrl, extractFn) {
    const ctrl = new AbortController();
    const t    = setTimeout(() => ctrl.abort(), 7000);
    try {
      const res = await fetch(proxyUrl, { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) return null;
      const body = await extractFn(res);
      return body ? parseRssXml(body) : null;
    } catch (_) {
      clearTimeout(t);
      return null;
    }
  }

  /* Proxy 1 - allorigins (returns JSON wrapper) */
  let videos = await tryProxy(
    `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`,
    async r => { const j = await r.json(); return j.contents || null; }
  );

  /* Proxy 2 - corsproxy.io (returns raw XML) */
  if (!videos) {
    videos = await tryProxy(
      `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`,
      async r => r.text()
    );
  }

  /* Proxy 3 - allorigins raw endpoint */
  if (!videos) {
    videos = await tryProxy(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
      async r => r.text()
    );
  }

  if (videos) {
    renderCards(videos);
  } else {
    console.warn('All BIOMICS video proxies failed - using hardcoded fallback');
    renderCards(FALLBACK_VIDEOS);
  }
}

/* ── BIOMICS News Feed ──────────────────────────────────────────
   Fetches the WordPress RSS from biomics.gimm.pt/news/feed/ via a
   CORS proxy. All parsing is done on the raw XML text (no
   namespace issues). Only wp-content/uploads images are accepted
   so we never show Gravatars or logos as article thumbnails.
   A "See all news →" card is always the last item.
   ──────────────────────────────────────────────────────────────── */
async function loadBiomicsNews() {
  const container = document.getElementById('biomics-news-items');
  if (!container) return;

  const RSS_URL   = 'https://biomics.gimm.pt/news/feed/';
  const NEWS_PAGE = 'https://biomics.gimm.pt/news/';
  const MAX_ITEMS = 7;

  /* ── helpers ─────────────────────────────────────────────────── */

  /* Extract a simple text tag value from raw XML: <tag>value</tag>
     Works reliably without namespace or DOMParser quirks. */
  function tagText(chunk, tag) {
    const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`, 'i');
    const m  = chunk.match(re);
    return m ? (m[1] || m[2] || '').trim() : '';
  }

  /* Only accept images that are real article photos (wp-content/uploads).
     This filters out Gravatars, plugin icons, logos, etc. */
  function extractImage(chunk) {
    // Patterns tried in order of reliability:
    const patterns = [
      // media:thumbnail or media:content with uploads URL
      /url="(https?:\/\/[^"]+\/wp-content\/uploads\/[^"]+\.(?:jpe?g|png|gif|webp)(?:\?[^"]*)?)"/i,
      // enclosure element pointing to an image
      /<enclosure[^>]+url="(https?:\/\/[^"]+\/wp-content\/uploads\/[^"]+)"[^>]+type="image[^"]*"/i,
      // <img src> inside post content, uploads only
      /src=["'](https?:\/\/[^"']+\/wp-content\/uploads\/[^"']+\.(?:jpe?g|png|gif|webp)[^"']*)["']/i,
    ];
    for (const re of patterns) {
      const m = chunk.match(re);
      if (m) return m[1];
    }
    return '';
  }

  /* ── parser ──────────────────────────────────────────────────── */
  function parseBiomicsRss(xmlText) {
    /* Split on raw <item>…</item> blocks - avoids all namespace issues */
    const chunks = [];
    let pos = 0;
    while (pos < xmlText.length) {
      const s = xmlText.indexOf('<item', pos);
      if (s === -1) break;
      const e = xmlText.indexOf('</item>', s);
      chunks.push(e > -1 ? xmlText.slice(s, e + 7) : xmlText.slice(s));
      pos = e > -1 ? e + 7 : xmlText.length;
    }
    if (!chunks.length) return null;

    return chunks.slice(0, MAX_ITEMS).map(chunk => {
      const title = tagText(chunk, 'title');
      if (!title) return null;

      /* Link: prefer <link> tag text; fall back to <guid> permalink */
      const link = tagText(chunk, 'link') || tagText(chunk, 'guid') || NEWS_PAGE;

      /* Sanity-check: must be an absolute URL pointing to biomics.gimm.pt */
      const safeLink = /^https?:\/\//.test(link) ? link : NEWS_PAGE;

      const rawDate = tagText(chunk, 'pubDate');
      const date    = rawDate
        ? new Date(rawDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

      const image = extractImage(chunk);
      return { title, link: safeLink, date, image };
    }).filter(Boolean);
  }

  /* ── proxy fetch ─────────────────────────────────────────────── */
  async function tryProxy(proxyUrl, extractFn) {
    const ctrl = new AbortController();
    const t    = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(proxyUrl, { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) return null;
      const body = await extractFn(res);
      return body ? parseBiomicsRss(body) : null;
    } catch (_) { clearTimeout(t); return null; }
  }

  /* ── "See all news" card ─────────────────────────────────────── */
  const seeMoreCard = `
    <a class="biomics-news-card biomics-nc-seemore"
       href="${NEWS_PAGE}" target="_blank" rel="noopener"
       aria-label="See all BIOMICS news">
      <div class="biomics-nc-img-wrap biomics-nc-placeholder" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)"
             stroke-width="1.5" stroke-linecap="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
      <div class="biomics-nc-body biomics-nc-seemore-body">
        <span class="biomics-nc-title">See all BIOMICS news</span>
        <span class="biomics-nc-read">biomics.gimm.pt/news/ &#8599;</span>
      </div>
    </a>`;

  /* ── card renderer ───────────────────────────────────────────── */
  function renderBiomicsCards(newsItems) {
    const cards = newsItems.map(item => {
      const imgHtml = item.image
        ? `<img class="biomics-nc-img" src="${escHtml(item.image)}" alt="" loading="lazy" />`
        : `<div class="biomics-nc-placeholder" aria-hidden="true">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(255,255,255,.3)" stroke-width="1.5" stroke-linecap="round">
               <rect x="3" y="3" width="18" height="18" rx="3"/>
               <circle cx="8.5" cy="8.5" r="1.5"/>
               <path d="m21 15-5-5L5 21"/>
             </svg>
           </div>`;
      return `
        <a class="biomics-news-card" href="${escHtml(item.link)}" target="_blank" rel="noopener"
           aria-label="${escHtml(item.title)}">
          <div class="biomics-nc-img-wrap">${imgHtml}</div>
          <div class="biomics-nc-body">
            <span class="biomics-nc-title">${escHtml(item.title)}</span>
            ${item.date ? `<span class="biomics-nc-date">${escHtml(item.date)}</span>` : ''}
            <span class="biomics-nc-read">Read more →</span>
          </div>
        </a>`;
    });
    container.innerHTML = cards.join('') + seeMoreCard;

    /* Hide broken images gracefully (show placeholder instead) */
    container.querySelectorAll('.biomics-nc-img').forEach(img => {
      img.addEventListener('error', () => {
        const wrap = img.closest('.biomics-nc-img-wrap');
        if (wrap) wrap.innerHTML = `<div class="biomics-nc-placeholder" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,.3)" stroke-width="1.5" stroke-linecap="round">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="m21 15-5-5L5 21"/>
          </svg></div>`;
      });
    });
  }

  /* ── fetch with proxy fallback chain ─────────────────────────── */
  let items = await tryProxy(
    `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`,
    async r => { const j = await r.json(); return j.contents || null; }
  );
  if (!items) {
    items = await tryProxy(
      `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`,
      async r => r.text()
    );
  }
  if (!items) {
    items = await tryProxy(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
      async r => r.text()
    );
  }

  container.innerHTML = items?.length ? '' : '';  // clear loading text
  if (!items || !items.length) {
    container.innerHTML = seeMoreCard;
    return;
  }

  renderBiomicsCards(items);
}

/* ── Lab News ───────────────────────────────────────────────────
   Reads the LAB_NEWS array from js/news-data.js and renders cards
   into #lab-news-grid. Clicking a card opens a modal.
   Pass max to cap the number of cards shown (index page uses 4).
   ──────────────────────────────────────────────────────────────── */
function loadLabNews(max) {
  const grid = document.getElementById('lab-news-grid');
  if (!grid) return;

  const allItems   = (typeof LAB_NEWS !== 'undefined') ? LAB_NEWS : [];
  if (!allItems.length) { grid.style.display = 'none'; return; }

  const items      = max ? allItems.slice(0, max) : allItems;
  const hasMore    = max && allItems.length > max;

  grid.innerHTML = items.map((item, i) => {
    const imgHtml = item.image
      ? `<div class="lab-news-card-img">
           <img src="${escHtml(item.image)}" alt="${escHtml(item.imageAlt || '')}" loading="lazy" />
         </div>`
      : '';
    return `
      <article class="lab-news-card" data-news-index="${i}" tabindex="0" role="button"
               aria-label="Read more: ${escHtml(item.title)}">
        ${imgHtml}
        <div class="lab-news-card-body">
          <span class="lab-news-date">${escHtml(item.date)}</span>
          <h3 class="lab-news-card-title">${escHtml(item.title)}</h3>
          <p class="lab-news-card-summary">${escHtml(item.summary)}</p>
          <span class="lab-news-read-more">Read more ↗</span>
        </div>
      </article>`;
  }).join('');

  /* "See all news" button when capped */
  if (hasMore) {
    const wrap = grid.closest('.lab-news-wrap') || grid.parentElement;
    if (wrap && !wrap.querySelector('.lab-news-see-all')) {
      const btn = document.createElement('div');
      btn.className = 'lab-news-see-all';
      btn.innerHTML = `<a href="news.html" class="lab-news-see-all-btn">
        See all news (${allItems.length}) ↗
      </a>`;
      grid.after(btn);
    }
  }

  /* Wire up modal */
  const modal      = document.getElementById('lab-news-modal');
  const backdrop   = modal?.querySelector('.lab-news-modal-backdrop');
  const closeBtn   = modal?.querySelector('.lab-news-modal-close');
  const modalDate  = document.getElementById('lab-news-modal-date');
  const modalTitle = document.getElementById('lab-news-modal-title');
  const modalImg   = document.getElementById('lab-news-modal-img-wrap');
  const modalBody  = document.getElementById('lab-news-modal-body');

  function openModal(index) {
    const item = items[index];
    if (!item || !modal) return;
    modalDate.textContent  = item.date  || '';
    modalTitle.textContent = item.title || '';
    /* Gallery: use images[] array if present, else fall back to single image */
    const imgs = item.images && item.images.length
      ? item.images
      : (item.image ? [{ src: item.image, alt: item.imageAlt || '' }] : []);
    if (imgs.length > 1) {
      modalImg.innerHTML = `<div class="news-modal-gallery">${
        imgs.map(im => `<img src="${escHtml(im.src)}" alt="${escHtml(im.alt || '')}" loading="lazy" />`).join('')
      }</div>`;
    } else if (imgs.length === 1) {
      modalImg.innerHTML = `<img src="${escHtml(imgs[0].src)}" alt="${escHtml(imgs[0].alt || '')}" />`;
    } else {
      modalImg.innerHTML = '';
    }
    modalBody.innerHTML = item.content || `<p>${escHtml(item.summary)}</p>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
    /* wire lightbox on newly-rendered images */
    setTimeout(() => {
      modal.querySelectorAll('.lab-news-modal-img-wrap img, .news-modal-gallery img').forEach(img => {
        img.addEventListener('click', () => { if (window._openLightbox) window._openLightbox(img.src, img.alt); });
      });
    }, 0);
  }

  function closeModal() {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Photo lightbox ─────────────────────────────────────── */
  if (!document.getElementById('photo-lightbox')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="photo-lightbox" class="photo-lightbox" role="dialog" aria-modal="true" aria-label="Full-size photo">
        <button class="photo-lightbox-close" aria-label="Close">&times;</button>
        <img id="photo-lightbox-img" src="" alt="" />
      </div>`);
    const lb    = document.getElementById('photo-lightbox');
    const lbImg = document.getElementById('photo-lightbox-img');
    const lbClose = lb.querySelector('.photo-lightbox-close');
    function openLightbox(src, alt) {
      lbImg.src = src; lbImg.alt = alt || '';
      lb.classList.add('open');
    }
    function closeLightbox() { lb.classList.remove('open'); }
    lbClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
    lb.addEventListener('click', closeLightbox);
    lbImg.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    /* expose so openModal can wire new images */
    window._openLightbox = openLightbox;
  }

  grid.querySelectorAll('.lab-news-card').forEach(card => {
    card.addEventListener('click',   () => openModal(+card.dataset.newsIndex));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(+card.dataset.newsIndex);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ── Alumni group-photo slideshow ──────────────────────────────────
   Called after sections are injected. Builds the slides + dots from
   the SLIDES array and runs an auto-advancing crossfade loop.
   To add a new group photo: add an entry to SLIDES below.
   ──────────────────────────────────────────────────────────────── */
function initAlumniSlideshow() {
  const track   = document.getElementById('alumni-slides-track');
  const caption = document.getElementById('alumni-slideshow-caption');
  const dotsEl  = document.getElementById('alumni-slide-dots');
  const prevBtn = document.getElementById('alumni-slide-prev');
  const nextBtn = document.getElementById('alumni-slide-next');
  if (!track) return;

  const SLIDES = [
    { src: 'assets/photos/group_old/Sep2015_1.jpg',   label: 'September 2015' },
    { src: 'assets/photos/group_old/Sep2015_2.jpg',   label: 'September 2015' },
    { src: 'assets/photos/group_old/Oct2015.jpg',     label: 'October 2015'   },
    { src: 'assets/photos/group_old/Xmas2015.jpg',    label: 'December 2015'  },
    { src: 'assets/photos/group_old/Jul2016.jpg',     label: 'July 2016'      },
    { src: 'assets/photos/group_old/Oct2016.jpg',     label: 'October 2016'   },
    { src: 'assets/photos/group_old/Oct2016b.jpg',    label: 'October 2016'   },
    { src: 'assets/photos/group_old/Apr2017.jpg',     label: 'April 2017'     },
    { src: 'assets/photos/group_old/Nov2017.jpg',     label: 'November 2017'  },
    { src: 'assets/photos/group_old/Mar2018.jpg',     label: 'March 2018'     },
    { src: 'assets/photos/group_old/Jul2018.jpg',     label: 'July 2018'      },
    { src: 'assets/photos/group_old/Dec2018.jpg',     label: 'December 2018'  },
    { src: 'assets/photos/group_old/Jun2019.jpg',     label: 'June 2019'      },
    { src: 'assets/photos/group_old/Dec2019.jpg',     label: 'December 2019'  },
    { src: 'assets/photos/group_old/Feb2020.jpg',     label: 'February 2020'  },
    { src: 'assets/photos/group_old/Jun2020.jpg',     label: 'June 2020'      },
    { src: 'assets/photos/group_old/Dec2021.jpg',     label: 'December 2021'  },
    { src: 'assets/photos/group_old/June2022.jpg',    label: 'June 2022'      },
    { src: 'assets/photos/group_old/January2023.jpg', label: 'January 2023'   },
    { src: 'assets/photos/group_old/March2023.jpg',   label: 'March 2023'     },
    { src: 'assets/photos/group_old/Feb2024.jpg',     label: 'February 2024'  },
    { src: 'assets/photos/group_old/Mar2024.jpg',     label: 'March 2024'     },
    { src: 'assets/photos/group_old/Sep2024.jpg',     label: 'September 2024' },
    { src: 'assets/photos/group_old/Dec2024.jpg',     label: 'December 2024'  },
  ];

  const INTERVAL = 4500; // ms between auto-advances
  let current = 0;
  let timer;

  /* Build DOM */
  const imgs = SLIDES.map((s, i) => {
    const img = document.createElement('img');
    img.className = 'alumni-slide' + (i === 0 ? ' active' : '');
    img.src  = s.src;
    img.alt  = 'Lab group photo - ' + s.label;
    img.loading = i === 0 ? 'eager' : 'lazy';
    track.appendChild(img);
    return img;
  });

  const dots = SLIDES.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'alumni-slide-dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dotsEl.appendChild(btn);
    return btn;
  });

  if (caption) caption.textContent = SLIDES[0].label;

  function goTo(n) {
    imgs[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + SLIDES.length) % SLIDES.length;
    imgs[current].classList.add('active');
    dots[current].classList.add('active');
    if (caption) caption.textContent = SLIDES[current].label;
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  /* Controls */
  prevBtn?.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); startTimer(); });
  dots.forEach((btn, i) => btn.addEventListener('click', () => { goTo(i); startTimer(); }));

  /* Pause on hover */
  const wrap = document.getElementById('alumni-slideshow');
  wrap?.addEventListener('mouseenter', () => clearInterval(timer));
  wrap?.addEventListener('mouseleave', startTimer);

  startTimer();
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

/* ── Alumni timeline hover interaction ──────────────────────────── */
function initAlumniTimeline() {
  document.querySelectorAll('.alumni-year-group').forEach(group => {
    const entries = [...group.querySelectorAll('.alumni-entry')];
    const photos  = [...group.querySelectorAll('.alumni-year-photo')];
    if (!entries.length || !photos.length) return;

    entries.forEach((entry, i) => {
      entry.addEventListener('mouseenter', () => {
        group.classList.add('is-hovering');
        entries.forEach((e, j) => e.classList.toggle('is-active', j === i));
        photos.forEach((p, j)  => p.classList.toggle('is-active',  j === i));
      });
      entry.addEventListener('mouseleave', () => {
        group.classList.remove('is-hovering');
        entries.forEach(e => e.classList.remove('is-active'));
        photos.forEach(p  => p.classList.remove('is-active'));
      });
    });
  });
}

/* ── Hero typewriter animation ──────────────────────────────────
   Types "Decoding RNA to understand disease" character by character,
   with variable speed, occasional typos that self-correct, and a
   permanently blinking cursor once typing finishes.
   Ghost layer (opacity 0.18) holds the full text so layout never shifts.
   ──────────────────────────────────────────────────────────────── */
function initHeroTypewriter() {
  const typed = document.querySelector('.hero-title-typed');
  if (!typed) return;

  const segments = [
    { text: 'Decoding',  teal: false },
    { text: '\n',            teal: false },
    { text: 'transcriptomes',  teal: false },
    { text: '\n',            teal: false },
    { text: 'to understand', teal: false },
    { text: '\n',            teal: false },
    { text: 'disease',       teal: true  },
  ];

  // Flatten to individual char descriptors
  const chars = [];
  for (const seg of segments) {
    for (const ch of seg.text) chars.push({ ch, teal: seg.teal });
  }

  /* ── Typo helper ───────────────────────────────────────────── */
  // Plausible adjacent-key substitutions for characters in the text
  const ADJACENT = {
    d:'sf', e:'wr', c:'xv', o:'ip', i:'uo', n:'bm', g:'fh',
    r:'et', a:'sq', s:'ad', u:'yi', t:'ry', h:'gj', l:'ko',
    R:'ET', N:'BM', A:'SQ',
  };
  function wrongChar(ch) {
    const pool = ADJACENT[ch] || ADJACENT[ch.toLowerCase()];
    if (pool) {
      const w = pool[Math.floor(Math.random() * pool.length)];
      return ch === ch.toUpperCase() ? w.toUpperCase() : w;
    }
    // fallback: shift one letter
    const code = ch.charCodeAt(0);
    return String.fromCharCode(code + (code < 122 ? 1 : -1));
  }

  /* ── Choose 2 typo positions ───────────────────────────────── */
  // Avoid spaces, newlines, first 2 and last 2 characters
  const candidates = chars
    .map((c, i) => i)
    .filter(i => chars[i].ch !== '\n' && chars[i].ch !== ' ' && i > 2 && i < chars.length - 2);

  const typoAt = new Set();
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  for (const idx of shuffled) {
    if ([...typoAt].every(t => Math.abs(t - idx) >= 5)) {
      typoAt.add(idx);
      if (typoAt.size === 2) break;
    }
  }

  /* ── Build action sequence ─────────────────────────────────── */
  // { type:'type', ch, teal } | { type:'delete' } | { type:'pause', ms }
  const actions = [];
  for (let i = 0; i < chars.length; i++) {
    const { ch, teal } = chars[i];
    if (typoAt.has(i)) {
      actions.push({ type: 'type',  ch: wrongChar(ch), teal });
      actions.push({ type: 'pause', ms: 160 + Math.random() * 140 }); // brief "wait, that's wrong"
      actions.push({ type: 'delete' });
      actions.push({ type: 'pause', ms: 60  + Math.random() * 60  }); // brief re-think
    }
    actions.push({ type: 'type', ch, teal });
  }

  /* ── Render helper ─────────────────────────────────────────── */
  let displayed = []; // { ch, teal }[]

  function render() {
    let html = '', inTeal = false;
    for (const { ch, teal } of displayed) {
      if (ch === '\n') {
        if (inTeal) { html += '</span>'; inTeal = false; }
        html += '<br>';
        continue;
      }
      if ( teal && !inTeal) { html += '<span>'; inTeal = true;  }
      if (!teal &&  inTeal) { html += '</span>'; inTeal = false; }
      html += ch === '&' ? '&amp;' : ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch;
    }
    if (inTeal) html += '</span>';
    typed.innerHTML = html;
  }

  /* ── Variable timing ───────────────────────────────────────── */
  function nextDelay(action) {
    if (action.type === 'pause')  return action.ms;
    if (action.type === 'delete') return 65 + Math.random() * 55; // 65-120ms backspace
    // Typing: slower after a break, faster mid-word
    const prev = displayed[displayed.length - 1];
    const afterBreak = !prev || prev.ch === ' ' || prev.ch === '\n';
    return afterBreak
      ? 100 + Math.random() * 90   // 100-190ms - slight hesitation at word start
      : 30  + Math.random() * 65;  // 30-95ms   - fluent mid-word
  }

  /* ── Run ───────────────────────────────────────────────────── */
  typed.classList.add('typing'); // cursor blinks from the start
  let idx = 0;

  function tick() {
    if (idx >= actions.length) return; // typing done; cursor keeps blinking permanently

    const action = actions[idx++];
    if      (action.type === 'delete') displayed.pop();
    else if (action.type === 'type')   displayed.push({ ch: action.ch, teal: action.teal });
    // 'pause' actions leave displayed unchanged

    if (action.type !== 'pause') render();
    setTimeout(tick, nextDelay(action));
  }

  setTimeout(tick, 500); // short initial pause before first keystroke
}

/* ── Bootstrap ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  updateYear();
  initNav();

  if (checkProtocol()) return; // on file://, stop here - show banner only

  await loadSections();              // fetch + inject all sections into placeholders
  await loadSelectedPublications();  // fetch nuno.html → populate #pub-selected-container
  initHeroTypewriter();              // typewriter effect on hero title
  initAnimations();                  // observe .fade-up elements now that sections are in the DOM
  initSmoothScroll();                // wire anchor links in freshly-injected sections
  initSoftwareFilter();              // wire up tool filter buttons now that software.html is injected
  initResearchStripes();             // set gradient stripes on multi-theme cards
  initResearchFilter();              // wire up research theme filter + pub-panel accordions
  initResearchKeywordFilter();       // wire up keyword filter chips
  loadLabNews(4);                    // #lab-news-grid - 4 most recent; full list on news.html
  loadBlueskyFeed();                 // #bsky-feed-grid is now available in the DOM
  loadBiomicsVideos();               // #biomics-video-grid - auto-fetched from YouTube RSS
  loadBiomicsNews();                 // #biomics-news-items - auto-fetched from biomics.gimm.pt RSS
  initAlumniSlideshow();             // #alumni-slideshow - group photo crossfade carousel
  initAlumniTimeline();              // hover highlight: dim other photos + names

  /* Scroll to URL hash after sections load - sections are injected
     asynchronously, so the browser's native hash scroll fires before
     the target element exists. Re-apply it here after injection. */
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
