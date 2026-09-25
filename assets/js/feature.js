// Artigos interativos: barra de progresso, escada animada, contadores, separadores da escada,
// comandos dos slides embebidos, dicas do gráfico, copiar e revelar ao percorrer.
(function () {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // barra de progresso de leitura
  const bar = document.querySelector('.read-progress span');
  const article = document.querySelector('.post');
  if (bar && article) {
    const update = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - innerHeight;
      bar.style.width = `${Math.max(0, Math.min(1, -r.top / (total > 0 ? total : 1))) * 100}%`;
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  const onView = (els, fn, threshold = 0.35) => {
    if (!('IntersectionObserver' in window)) { els.forEach(fn); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); }
    }), { threshold });
    els.forEach(el => io.observe(el));
  };

  // a escada acende degrau a degrau
  const hero = document.querySelector('.ladder-hero');
  if (hero) {
    const rungs = [...hero.querySelectorAll('.rung:not(.r6)')];
    if (still) rungs.forEach(r => r.classList.add('on'));
    else onView([hero], () => rungs.forEach((r, i) => setTimeout(() => r.classList.add('on'), 350 * i)));
  }

  // contadores
  const counters = [...document.querySelectorAll('[data-count]')];
  if (!still) {
    counters.forEach(el => { el.textContent = '0'; });
    onView(counters, el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 1100;
      const step = t => {
        const k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * eased);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  }

  // separadores da escada de pistas (setas para mudar de degrau)
  document.querySelectorAll('[data-ladder]').forEach(box => {
    const tabs = [...box.querySelectorAll('[role="tab"]')];
    const select = tab => {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        const j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (j === null) return;
        e.preventDefault();
        const next = tabs[(j + tabs.length) % tabs.length];
        select(next); next.focus();
      });
    });
  });

  // comandos dos slides embebidos: enviam a tecla ao motor dos slides
  document.querySelectorAll('.deck-embed').forEach(box => {
    const frame = box.querySelector('iframe');
    box.querySelectorAll('[data-deck]').forEach(btn => btn.addEventListener('click', () => {
      try {
        frame.contentWindow.dispatchEvent(new KeyboardEvent('keydown', { key: btn.dataset.deck }));
        frame.contentWindow.focus();
      } catch (e) { window.open(frame.src, '_blank', 'noopener'); }
    }));
  });

  // dicas do gráfico (rato, toque e teclado)
  document.querySelectorAll('.chart').forEach(chart => {
    const tip = chart.querySelector('.chart-tip');
    const show = el => {
      tip.textContent = el.dataset.tip;
      tip.hidden = false;
      const c = chart.getBoundingClientRect(), r = el.getBoundingClientRect(), w = tip.offsetWidth;
      const x = Math.min(Math.max(r.left - c.left + Math.min(r.width, 200) / 2, w / 2 + 8), c.width - w / 2 - 8);
      tip.style.left = `${x}px`;
      tip.style.top = `${r.top - c.top - 38}px`;
      tip.style.transform = 'translateX(-50%)';
    };
    const hide = () => { tip.hidden = true; };
    chart.querySelectorAll('[data-tip]').forEach(el => {
      el.addEventListener('mouseenter', () => show(el));
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focus', () => show(el));
      el.addEventListener('blur', hide);
      el.addEventListener('click', () => show(el));
    });
  });

  // copiar os comandos de instalação
  document.querySelectorAll('.copy[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = 'Copiado ✓'; }
    catch (e) { btn.textContent = 'Seleciona e copia'; }
    setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
  }));

  // revelar blocos ao percorrer
  if (!still) {
    const blocks = [...document.querySelectorAll('.feature .stats, .feature .ladder-widget, .feature .timeline, .feature .embed, .feature .chart, .feature .moodle-flow, .feature figure:not(.ladder-hero)')];
    blocks.forEach(b => b.classList.add('reveal'));
    onView(blocks, b => b.classList.add('in'), 0.12);
  }
})();
