// Utilities
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

// Mobile nav toggle
(function () {
  const toggle = qs('.nav-toggle');
  const menu = qs('#nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });
})();

// Smooth scroll for scroll-cue and nav links
(function () {
  function smoothTo(target) {
    const el = typeof target === 'string' ? qs(target) : target;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothTo(target);
        history.pushState(null, '', `#${id}`);
      }
    });
  });

  qsa('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sel = btn.getAttribute('data-scroll');
      if (sel) smoothTo(sel);
    });
  });
})();

// Intersection-based reveal animations
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );

  qsa('.section').forEach((el) => {
    el.classList.add('will-reveal');
    observer.observe(el);
  });
})();

// Active section nav spy
(function () {
  const links = qsa('.nav-menu a');
  const sections = links
    .map((l) => qs(l.getAttribute('href') || ''))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (!id) return;
        const link = qs(`.nav-menu a[href="#${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
  );

  sections.forEach((s) => s && spy.observe(s));
})();

// Animated counters (About stats)
(function () {
  const nums = qsa('.stats .num');
  if (nums.length === 0) return;

  const animate = (el) => {
    const target = Number(el.getAttribute('data-count') || '0');
    let current = 0;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      current = Math.round(target * (0.5 - Math.cos(Math.PI * p) / 2));
      el.textContent = String(current);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const ob = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          ob.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  nums.forEach((n) => ob.observe(n));
})();

// Projects: fetch and render + filters
(async function () {
  try {
    const res = await fetch('/projects.json');
    const projects = res.ok ? await res.json() : [];
    const grid = qs('#project-grid');
    const filters = qsa('.filter');

    function cardTemplate(p) {
      return `
        <article class="project-card" data-tags="${(p.tags||[]).join(',')}">
          <div class="project-thumb">
            <span>${p.emoji || '✨'}</span>
          </div>
          <div class="project-meta">
            <h3>${p.title}</h3>
            <p class="muted">${p.subtitle || ''}</p>
            <div class="badges">${(p.tech||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
            <div>
              ${p.links?.live ? `<a class="btn ghost" target="_blank" rel="noopener" href="${p.links.live}">Live</a>` : ''}
              ${p.links?.code ? `<a class="btn ghost" target="_blank" rel="noopener" href="${p.links.code}">Code</a>` : ''}
              ${p.caseStudy ? `<a class="btn primary" target="_blank" rel="noopener" href="${p.caseStudy}">Case Study</a>` : ''}
            </div>
          </div>
        </article>`;
    }

    function render(list) {
      if (!grid) return;
      grid.innerHTML = list.map(cardTemplate).join('');
    }

    function filterBy(tag) {
      if (tag === 'all') return projects;
      return projects.filter((p) => (p.tags || []).includes(tag));
    }

    render(projects);
    filters.forEach((f) =>
      f.addEventListener('click', () => {
        filters.forEach((x) => x.classList.remove('is-active'));
        f.classList.add('is-active');
        render(filterBy(f.dataset.filter));
      })
    );
  } catch (e) {
    // no-op for static hosting
  }
})();

// Footer year
(function(){
  const y = new Date().getFullYear();
  const el = qs('#year');
  if (el) el.textContent = String(y);
})();
