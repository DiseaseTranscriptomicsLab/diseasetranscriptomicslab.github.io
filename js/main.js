/* ================================================================
   NMorais Lab — main.js
   Navigation behaviour + scroll animations
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Auto-update copyright year ────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile nav toggle ─────────────────────────────────────────
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const drawer    = document.getElementById('nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }

  // ── Nav shadow on scroll ──────────────────────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Scroll-triggered fade-up animations ──────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── Smooth scroll for anchor links ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
