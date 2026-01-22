# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> NÚCLEO DE ENERGIA ESTABILIZADO... BEM-VINDO.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: ARQUIVO CRÍPTICO [NÍVEL ÔMEGA]</span>
    <h3 style="margin-top: 0; color: #fff; font-weight: 300;">Esquemas do Motor Quântico</h3>
    <p>Aceda aos dados técnicos da nova simulação de partículas de luz.</p>
    <a href="assets/documents/SEU_ARQUIVO.pdf" class="btn-download" target="_blank">
      EXTRAIR DADOS
    </a>
  </div>
</div>

<div style="height: 50px;"></div>

<h2 style="text-align: center; margin-bottom: 40px; font-weight: 300; letter-spacing: 2px;">REGISTOS DO SISTEMA</h2>

<div style="max-width: 800px; margin: 0 auto;">
{% for post in site.posts %}
  <div class="glass-card">
    <span class="meta-info">:: CICLO [{{ post.date | date: "%Y.%m.%d" }}]</span>
    <a href="{{ post.url }}" style="font-size: 1.4em; display: block; font-weight: 300;">{{ post.title }}</a>
  </div>
{% endfor %}
</div>

<div style="text-align: center; margin-top: 80px; opacity: 0.6; font-size: 0.8em; letter-spacing: 1px;">
  <p>SINGULARIDADE ATIVA. <span style="color: var(--electric-blue);">CLIQUE PARA LIBERTAR ENERGIA.</span></p>
</div>

<canvas id="physics-canvas"></canvas>

<script>
(function() {
  const canvas = document.getElementById('physics-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  // PARÂMETROS FÍSICOS REFINADOS PARA FLUIDEZ
  const PARTICLE_COUNT = 300; // Menos partículas, mas mais "caras" de desenhar
  const GRAVITY_CONSTANT = 0.7; // Gravidade um pouco mais suave
  const FRICTION = 0.98; // Menos atrito para movimento mais perpétuo
  const MOUSE_MASS = 7000;
  
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;

  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      // Velocidade inicial mais orgânica
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      // Tamanho base variável
      this.baseSize = Math.random() * 2 + 1;
      // Variação de cor inerente (algumas são naturalmente mais azuis, outras mais roxas)
      this.hueShift = Math.random() * 40 - 20; 
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distSq = dx*dx + dy*dy;
      // Zona de exclusão maior no centro para evitar aglomeração excessiva
      if (distSq < 400) distSq = 400; 
      let dist = Math.sqrt(distSq);

      // Repulsão mais forte e explosiva no clique
      let forceDirection = mouseDown ? -8 : 1; 
      let force = (GRAVITY_CONSTANT * MOUSE_MASS) / distSq;
      
      let forceX = (dx / dist) * force * forceDirection;
      let forceY = (dy / dist) * force * forceDirection;

      this.vx += forceX;
      this.vy += forceY;
      this.vx *= FRICTION;
      this.vy *= FRICTION;
      this.x += this.vx;
      this.y += this.vy;

      // Teletransporte suave nas bordas
      if (this.x > width + 50) this.x = -50;
      if (this.x < -50) this.x = width + 50;
      if (this.y > height + 50) this.y = -50;
      if (this.y < -50) this.y = height + 50;
    }

    // O NOVO RENDERIZADOR "QUANTUM GLOW"
    draw() {
      const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      // O tamanho aumenta ligeiramente com a velocidade
      const currentSize = this.baseSize * (1 + speed/10);
      
      // Definição de cores baseada na velocidade (HSLA para transições mais suaves)
      let hue, lightness, glowStrong;
      
      if (speed < 2) {
        // Estado Repouso: Violeta profundo
        hue = 260 + this.hueShift; lightness = 50; glowStrong = false;
      } else if (speed < 6) {
        // Estado Ativo: Azul Elétrico
        hue = 200 + this.hueShift; lightness = 60; glowStrong = true;
      } else {
        // Estado Alta Energia: Ciano/Branco Esverdeado
        hue = 160 + this.hueShift; lightness = 80; glowStrong = true;
      }

      const color = `hsla(${hue}, 100%, ${lightness}%, 0.8)`;
      
      ctx.beginPath();
      // A MAGIA: Usar shadowBlur para criar luz real
      // Partículas rápidas têm um brilho muito maior
      ctx.shadowBlur = glowStrong ? currentSize * 4 : currentSize * 2;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      
      ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Reset do shadow para não afetar outras coisas (performance)
      ctx.shadowBlur = 0; 
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
    // Limpeza do canvas com "fade" para rastos de luz suaves
    // Usamos um azul muito escuro e transparente em vez de preto
    ctx.fillStyle = 'rgba(3, 0, 20, 0.2)'; 
    ctx.fillRect(0, 0, width, height);
    
    // Usar "lighter" composite mode faz as partículas brilharem quando se sobrepõem
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalCompositeOperation = 'source-over'; // Reset

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('mouseup', () => mouseDown = false);
  window.addEventListener('touchmove', e => { 
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchstart', (e) => { 
      mouseDown = true; mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
  });
  window.addEventListener('touchend', () => mouseDown = false);

  init();
})();
</script>

<style>
/* Animação de escrita atualizada para a nova paleta */
.typing-effect {
  overflow: hidden;
  border-right: 2px solid var(--electric-blue);
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.2em;
  animation: typing 4s steps(50, end), blink-caret .9s step-end infinite;
  color: var(--electric-blue);
  font-family: 'Courier New', monospace;
  font-weight: 300;
  font-size: 1.1em;
  display: inline-block;
  text-shadow: 0 0 15px rgba(0, 191, 255, 0.7);
}
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { 50% { border-color: transparent } }
</style>
