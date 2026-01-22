# Steve45Green.github.io

<p class="typing-effect">A iniciar sequência de hiperespaço... Bem-vindo.</p>

## Diário de Bordo

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> - <span>{{ post.date | date: "%d/%m/%Y" }}</span>
  </li>
{% endfor %}
</ul>

<hr>

### Sobre este Terminal
Este é o meu espaço de documentação pessoal.
Todos os dados aqui presentes estão protegidos por encriptação quântica (e pela licença Creative Commons).

<div id="particles-js"></div>

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script>
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 150, /* Muitas estrelas */
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.8,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": {
      "enable": false /* Sem linhas, apenas estrelas */
    },
    "move": {
      "enable": true,
      "speed": 4, /* Velocidade do portal */
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble" /* Efeito de lupa/bolha ao passar o rato */
      },
      "onclick": {
        "enable": true,
        "mode": "repulse" /* Clique explode/afasta estrelas */
      },
      "resize": true
    },
    "modes": {
      "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 1 },
      "repulse": { "distance": 200, "duration": 0.4 }
    }
  },
  "retina_detect": true
});
</script>
