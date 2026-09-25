# Steve45Green.github.io

O site pessoal de Steve45Green aka José Ameixa: artigos sobre engenharia de software, IA aplicada e regulação, e os projetos que os acompanham. Publicado em <https://steve45green.github.io> pelo GitHub Pages.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A página inicial: apresentação, projetos e a lista de artigos |
| `_posts/AAAA-MM-DD-titulo.md` | Um artigo em Markdown, com `title`, `subtitle`, `date`, `tags` e `excerpt` no cabeçalho |
| `_layouts/default.html`, `_layouts/post.html` | O esqueleto das páginas e o dos artigos |
| `assets/css/style.scss` | O tema "Quantum Aurora": cores, tipografia, cartões de vidro |
| `assets/js/particles.js` | As partículas da página inicial (desligadas com "reduzir movimento") |
| `assets/images/<artigo>/` | As imagens de cada artigo |
| `assets/documents/` | Versões HTML completas de artigos, entre elas a versão inglesa de "A Era da Saúde Algorítmica em Portugal" |

## Escrever um artigo

Cria `_posts/2026-10-01-o-meu-artigo.md`:

```markdown
---
layout: post
title: "Título"
subtitle: "Uma linha que explica o artigo"
date: 2026-10-01
tags: [IA, Portugal]
excerpt: "Duas frases para a página inicial."
---

O texto, em Markdown.
```

Com `alt_lang_url: /caminho/para/a-versao-inglesa.html` aparece a ligação "Read it in English".

## Ver no teu computador

```bash
gem install jekyll -v 3.10.0 && gem install jekyll-feed jekyll-seo-tag jekyll-sitemap
jekyll serve
```

e abre <http://localhost:4000>.

## Licença

Os textos estão sob [CC BY 4.0](LICENSE.md).
