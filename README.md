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

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

<script>
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80, /* Quantidade de bolas */
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff" /* Cor branca */
    },
    "shape": {
      "type": "circle", /* Forma de bola */
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5, /* Transparência das bolas */
      "random": false
    },
    "size": {
      "value": 3, /* Tamanho das bolas */
      "random": true
    },
    "line_linked": {
      "enable": true, /* Ativar as linhas que unem as bolas */
      "distance": 150,
      "color": "#ffffff", /* Cor das linhas */
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, /* Velocidade do movimento (aumenta para ser mais rápido) */
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true, /* Reagir quando passas o rato */
        "mode": "grab" /* Agarrar as partículas próximas */
      },
      "onclick": {
        "enable": true,
        "mode": "push" /* Adicionar mais partículas ao clicar */
      },
      "resize": true
    }
  },
  "retina_detect": true
});
</script>
