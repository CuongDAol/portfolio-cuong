// ═══════════════════════════════════════════════════════
// animations.js — Dashboard Concept
// Bùi Mạnh Cường | Fresher Data Analyst Portfolio
// Features: Chart.js, Scroll reveal, Typing, Counter,
//           Progress bars, Ripple, Scroll progress, Modal
//           Floating Data Objects (Canvas)
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

/* ── 1. SCROLL PROGRESS BAR ─────────────────────────── */
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
}, { passive: true });


/* ── 2. YEAR ─────────────────────────────────────────── */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();


/* ── 3. TYPING ANIMATION ─────────────────────────────── */
const roleEl = document.getElementById('typed-role');
const cursor = document.querySelector('.typing-cursor');
const style = document.createElement('style');
style.textContent = `.typing-cursor{color:#38bdf8;animation:cb .7s infinite;}@keyframes cb{0%,100%{opacity:1}50%{opacity:0}}`;
document.head.appendChild(style);

if (roleEl) {
  const phrases = [
    'Intern / Fresher Data Analyst',
    'Python · SQL · Power BI',
    'Biến dữ liệu thành insight',
    'Dashboard Storytelling'
  ];
  let pi = 0, ci = 0, del = false;
  function type() {
    const p = phrases[pi];
    roleEl.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
    if (!del && ci === p.length) { del = true; setTimeout(type, 2000); return; }
    if (del && ci === 0)         { del = false; pi = (pi+1)%phrases.length; }
    setTimeout(type, del ? 38 : 72);
  }
  setTimeout(type, 900);
}


/* ── 4. SCROLL REVEAL ────────────────────────────────── */
document.querySelectorAll('.kpi-card, .project-card, .cert-card, .timeline-item, .info-tile, .about-text-card, .skill-panel, .chart-panel, .contact-card').forEach((el, i) => {
  if (!el.dataset.reveal) el.dataset.reveal = '';
  el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


/* ── 5. COUNTER ANIMATION ────────────────────────────── */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = parseInt(el.dataset.counter);
    let cur = 0;
    const duration = 1200;
    const steps = 60;
    const inc = to / steps;
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, to);
      el.textContent = to > 999 ? Math.floor(cur).toLocaleString('vi') : Math.floor(cur);
      if (cur >= to) clearInterval(timer);
    }, duration / steps);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));


/* ── 6. SKILL PROGRESS BARS ──────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.skill-bar-fill[data-width]').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 150);
    });
    barObs.unobserve(e.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-panel').forEach(p => barObs.observe(p));


/* ── 7. HERO CHART (Chart.js) ────────────────────────── */
const heroCtx = document.getElementById('heroChart');
if (heroCtx && typeof Chart !== 'undefined') {
  new Chart(heroCtx, {
    type: 'radar',
    data: {
      labels: ['Python', 'SQL', 'Power BI', 'Excel', 'EDA', 'Scraping'],
      datasets: [{
        label: 'Kỹ năng',
        data: [72, 70, 68, 80, 80, 60],
        backgroundColor: 'rgba(56,189,248,0.12)',
        borderColor: '#38bdf8',
        borderWidth: 2,
        pointBackgroundColor: '#38bdf8',
        pointBorderColor: '#070d1a',
        pointBorderWidth: 2,
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1400, easing: 'easeInOutQuart' },
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          grid: { color: 'rgba(56,189,248,0.1)' },
          angleLines: { color: 'rgba(56,189,248,0.1)' },
          ticks: { display: false, stepSize: 25 },
          pointLabels: {
            color: '#94a3b8', font: { size: 12, weight: '700' }
          }
        }
      }
    }
  });
}


/* ── 8. EXPERIENCE CHART ──────────────────────────────── */
const expCtx = document.getElementById('expChart');
if (expCtx && typeof Chart !== 'undefined') {
  new Chart(expCtx, {
    type: 'bar',
    data: {
      labels: ['Freelance DA', 'IGA Vietnam', 'COMEECO', 'Học thuật'],
      datasets: [{
        label: 'Thời gian (tháng)',
        data: [24, 3, 2, 48],
        backgroundColor: [
          'rgba(56,189,248,0.7)',
          'rgba(129,140,248,0.7)',
          'rgba(16,185,129,0.7)',
          'rgba(245,158,11,0.7)',
        ],
        borderColor: ['#38bdf8','#818cf8','#10b981','#f59e0b'],
        borderWidth: 1.5,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1200, easing: 'easeInOutQuart' },
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 11 } } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#64748b', font: { size: 11 } },
          title: { display: true, text: 'Tháng', color: '#64748b', font: { size: 11 } }
        }
      }
    }
  });
}


