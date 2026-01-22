# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> CALIBRAÇÃO DE HERTZ CONCLUÍDA... FLUIDEZ MÁXIMA.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: ARQUIVO CRÍPTICO [NÍVEL ÔMEGA]</span>
    <h3 style="margin-top: 0; color: #fff; font-weight: 300;">Esquemas do Motor Quântico</h3>
    <p>Aceda aos dados técnicos da simulação estabilizada (165Hz Ready).</p>
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
  
  // CONFIGURAÇÃO DE ALTA PRECISÃO
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;

  // Parâmetros Físicos
  const PARTICLE_COUNT = 320; 
  const DRAG = 0.96; // Atrito do ar
  const GRAVITY_STRENGTH = 0.55; 
  const MOUSE_PULL = 6000;

  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      // Velocidade Inicial
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.baseSize = Math.random() * 2 + 1;
      this.hueShift = Math.random() * 50 - 25; 
    }

    // A física agora é calculada assumindo um passo de tempo ideal (independente dos Hz)
    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      
      // Evitar divisão por zero e explosões no centro
      let distSq = dx*dx + dy*dy;
      if (distSq < 500) distSq = 500; 
      
      let dist = Math.sqrt(distSq);

      // Força: Se clicar (-8), senão (1)
      let forceDir = mouseDown ? -8 : 1; 
      
      // Fórmula Gravitacional Suavizada
      let force = (GRAVITY_STRENGTH * MOUSE_PULL) / distSq;
      
      let ax = (dx / dist) * force * forceDir;
      let ay = (dy / dist) * force * forceDir;

      // Aplicar Aceleração
      this.vx += ax;
      this.vy += ay;

      // Aplicar Atrito (Drag)
      this.vx *= DRAG;
      this.vy *= DRAG;

      // Mover
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around (Teletransporte nas bordas)
      if (this.x > width + 50) this.x = -50;
      if (this.x < -50) this.x = width + 50;
      if (this.y > height + 50) this.y = -50;
      if (this.y < -50) this.y = height + 50;
    }

    draw() {
      // Calcular velocidade para cor
      const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      // Suavizar o tamanho visualmente
      const currentSize = this.baseSize * (1 + speed/8);
      
      let hue, lightness, glow;
      
      // Lógica de Cores "Quantum"
      if (speed < 1.5) {
        hue = 260 + this.hueShift; lightness = 50; glow = false; // Repouso (Roxo)
      } else if (speed < 5) {
        hue = 190 + this.hueShift; lightness = 60; glow = true;  // Ativo (Azul)
      } else {
        hue = 160 + this.hueShift; lightness = 85; glow = true;  // Energia (Branco/Verde)
      }

      const color = `hs
