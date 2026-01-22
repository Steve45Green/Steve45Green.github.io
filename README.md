# Steve45Green.github.io
<p class="typing-effect">A carregar sistema... Documentação iniciada.</p>

<style>
/* Isto cria o efeito de máquina de escrever */
.typing-effect {
  overflow: hidden; /* Garante que o texto não aparece todo logo */
  border-right: .15em solid #00ff00; /* O cursor a piscar */
  white-space: nowrap; /* Mantém o texto numa linha */
  margin: 0 auto; 
  letter-spacing: .15em;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
  color: #00ff00;
  font-family: monospace;
  font-size: 1.2em;
  max-width: fit-content;
}

/* A magia da animação */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #00ff00; }
}
</style>
