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
