# Steve45Green.github.io

<div style="text-align: center; margin-top: 60px; margin-bottom: 80px;">
  <p class="typing-effect">>> SYSTEM ONLINE. PERFORMANCE MODE ACTIVE.</p>
</div>

<div style="max-width: 800px; margin: 0 auto;">
  <div class="glass-card">
    <span class="meta-info">:: CLASSIFIED ARCHIVE [OMEGA LEVEL]</span>
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

<div style="text-align: center; margin-top: 80px; opacity:
