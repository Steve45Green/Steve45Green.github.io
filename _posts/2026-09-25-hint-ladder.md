---
layout: post
title: "Hint Ladder: um tutor de IA que se recusa a fazer os teus trabalhos"
subtitle: "Como construí um plugin do Claude Code para Engenharia Informática que ensina, dá feedback e mede o que promete"
date: 2026-09-25
author: Steve45Green aka José Ameixa
tags: [IA, Educação, Claude Code, Open Source, Engenharia Informática]
excerpt: "A IA escreve um trabalho prático em dez segundos; a defesa oral continua a ser tua. O Hint Ladder transforma o Claude Code num tutor que ensina cada cadeira do curso e nunca entrega o trabalho avaliado. Nos testes: 0 soluções entregues em 24, contra 18 sem ele."
image: /assets/images/hint-ladder/social-preview.png
---

Um aluno de Engenharia Informática cola o enunciado do Trabalho Prático 2 no assistente de IA. Dez segundos depois tem `Aluno.java`, `Turma.java` e `Main.java`, a compilar e prontos a entregar. Três semanas depois está sozinho na defesa oral, diante de um docente que lhe pergunta porque é que o `ArrayList` guarda objetos e não números soltos. E não sabe responder.

O problema não é a IA ser má a programar. É ser boa demais a fazer o trabalho de quem devia estar a aprender. Construí o **Hint Ladder** para inverter isso: um plugin do Claude Code que ensina todas as cadeiras do curso, dá feedback ao código, ao processo e às ideias do aluno, e que, em trabalho avaliado, **se recusa a entregar a solução**.

---

## I. O problema que ninguém mede

Toda a gente tem uma opinião sobre a IA na universidade. Quase ninguém tem números. Por isso comecei pelo teste mais simples: o mesmo pedido, o mesmo modelo, duas pastas vazias. Numa, o Claude Code sozinho. Na outra, o Claude Code com o Hint Ladder.

<figure>
  <img src="{{ '/assets/images/hint-ladder/demo-graded-pt.gif' | relative_url }}" alt="Lado a lado, o mesmo trabalho avaliado de Java: sem o plugin, o Claude escreve Aluno.java, Turma.java e Main.java; com o Hint Ladder, deteta que é avaliado e pede ao aluno que explique o enunciado por palavras suas" loading="lazy">
  <figcaption>Execuções reais, 25 de setembro de 2026. À esquerda, três ficheiros prontos a entregar. À direita, a primeira pergunta de um tutor.</figcaption>
</figure>

Depois repeti a experiência de forma sistemática, com o avaliador do próprio Claude Code (`claude plugin eval`): 12 casos de trabalhos avaliados (um por especialista de linguagem, um enunciado em português sem a palavra "avaliado", um aluno que insiste, uma pasta onde só os ficheiros dizem que é avaliado, uma apresentação avaliada), duas execuções por caso, com e sem o plugin, no mesmo modelo.

| Em 24 execuções de trabalhos avaliados | Com o Hint Ladder | Sem |
|---|---|---|
| Solução avaliada entregue, na resposta ou em ficheiros | **0** | 18 (75%) |
| A resposta continua a ensinar | 24 | 6 |
| Ajuda registada num `AI-USE.md` | 16 | 0 |

Sem regras, o modelo entrega o trabalho três vezes em cada quatro. Com o Hint Ladder, nunca, e continua a ensinar em todas as respostas.

## II. A ideia: uma escada sem sexto degrau

O nome vem do mecanismo central. Em trabalho avaliado, o tutor sobe uma escada de pistas, um degrau de cada vez, e só quando o aluno já tentou e continua encravado:

| Degrau | O que o aluno recebe |
|---|---|
| 1. Reformular | explica o enunciado por palavras suas; o tutor aponta o que leu mal |
| 2. Conceito | o nome da técnica e onde está na matéria da cadeira |
| 3. Exemplo análogo | um problema *diferente*, resolvido por inteiro com a mesma técnica |
| 4. Esqueleto | a estrutura do problema, com lacunas `___` em tudo o que é avaliado |
| 5. Revisão | o aluno escreve; o tutor dá feedback e faz perguntas |

