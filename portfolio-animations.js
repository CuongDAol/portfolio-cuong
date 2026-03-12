// ============================================================
// portfolio-animations.js v2.0 – Bùi Mạnh Cường Portfolio
// Thêm: Available badge pulse, Copy email, Skills chart hint,
//       GitHub stats, Enhanced timeline, Cert badges
// ============================================================

/* ── 1. SCROLL PROGRESS BAR ─────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0', height: '3px',
    width: '0%', zIndex: '9999', pointerEvents: 'none',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)',
    transition: 'width 0.1s linear',
    boxShadow: '0 0 8px rgba(56,189,248,0.6)'
  });
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / maxScroll * 100) + '%';
  }, { passive: true });
})();

/* ── 2. PARTICLES CANVAS BACKGROUND ─────────────────────── */
(function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '-1', pointerEvents: 'none', opacity: '0.45'
  });
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = Math.min(60, Math.floor(window.innerWidth / 22));
  const COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#67e8f9'];

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.5,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── 3. TYPING ANIMATION (Hero Title) ───────────────────── */
(function initTyping() {
  let el = document.getElementById('typed-text');
  if (!el) {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    heroTitle.innerHTML = '<span id="typed-text"></span><span class="typing-cursor">|</span>';
    el = document.getElementById('typed-text');

    const style = document.createElement('style');
    style.textContent = `
      .typing-cursor {
        color: #38bdf8;
        animation: cursorBlink 0.7s infinite;
        font-weight: 300;
        margin-left: 2px;
      }
      @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
    `;
    document.head.appendChild(style);
  }

  const phrases = [
    'Data Analyst · Insight & Tăng trưởng',
    'Python · SQL · Power BI',
    'Biến dữ liệu thành quyết định',
    'Dashboard Storytelling'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 38 : 75);
  }
  setTimeout(type, 800);
})();

/* ── 4. SCROLL REVEAL ───────────────────────────────────── */
(function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    [data-reveal] {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1),
                  transform 0.65s cubic-bezier(0.4,0,0.2,1);
    }
    [data-reveal].revealed {
      opacity: 1;
      transform: translateY(0);
    }
    [data-reveal="left"] { transform: translateX(-32px); }
    [data-reveal="right"] { transform: translateX(32px); }
    [data-reveal="scale"] { transform: scale(0.92); }
    [data-reveal="left"].revealed,
    [data-reveal="right"].revealed,
    [data-reveal="scale"].revealed { transform: none; }
  `;
  document.head.appendChild(style);

  const targets = [
    { sel: '.about-card',    attr: 'up' },
    { sel: '.skill-box',     attr: 'up' },
    { sel: '.project-card',  attr: 'up' },
    { sel: '.timeline-item', attr: 'left' },
    { sel: '.contact-card',  attr: 'scale' },
    { sel: '.profile-card',  attr: 'right' },
    { sel: '.quick-facts .fact', attr: 'up' },
  ];
  targets.forEach(({ sel, attr }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.dataset.reveal = attr;
      el.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();

/* ── 5. TILT CARD (Project Cards 3D hover) ───────────────── */
(function initTilt() {
  const style = document.createElement('style');
  style.textContent = `
    .project-card { transform-style: preserve-3d; will-change: transform; }
    .project-card .tilt-shine {
      position: absolute; inset: 0; border-radius: inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%);
      pointer-events: none; opacity: 0; transition: opacity 0.3s;
    }
    .project-card:hover .tilt-shine { opacity: 1; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.project-card').forEach(card => {
    const shine = document.createElement('div');
    shine.className = 'tilt-shine';
    card.appendChild(shine);

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(255,255,255,0.10), transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── 6. CURSOR GLOW ──────────────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  Object.assign(glow.style, {
    position: 'fixed', width: '380px', height: '380px',
    borderRadius: '50%', pointerEvents: 'none', zIndex: '0',
    background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)',
    transform: 'translate(-50%,-50%)',
    transition: 'left 0.12s ease, top 0.12s ease',
    willChange: 'left, top'
  });
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
})();

/* ── 7. RIPPLE EFFECT (Buttons) ──────────────────────────── */
(function initRipple() {
  const style = document.createElement('style');
  style.textContent = `
    .btn { overflow: hidden; position: relative; }
    .ripple-wave {
      position: absolute; border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: rippleAnim 0.55s linear;
      pointer-events: none;
    }
    @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }
  `;
  document.head.appendChild(style);

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    Object.assign(wave.style, {
      width: size + 'px', height: size + 'px',
      left: (e.clientX - rect.left - size / 2) + 'px',
      top: (e.clientY - rect.top - size / 2) + 'px'
    });
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });
})();

/* ── 8. SKILL TAGS HOVER GLOW ────────────────────────────── */
(function initSkillGlow() {
  const style = document.createElement('style');
  style.textContent = `
    .skill-tag {
      transition: all 0.22s ease;
      cursor: default;
    }
    .skill-tag:hover {
      background: rgba(56,189,248,0.15) !important;
      border-color: rgba(56,189,248,0.45) !important;
      color: #38bdf8 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(56,189,248,0.2);
    }
  `;
  document.head.appendChild(style);
})();

/* ── 9. SECTION ACTIVE NAV HIGHLIGHT ─────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── 10. PAGE LOAD FADE-IN ───────────────────────────────── */
(function initPageFade() {
  const style = document.createElement('style');
  style.textContent = `
    body { animation: pageFadeIn 0.6s ease both; }
    @keyframes pageFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  `;
  document.head.appendChild(style);
})();

/* ── 11. ✨ AVAILABLE FOR WORK PULSE BADGE ───────────────── */
(function initAvailableBadge() {
  const style = document.createElement('style');
  style.textContent = `
    .badge.pulse-badge {
      animation: pulseBadge 2s ease infinite;
      box-shadow: 0 0 0 0 rgba(56,189,248,0.6);
    }
    @keyframes pulseBadge {
      0% { box-shadow: 0 0 0 0 rgba(56,189,248,0.6); }
      50% { box-shadow: 0 0 0 8px rgba(56,189,248,0); }
      100% { box-shadow: 0 0 0 0 rgba(56,189,248,0); }
    }
    .badge.pulse-badge::before {
      content: '🟢';
      margin-right: 0.3rem;
      animation: pulse 1.5s ease infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.badge').forEach(badge => {
    if (badge.textContent.includes('Open to Work')) {
      badge.classList.add('pulse-badge');
    }
  });
})();

/* ── 12. 📧 COPY EMAIL ONE-CLICK ─────────────────────────── */
(function initCopyEmail() {
  const style = document.createElement('style');
  style.textContent = `
    .copy-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 0.85rem 1.2rem;
      background: rgba(56,189,248,0.95);
      color: #fff;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 9999;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      pointer-events: none;
    }
    .copy-toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.textContent = '✓ Đã copy email!';
  document.body.appendChild(toast);

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="mailto:"]');
    if (!link) return;
    e.preventDefault();
    const email = link.href.replace('mailto:', '');
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
})();

/* ── 13. 📊 COUNTER ANIMATION (Stats) ────────────────────── */
(function initCounter() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.counter);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            e.target.textContent = target;
            clearInterval(timer);
          } else {
            e.target.textContent = Math.floor(current);
          }
        }, 16);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
})();
