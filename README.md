# Steve45Green.github.io

<div style="text-align: center; margin-top: 30px; margin-bottom: 40px;">
  <p class="typing-effect">>> INICIALIZANDO SIMULAÇÃO GRAVITACIONAL N-CORPOS... SISTEMA ONLINE.</p>
</div>

## Diário de Investigação

<ul style="list-style: none; padding: 0;">
{% for post in site.posts %}
  <li style="margin-bottom: 15px; border-left: 3px solid #00ff00; padding-left: 10px; background: rgba(0,0,0,0.3);">
    <span style="color: #00ff00; font-size: 0.8em;">[LOG DATE: {{ post.date | date: "%Y.%m.%d" }}]</span><br>
    <a href="{{ post.url }}" style="font-size: 1.2em; font-weight: bold;">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>

<hr style="border-color: #00ff00; opacity: 0.3; margin: 40px 0;">

### Notas do Sistema
Este terminal utiliza um motor de física experimental. O seu cursor actua como uma singularidade gravitacional.
<br><span style="color: #00ff00;">>> CLIQUE E SEGURE PARA INVERTER A POLARIDADE GRAVÍTICA (MATÉRIA EXÓTICA).</span>

<canvas id="physics-canvas"></canvas>

<script>
(function() {
  // Configuração Inicial do Canvas
  const canvas = document.getElementById('physics-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  
  // --- PARÂMETROS DA SIMULAÇÃO FÍSICA ---
  const PARTICLE_COUNT = 400;     // Densidade do universo (número de partículas)
  const GRAVITY_CONSTANT = 0.9;   // Constante gravitacional (G)
  const FRICTION = 0.97;          // Coeficiente de arrasto (atrito espacial para estabilidade)
  const MOUSE_MASS = 9000;        // Massa da singularidade (o teu cursor)
  
  // Estado do Rato (Singularidade)
  // Inicia no centro do ecrã se o rato ainda não se mexeu
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false; // Estado do clique para inversão de gravidade

  // --- CLASSE VETORIAL DA PARTÍCULA ---
  class Particle {
    constructor() {
      this.init();
    }

    // Inicialização com entropia (valores aleatórios)
    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      // Velocidade inicial aleatória
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 1.5 + 0.5; // Variação de massa/tamanho
      // Base de cor (azul profundo para partículas frias)
      this.baseR = 0; this.baseG = 100; this.baseB = 255;
    }

    // O NÚCLEO DA FÍSICA: Atualização de posição e velocidade a cada frame
    update() {
      // 1. Cálculo do Vetor de Distância (dx, dy)
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      
      // Distância Euclidiana ao quadrado (para evitar raiz quadrada pesada na fórmula da força)
      let distSq = dx*dx + dy*dy;

      // Prevenção de singularidade matemática (divisão por zero se a partícula tocar no rato)
      if (distSq < 100) distSq = 100;
      let dist = Math.sqrt(distSq);

      // 2. Cálculo da Força Gravitacional (Baseado em Newton: F = G * M / r^2)
      // Se o rato estiver pressionado, a direção é invertida (-1 = Repulsão/Anti-gravidade)
      let forceDirection = mouseDown ? -2.5 : 1; 
      let force = (GRAVITY_CONSTANT * MOUSE_MASS) / distSq;
      
      // Decomposição vetorial da força (Normalização do vetor)
      let forceX = (dx / dist) * force * forceDirection;
      let forceY = (dy / dist) * force * forceDirection;

      // 3. Aplicação da Força à Velocidade (F=ma, assumindo m=1 para simplificar)
      this.vx += forceX;
      this.vy += forceY;

      // 4. Aplicação de Atrito Espacial (Drag) para evitar aceleração infinita
      this.vx *= FRICTION;
      this.vy *= FRICTION;

      // 5. Atualização da Posição
      this.x += this.vx;
      this.y += this.vy;

      // 6. Condições de Fronteira (Wrap-around / Teletransporte toroidal)
      // Se sair por um lado, entra pelo outro.
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }

    // RENDERIZAÇÃO
    draw() {
      // Termodinâmica Visual: Calcular a velocidade escalar
      const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      // Mapear velocidade para intensidade de cor (Partículas mais rápidas ficam mais quentes/brancas)
      const intensity = Math.min(255, speed * 35);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // Gradiente de temperatura dinâmico: Azul (lento/frio) -> Branco (rápido/quente)
      // A opacidade também aumenta com a velocidade.
      ctx.fillStyle = `rgba(${this.baseR + intensity}, ${this.baseG + intensity}, ${this.baseB}, ${0.5 + speed/30})`;
      ctx.fill();
    }
  }

  // --- CONTROLO DO MOTOR ---
  function init() {
    resize();
    // Criar o universo de partículas
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    loop(); // Iniciar o loop de renderização
  }

  // Lidar com redimensionamento da janela
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // LOOP DE RENDERIZAÇÃO (Game Loop - ~60 FPS)
  function loop() {
    // Efeito de Rasto (Motion Blur): Limpar o canvas com um retângulo semi-transparente
    // Isto faz com que os frames anteriores não desapareçam imediatamente, criando rastos.
    ctx.fillStyle = 'rgba(0, 5, 16, 0.25)'; // Cor do fundo com 25% de opacidade
    ctx.fillRect(0, 0, width, height);

    // Atualizar e desenhar cada partícula
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Pedir o próximo frame ao navegador
    requestAnimationFrame(loop);
  }

  // --- EVENT LISTENERS (Interação) ---
  window.addEventListener('resize', resize);
  // Rato
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('mouseup', () => mouseDown = false);
  // Touch (Mobile)
  window.addEventListener('touchmove', e => { 
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
      // Prevenir scroll no mobile enquanto interage com a física
      e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchstart', (e) => { 
      mouseDown = true; 
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
  });
  window.addEventListener('touchend', () => mouseDown = false);

  // Iniciar motor
  init();
})();
</script>

<style>
.typing-effect {
  overflow: hidden;
  border-right: 3px solid #00ff00; /* Cursor estilo terminal antigo */
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.1em;
  animation: 
    typing 4s steps(60, end), /* Escrita letra a letra */
    blink-caret .9s step-end infinite; /* Piscar do cursor */
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: inline-block;
  max-width: 100%; /* Responsivo */
}
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #00ff00; } }
</style>