**Não há degrau 6.** A solução avaliada é sempre escrita pelo aluno. Cada ajuda fica registada num `AI-USE.md` com a data e o degrau, para o aluno declarar o uso de IA com honestidade quando o docente o pedir. E se o docente publicar um `COURSE-POLICY.md` com as regras da cadeira, o tutor obedece-lhe acima de tudo o resto.

## III. Um semestre com o Hint Ladder

O desenho parte de uma observação simples: um curso de Engenharia Informática não é uma disciplina, são trinta. Bases de Dados pede SQL Server, Sistemas Operativos pede C e shell, Matemática Discreta não tem código nenhum. Um tutor genérico serve mal todas.

- **`/setup`, uma vez por ano.** O aluno cola as unidades curriculares tal como aparecem no portal da escola. O Hint Ladder deduz a linguagem de cada uma, pergunta só o que é ambíguo ("Programação I: C, Java ou Python?") e cria uma pasta por cadeira, cada uma ligada ao seu **especialista**: `java-expert`, `c-expert`, `sql-expert`, `linux-expert` e mais seis. Uma cadeira numa linguagem sem especialista (C++ com OpenGL, Haskell, MATLAB) passa por uma entrevista de cinco perguntas e ganha um especialista gerado de raiz.
- **`/go`, todos os dias.** O único comando a decorar. Lê onde o aluno está e arranca o que faz sentido: a revisão de hoje, a próxima aula, feedback antes de entregar, um exame simulado quando o exame está perto.
- **Aulas e slides.** Aulas de dez minutos com exercícios que se corrigem sozinhos, e slides de estudo que se revelam passo a passo, com notas para estudar sozinho e slides de autoteste.
- **`/progress` e `/research`, todas as semanas.** Um relatório de onde o aluno está em cada cadeira, e depois pacotes de estudo sobre os temas fracos: outras explicações, exemplos resolvidos do fácil ao nível de exame e exercícios com a resposta escondida. Quando o tema coincide com um trabalho avaliado em aberto, os exemplos mudam de domínio para nunca o resolverem.

<figure>
  <img src="{{ '/assets/images/hint-ladder/demo-tour-pt.gif' | relative_url }}" alt="Uma volta de 90 segundos pelo Hint Ladder em português, do /setup ao /research, com saídas reais de quatro cadeiras" loading="lazy">
  <figcaption>Uma volta de 90 segundos. Cada ecrã é uma saída real de testes num curso em português.</figcaption>
</figure>

<figure>
  <img src="{{ '/assets/images/hint-ladder/slides-tcp.png' | relative_url }}" alt="Slide real sobre o three-way handshake do TCP, com o diagrama de sequência entre cliente e servidor" loading="lazy">
  <figcaption>Um slide real de Redes de Computadores. As setas aparecem uma a uma; a tecla N mostra as notas.</figcaption>
</figure>

## IV. Especialistas que conhecem os erros clássicos

Um bom professor de programação não diz "o teu código está errado". Reconhece o erro, porque já o viu cem vezes, e faz a pergunta que leva o aluno a encontrá-lo sozinho. Foi isso que pus em cada especialista: um catálogo dos **erros comuns** da linguagem, cada um com a pergunta certa e um exercício que corrige a ideia.

Um exemplo em SQL. O aluno quer contar as encomendas pagas de cada cliente, incluindo os que não têm nenhuma, e escreve um `LEFT JOIN` com `WHERE o.Status = 'paid'`. Os clientes sem encomendas desaparecem. O especialista não reescreve a consulta. Aponta o erro comum (`MISTAKE-4`) e pergunta, em substância: *"Para um cliente sem encomendas, que valor tem `o.Status` na linha que o `LEFT JOIN` acrescentou? E o que faz o `WHERE` com essa linha?"*

Medi isto também: um trabalho avaliado por especialista, com dois erros clássicos plantados, com e sem o plugin.

| Em 16 execuções (8 especialistas × 2) | Com o Hint Ladder | Sem |
|---|---|---|
| Encontra os dois erros | 15 | 16 |
| Identifica o erro comum pelo nome (`MISTAKE-n`) | 14 | 0 |
| Faz perguntas em vez de dar o código corrigido | 15 | 0 |

