# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> SINCRONIZAÇÃO TEMPORAL ATIVA... SISTEMA ESTÁVEL.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: ARQUIVO CRÍPTICO [NÍVEL ÔMEGA]</span>
    <h3 style="margin-top: 0; color: #fff; font-weight: 300;">Esquemas do Motor Quântico</h3>
    <p>Aceda aos dados técnicos da nova simulação com correção de Delta-Time.</p>
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
  
  // VARIÁVEIS DE TEMPO (DELTA TIME)
  let lastTime = 0;
  const targetFPS = 60;
  const targetFrameTime = 1000 / targetFPS; // ~16.6ms por frame
  
  // PARÂMETROS FÍSICOS
  const PARTICLE_COUNT = 300;
  const GRAVITY_CONSTANT = 0.65; // Ajustado para Delta Time
  const FRICTION = 0.96;         // Atrito base
  const MOUSE_MASS = 6500;
  
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;

  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.baseSize = Math.random() * 2 + 1;
      this.hueShift = Math.random() * 40 - 20; 
    }

    // UPDATE AGORA RECEBE O FATOR DE CORREÇÃO DE TEMPO
    update(correction) {
      let dx = mouse.x - this.x;
