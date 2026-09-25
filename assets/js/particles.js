// Partículas da página inicial: atraídas pelo cursor, repelidas enquanto se clica.
// Não arranca com "reduzir movimento" ligado e pára quando o separador não está visível.
(function () {
  const canvas = document.getElementById('physics-canvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  const FRICTION = 0.96;
  let width, height, particles = [], frame = null;
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let mouseDown = false;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 2 + 1;
      this.hueBase = Math.random() * 50;
    }
    update() {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const distSq = Math.max(dx * dx + dy * dy, 500), dist = Math.sqrt(distSq);
      const force = mouseDown ? -15 : 0.8;
      this.vx = (this.vx + (dx / dist) * (1000 / distSq) * force) * FRICTION + (Math.random() - 0.5) * 0.05;
      this.vy = (this.vy + (dy / dist) * (1000 / distSq) * force) * FRICTION + (Math.random() - 0.5) * 0.05;
      this.x += this.vx; this.y += this.vy;
      if (this.x > width + 20) this.x = -20; else if (this.x < -20) this.x = width + 20;
      if (this.y > height + 20) this.y = -20; else if (this.y < -20) this.y = height + 20;
    }
    draw() {
      const speed = Math.abs(this.vx) + Math.abs(this.vy);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${200 + this.hueBase + speed * 10}, 100%, 60%, ${Math.min(1, 0.5 + speed / 5)})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function resize() { width = canvas.width = innerWidth; height = canvas.height = innerHeight; }
  function loop() {
    ctx.fillStyle = 'rgba(3, 0, 20, 0.2)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) { p.update(); p.draw(); }
    ctx.globalCompositeOperation = 'source-over';
    frame = requestAnimationFrame(loop);
  }

  resize();
  const count = innerWidth < 700 ? 120 : 260;
  for (let i = 0; i < count; i++) particles.push(new Particle());
  loop();

  addEventListener('resize', resize);
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  addEventListener('mousedown', () => { mouseDown = true; });
  addEventListener('mouseup', () => { mouseDown = false; });
  addEventListener('touchmove', e => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchstart', e => { mouseDown = true; mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', () => { mouseDown = false; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = null; } else if (!frame) loop();
  });
})();