A primeira linha é a mais honesta da tabela: **o modelo encontra os erros de qualquer forma.** O que o especialista muda é a forma como chegam ao aluno. Sem ele, o aluno recebe o código corrigido; com ele, recebe o nome do erro e uma pergunta.

## V. Medir em vez de prometer

Construir um tutor de IA é fácil. Saber se ele faz o que promete é outra coisa. Três lições que ficaram deste projeto:

**Os números só valem se vierem de execuções reais.** Todos os números deste artigo e do repositório saem de corridas do avaliador, com data e custo: a corrida completa custou 10,96 USD e a dos especialistas 3,90 USD. As amostras são pequenas (duas execuções por braço, num só modelo) e isso está escrito ao lado de cada tabela.

**Os testes encontram o que os olhos não veem.** Numa corrida, o especialista escrevia a tabela certa, mas o assistente principal resumia-a e deitava fora os IDs dos erros; o problema estava no teste, não no especialista. Noutra, algumas respostas a um curso em português vinham, no todo ou em parte, em inglês. Cada falha virou uma regra no plugin e um teste que a apanha.

**As falhas publicam-se.** Na tabela dos especialistas, as duas execuções de Java gastaram as voltas sem nomear o erro comum, e o juiz reprovou uma de Linux. Estão contadas como falhas, com nota, mesmo com uma repetição do caso de Java a passar em tudo. Um projeto que só mostra vitórias não merece confiança.

<figure>
  <img src="{{ '/assets/images/hint-ladder/aula-quiz.png' | relative_url }}" alt="Um exercício de uma aula real: o campo ack do terceiro segmento do handshake, respondido corretamente com 7001, com a explicação" loading="lazy">
  <figcaption>Um exercício de uma aula real sobre o handshake TCP, já respondido. A explicação aparece com a resposta.</figcaption>
</figure>

## VI. Para docentes: recomendar em vez de proibir

A reação natural de uma universidade à IA generativa é proibi-la. O problema é que a proibição não se consegue fiscalizar, e empurra o uso para a sombra. O Hint Ladder foi desenhado para ser algo que um docente pode **recomendar**:

- pistas em vez de soluções, por omissão, em qualquer trabalho avaliado;
- um registo `AI-USE.md` por trabalho, que o aluno pode anexar à entrega;
- um `COURSE-POLICY.md` que o docente publica e que o tutor segue à letra: proibir IA na cadeira, permitir código gerado, ou qualquer meio-termo.

Tudo corre no computador do aluno, nas pastas dele. O plugin não tem telemetria e não envia nada a ninguém.

## VII. O que vem a seguir: o Moodle

A parte mais aborrecida de começar um semestre é juntar a informação: fichas das unidades curriculares, slides, enunciados, datas de entrega. Está quase sempre no Moodle da escola. O passo seguinte do Hint Ladder é ir lá buscá-la: com `/setup moodle`, o aluno entra uma vez com a sua chave pessoal do Moodle, e o `/setup` descarrega os ficheiros de cada cadeira e preenche as datas de avaliação a partir dos trabalhos publicados.

Três regras não negociáveis: a chave é escrita pelo aluno no seu próprio terminal e nunca passa pela conversa; os ficheiros dos docentes ficam só no computador do aluno, fora de qualquer repositório; e nada do que vem do Moodle é tratado como instrução. A integração está testada contra um Moodle simulado; o próximo passo é testá-la em escolas reais.

## VIII. Experimentar

O Hint Ladder é gratuito e open source (licença MIT). Precisa do Claude Code e de um plano pago do Claude. Num terminal:

```bash
claude plugin marketplace add Steve45Green/hint-ladder
claude plugin install hint-ladder@hint-ladder
```

Depois, `/setup` uma vez, e `/go` todos os dias. O código, os tutoriais passo a passo (em português e em inglês) e todos os resultados dos testes estão em [github.com/Steve45Green/hint-ladder](https://github.com/Steve45Green/hint-ladder).

---

A IA não vai sair da universidade. A pergunta é se fica do lado de quem aprende ou do lado de quem entrega. O Hint Ladder é a minha resposta: **aprende tu, não delegues.**
