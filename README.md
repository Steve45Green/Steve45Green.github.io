# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> SYSTEM ONLINE. PERFORMANCE MODE ACTIVE.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: ARCHIVE </span>
    <h3 style="margin-top: 0; color: #fff; font-weight: 300;">Core Perspectives & Analysis</h3>
    <p>Access the raw data files and detailed documentation.</p>
    
    <a href="assets/documents/YOUR_FILE.pdf" class="btn-download" target="_blank">
      EXTRACT DATA
    </a>
  </div>
</div>

<div style="height: 50px;"></div>

<h2 style="text-align: center; margin-bottom: 40px; font-weight: 300; letter-spacing: 2px;">SYSTEM LOGS</h2>

<div style="max-width: 800px; margin: 0 auto;">
{% for post in site.posts %}
  <div class="glass-card">
    <span class="meta-info">:: CYCLE [{{ post.date | date: "%Y.%m.%d" }}]</span>
    <a href="{{ post.url }}" style="font-size: 1.4em; display: block; font-weight: 300;">{{ post.title }}</a>
  </div>
{% endfor %}
</div>

<div style="text-align: center; margin-top: 80px; opacity: 0.6; font-size: 0.8em; letter-spacing: 1px;">
  <p>SINGULARITY ACTIVE. <span style="color: var(--electric-blue);">CLICK TO RELEASE ENERGY.</span></p>
</div>

<canvas id="physics-canvas"></canvas>

<script>
window.onload = function() {
  const canvas = document.getElementById('physics-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  // CENTER POINT INITIALIZATION
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouseDown = false;

  // CONFIGURATION
  const PARTICLE_COUNT = 300;
  const BASE_SPEED = 0.5; // Smooth speed for 165Hz monitors
  const FRICTION = 0.96;
  
  class Particle {
    constructor() { 
      this.init(true); 
    }

    init(randomY = false) {
      this.x = Math.random() * width;
      this.y = randomY ? Math.random() * height : Math.random() * height;
      
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      
      this.size = Math.random() * 2 + 1;
      this.hueBase = Math.random() * 50; 
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distSq = dx*dx + dy*dy;
      
      // Prevent division by zero
      if (distSq < 500) distSq = 500;
      let dist = Math.sqrt(distSq);

      // Force: Repel on click (-15), Attract gently otherwise (0.8)
      let force = mouseDown ? -15 : 0.8; 
      
      let fx = (dx / dist) * (1000 / distSq) * force;
      let fy = (dy / dist) * (1000 / distSq) * force;

      this.vx += fx;
      this.vy += fy;

      this.vx *= FRICTION;
      this.vy *= FRICTION;

      // Constant turbulence to keep it alive
      this.vx += (Math.random() - 0.5) * 0.05;
      this.vy += (Math.random() - 0.5) * 0.05;

      this.x += this.vx;
      this.y += this.vy;

      // Screen boundaries (Teleport)
      if (this.x > width + 20) this.x = -20;
      if (this.x < -20) this.x = width + 20;
      if (this.y > height + 20) this.y = -20;
      if (this.y < -20) this.y = height + 20;
    }

    draw() {
      // Speed determines color intensity
      let speed = Math.abs(this.vx) + Math.abs(this.vy);
      let hue = 200 + this.hueBase + (speed * 10); 
      let alpha = 0.5 + (speed / 5);
      if (alpha > 1) alpha = 1;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    loop();
  }

  function loop() {
    // Background fade effect
    ctx.fillStyle = 'rgba(3, 0, 20, 0.2)';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter'; 
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(loop);
  }

  // Event Listeners
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('mouseup', () => mouseDown = false);
  
  // Mobile Support
  window.addEventListener('touchmove', e => { 
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
  }, { passive: true });
  window.addEventListener('touchstart', (e) => { 
      mouseDown = true; mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; 
  });
  window.addEventListener('touchend', () => mouseDown = false);

  // START
  init();
};
</script>

<style>
/* Typography & Animation */
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
