# Steve45Green.github.io

<div style="text-align: center; margin-top: 40px; margin-bottom: 60px;">
  <p class="typing-effect">>> ACESSO SEGURO </p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  
  <div class="glass-card" style="border-left-color: var(--neon-pink);">
    <span class="meta-info">:: A minha perspectiva </span>
    <h3 style="margin-top: 0; color: #fff;">Documentação do Projeto</h3>
 
    <a href="assets/documents/SEU_ARQUIVO.pdf" class="btn-download" target="_blank">
      VER OS DOCUMENTOS
    </a>
  </div>

</div>

<hr style="border-color: var(--neon-cyan); opacity: 0.2; width: 50%; margin: 40px auto;">

<h2 style="text-align: center; margin-bottom: 30px; text-shadow: 0 0 10px var(--neon-cyan);">DIÁRIO DE BORDO</h2>

<div style="max-width: 800px; margin: 0 auto;">
{% for post in site.posts %}
  <div class="glass-card">
    <span class="meta-info">:: LOG DATA [{{ post.date | date: "%Y.%m.%d" }}]</span>
    <a href="{{ post.url }}" style="font-size: 1.4em; display: block;">{{ post.title }}</a>
  </div>
{% endfor %}
</div>

<div style="text-align: center; margin-top: 60px; opacity: 0.6; font-size: 0.8em;">
  <p>Physics Engine V5.0 active .<br> <span style="color: var(--neon-pink);">Click on the background to reverse gravity..</span></p>
</div>

<canvas id="physics-canvas"></canvas>

<script>
(function() {
  const canvas = document.getElementById('physics-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  // PARÂMETROS FÍSICOS
  const PARTICLE_COUNT = 350;
  const GRAVITY_CONSTANT = 0.85;
  const FRICTION = 0.96;
  const MOUSE_MASS = 9000;
  
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;

  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 1.5 + 0.5;
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distSq = dx*dx + dy*dy;
      if (distSq < 100) distSq = 100;
      let dist = Math.sqrt(distSq);

      // Gravidade Inversa ao Clicar
      let forceDirection = mouseDown ? -3.5 : 1; 
      let force = (GRAVITY_CONSTANT * MOUSE_MASS) / distSq;
      
      let forceX = (dx / dist) * force * forceDirection;
      let forceY = (dy / dist) * force * forceDirection;

      this.vx += forceX;
      this.vy += forceY;
      this.vx *= FRICTION;
      this.vy *= FRICTION;
      this.x += this.vx;
      this.y += this.vy;

      // Teletransporte nas bordas
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }

    draw() {
      // CORES BASEADAS NA VELOCIDADE
      const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      
      let r, g, b, alpha;
      
      // Lógica de cores: Lento (Roxo) -> Rápido (Ciano) -> Muito Rápido (Branco)
      if (speed < 2.5) {
        r = 80; g = 0; b = 180; alpha = 0.4; // Roxo Escuro
      } else if (speed < 7) {
        r = 0; g = 243; b = 255; alpha = 0.7; // Ciano Neon
      } else {
        r = 255; g = 255; b = 255; alpha = 0.95; // Branco
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) { particles.push(new Particle()); }
    loop();
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function loop() {
    // Efeito de rasto (Motion Blur)
    ctx.fillStyle = 'rgba(2, 6, 20, 0.25)'; 
    ctx.fillRect(0, 0, width, height);
    
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  // Event Listeners
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('mouseup', () => mouseDown = false);
  window.addEventListener('touchmove', e => { 
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
      e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchstart', (e) => { 
      mouseDown = true; mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
  });
  window.addEventListener('touchend', () => mouseDown = false);

  init();
})();
</script>

<style>
/* CSS Extra para animação de escrita */
.typing-effect {
  overflow: hidden;
  border-right: 2px solid var(--neon-cyan);
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
  color: var(--neon-cyan);
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.2em;
  display: inline-block;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.6);
  max-width: 90vw; /* Responsivo para telemóveis */
}
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { 50% { border-color: transparent } }
</style>