/* ── 9. COPY EMAIL TOAST ─────────────────────────────── */
const toast = document.getElementById('copyToast');
document.addEventListener('click', e => {
  const mail = e.target.closest('a[href^="mailto:"]');
  if (!mail) return;
  e.preventDefault();
  const email = mail.href.replace('mailto:', '');
  navigator.clipboard.writeText(email).then(() => {
    if (!toast) return;
    toast.textContent = `✓ Đã copy ${email}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
});


/* ── 10. RIPPLE ON BUTTONS ───────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const r = btn.getBoundingClientRect();
  const size = Math.max(r.width, r.height);
  const wave = document.createElement('span');
  Object.assign(wave.style, {
    position: 'absolute', borderRadius: '50%',
    width: size + 'px', height: size + 'px',
    left: (e.clientX - r.left - size/2) + 'px',
    top: (e.clientY - r.top - size/2) + 'px',
    background: 'rgba(255,255,255,0.22)',
    transform: 'scale(0)', animation: 'ripple .5s linear',
    pointerEvents: 'none'
  });
  const s = document.createElement('style');
  s.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0}}';
  document.head.appendChild(s);
  btn.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove());
});


/* ── 11. MOBILE MENU ─────────────────────────────────── */
const menuBtn   = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');
menuBtn?.addEventListener('click', () => {
  const open = mobilePanel.style.display === 'block';
  mobilePanel.style.display = open ? 'none' : 'block';
  menuBtn.setAttribute('aria-expanded', String(!open));
});
mobilePanel?.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    mobilePanel.style.display = 'none';
    menuBtn?.setAttribute('aria-expanded', 'false');
  }
});


/* ── 12. ACTIVE NAV HIGHLIGHT ────────────────────────── */
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('nav.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { threshold: 0.35 }).observe && secs.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.35 }).observe(s)
);


/* ── 13. PROJECT FILTER & SEARCH ──────────────────────── */
const cards       = Array.from(document.querySelectorAll('.project-card'));
const filterBtns  = Array.from(document.querySelectorAll('.filter-btn'));
const searchInput = document.getElementById('projectSearch');
const noResults   = document.getElementById('noResults');
let activeFilter  = 'all';

function applyFilter() {
  const q = (searchInput?.value || '').toLowerCase().trim();
  let count = 0;
  cards.forEach(card => {
    const tags = (card.dataset.tags || '').split(' ');
    const text = card.textContent.toLowerCase();
    const match = (activeFilter === 'all' || tags.includes(activeFilter)) && (!q || text.includes(q));
    card.style.display = match ? 'flex' : 'none';
    if (match) count++;
  });
  if (noResults) noResults.style.display = count ? 'none' : 'block';
}

filterBtns.forEach(btn => btn.addEventListener('click', () => {
  activeFilter = btn.dataset.filter;
  filterBtns.forEach(b => b.classList.toggle('active', b === btn));
  applyFilter();
}));
searchInput?.addEventListener('input', applyFilter);


/* ── 14. MODAL (Quick view) ──────────────────────────── */
const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalCopy  = document.getElementById('modalCopy');
const modalLink  = document.getElementById('modalLink');
let lastFocus    = null;

function openModal(card) {
  lastFocus = document.activeElement;
  document.getElementById('modalTitle').textContent   = card.dataset.title || '';
  document.getElementById('modalOne').textContent     = card.dataset.one || '';
  document.getElementById('modalChallenge').textContent = card.dataset.challenge || '';
  document.getElementById('modalApproach').textContent  = card.dataset.approach || '';
  document.getElementById('modalImpact').textContent    = card.dataset.impact || '';
  document.getElementById('modalStack').textContent     = card.dataset.stack || '';
  if (modalLink) modalLink.href = card.dataset.link || '#';
  modal.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
  modalClose?.focus();
}

function closeModal() {
  modal.removeAttribute('open');
  document.body.style.overflow = '';
  lastFocus?.focus?.();
}

document.querySelectorAll('.js-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    if (card) openModal(card);
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.hasAttribute('open')) closeModal(); });

modalCopy?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(modalLink?.href || '');
    modalCopy.textContent = '✓ Đã copy';
    setTimeout(() => { modalCopy.textContent = 'Copy link'; }, 1200);
  } catch {}
});


/* ── 15. BACK TO TOP ─────────────────────────────────── */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop?.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ── 16. 3D TILT ON PROJECT CARDS ───────────────────── */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(650px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}


/* ── 17. CURSOR GLOW (desktop) ───────────────────────── */
if (!window.matchMedia('(pointer: coarse)').matches) {
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', width: '320px', height: '320px',
    borderRadius: '50%', pointerEvents: 'none', zIndex: '0',
    background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)',
    willChange: 'left,top', transition: 'left .12s ease, top .12s ease',
  });
  document.body.appendChild(glow);
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}


/* ── 18. FLOATING DATA OBJECTS (Canvas) ───────────────── */
(function() {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    zIndex: '0', pointerEvents: 'none',
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const SYMBOLS = ['{ }', 'SQL', '∑', '▣', '∅', '→', 'KPI', '%', '≈', 'Δ', '[]', 'df', '∫'];
  const COUNT   = window.innerWidth < 768 ? 14 : 26;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  const items = Array.from({ length: COUNT }, () => ({
    x:    rnd(0, window.innerWidth),
    y:    rnd(0, window.innerHeight),
    vx:   rnd(-0.22, 0.22),
    vy:   rnd(-0.32, -0.08),
    size: rnd(10, 18),
    alpha:rnd(0.04, 0.13),
    sym:  SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    hue:  Math.random() < 0.65 ? 198 : 240,   // cyan vs indigo
  }));

  // Bars objects
  const BARS = Array.from({ length: window.innerWidth < 768 ? 4 : 7 }, (_, i) => ({
    x: rnd(40, window.innerWidth - 40),
    y: rnd(80, window.innerHeight - 80),
    w: rnd(28, 52),
    h: rnd(18, 50),
    vy: rnd(-0.12, 0.12),
    vx: rnd(-0.08, 0.08),
    alpha: rnd(0.04, 0.09),
    hue: Math.random() < 0.5 ? 198 : 265,
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    // Draw floating bars (mini chart)
    BARS.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.x < -60) b.x = canvas.width + 20;
      if (b.x > canvas.width + 60) b.x = -20;
      if (b.y < -60) b.y = canvas.height + 20;
      if (b.y > canvas.height + 60) b.y = -20;

      const pulse = 0.8 + 0.2 * Math.sin(frame * 0.018 + b.x);
      ctx.save();
      ctx.globalAlpha = b.alpha * pulse;
      ctx.strokeStyle = `hsl(${b.hue}, 80%, 65%)`;
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, b.y, b.w, b.h);
      ctx.fillStyle = `hsl(${b.hue}, 80%, 65%)`;
      ctx.globalAlpha = b.alpha * 0.35 * pulse;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.restore();
    });

    // Draw floating text symbols
    items.forEach(it => {
      it.x += it.vx;
      it.y += it.vy;
      if (it.y < -30) { it.y = canvas.height + 10; it.x = rnd(0, canvas.width); }
      if (it.x < -40) it.x = canvas.width + 10;
      if (it.x > canvas.width + 40) it.x = -10;

      const pulse = 0.75 + 0.25 * Math.sin(frame * 0.02 + it.x * 0.01);
      ctx.save();
      ctx.globalAlpha = it.alpha * pulse;
      ctx.font = `600 ${it.size}px 'Inter', monospace`;
      ctx.fillStyle = `hsl(${it.hue}, 80%, 70%)`;
      ctx.fillText(it.sym, it.x, it.y);
      ctx.restore();
    });

    // Draw connecting lines between nearby items
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const dx = items[i].x - items[j].x;
        const dy = items[i].y - items[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.save();
          ctx.globalAlpha = (1 - dist/130) * 0.045;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(items[i].x, items[i].y);
          ctx.lineTo(items[j].x, items[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // Pause on hidden tab
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) requestAnimationFrame(draw);
  });

  requestAnimationFrame(draw);
})();

}); // end DOMContentLoaded
