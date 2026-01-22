# Steve45Green.github.io

<p class="typing-effect">A carregar sistema... Documentação iniciada.</p>

## Artigos Recentes

<ul>
{% for post in site.posts %}
<li>
<a href="{{ post.url }}">{{ post.title }}</a> - <span>{{ post.date | date: "%d/%m/%Y" }}</span>
</li>
{% endfor %}
</ul>

<div id="particles-js"></div>
<script src="[https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js](https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js)"></script>
<script>
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
    "opacity": { "value": 0.5, "random": false },
    "size": { "value": 3, "random": true },
    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    }
  },
  "retina_detect": true
});
</script>   
