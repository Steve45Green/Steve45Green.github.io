# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> SISTEMA REINICIADO... ESTABILIDADE 100%.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: ARQUIVO CRÍPTICO [NÍVEL ÔMEGA]</span>
    <h3 style="margin-top: 0; color: #fff; font-weight: 300;">Esquemas do Motor Quântico</h3>
    <p>Aceda aos dados técnicos da simulação corrigida.</p>
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
  
  // Variáveis Globais
  let width, height;
  let particles = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;
  
  // CONFIGURAÇÃO FÍSICA (Ajustada para suavidade)
  const PARTICLE_COUNT = 300; 
  const FRICTION = 0.95; 
  const GRAVITY = 0.6;
  
  // Classe da Partícula
  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 2 + 1;
      this.hueBase = Math.random() * 40 - 20; // Variação de cor
    }

    // Método de atualização que recebe o "Fator de Tempo"
    update(factor) {
      // 1. Calcular distâncias
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distSq = dx*dx + dy*dy;
      
      // Evitar divisão por zero e colapso total (Segurança)
      if (distSq < 400) distSq = 400; 
      let dist = Math.sqrt(distSq);

      // 2. Aplicar Força (Gravidade ou Repulsão)
      let direction = mouseDown ? -10 : 1; // Repulsão forte ao clicar
      let force = (GRAVITY * 5000) / distSq; // Força baseada na massa
      
      let ax = (dx / dist) * force * direction;
      let ay = (dy / dist) * force * direction;

      // 3. Atualizar Velocidade com o Fator de Tempo
      // Se tiveres 165Hz, o fator será pequeno (ex: 0.3), movendo menos por frame
      this.vx += ax * factor;
      this.vy += ay * factor;

      // 4. Atrito (Corrigido para Delta Time)
      // Usamos Math.pow para que o atrito seja consistente independente dos FPS
      let frictionAdjusted
