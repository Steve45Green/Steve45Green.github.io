---
layout: post
title: "A Era da Saúde Algorítmica em Portugal"
subtitle: "Regulação, Engenharia e Estratégia para HealthTech em 2026"
date: 2026-01-30
author: Steve Green aka José Ameixa
tags: [HealthTech, AI Act, Portugal, Federated Learning, RGPD, Compliance]
excerpt: "Uma análise crítica dos bloqueios regulatórios, soluções técnicas e estratégias de sobrevivência para startups de IA na saúde em Portugal."
---

A narrativa de que a Inteligência Artificial vai revolucionar a medicina é conhecida. Mas em 2026, quem opera no terreno em Portugal sabe que a realidade mudou. A viabilidade de um projeto de HealthTech já não depende apenas da capacidade computacional — depende da capacidade de navegar um ambiente regulatório cada vez mais exigente.

Este artigo propõe uma análise estruturada: o que a lei exige, porque a implementação é difícil, quais as soluções técnicas disponíveis, e onde essas soluções falham.

---

## I. O Novo Quadro Regulatório

A visão oficial para 2025-2026 é inequívoca: a IA é bem-vinda na saúde, desde que rigorosamente regulada *ex-ante*. Já não operamos apenas sob o RGPD — operamos sob um corpus legislativo ancorado no **AI Act** que classifica a maioria das aplicações de IA médica como tecnologia de **Alto Risco**.

A SPMS (Serviços Partilhados do Ministério da Saúde) estabeleceu a doutrina através de White Papers recentes:

**Conformidade obrigatória** com ISO/IEC 42001 e diretiva NIS2 para integração no ecossistema nacional de saúde.

**Interoperabilidade mandatória** através de HL7 FHIR — já não é opcional, é requisito fundamental para partilha semântica de dados.

**Soberania de dados** sob o Espaço Europeu de Dados de Saúde (EHDS), que impõe regras estritas sobre uso primário e secundário de informação clínica.

---

## II. Os Bloqueios Estruturais

Quando tentamos aplicar este quadro regulatório à realidade operacional, encontramos obstáculos significativos. A literatura oficial reconhece três. A experiência no terreno revela mais.

### O Paradoxo dos Dados

A regulação exige datasets de alta qualidade, representativos e sem enviesamentos. Contudo, obter dados clínicos reais, estruturados e devidamente consentidos é extraordinariamente difícil devido à fragmentação dos sistemas e às exigências de proteção de dados. Cria-se um ciclo vicioso: para provar que o modelo funciona, são necessários dados; para obter dados, é necessário provar que o modelo é seguro.

### A Questão da Responsabilidade Clínica

Se a IA opera como "caixa negra", levanta-se o problema que a literatura académica designa como *custo epistémico da opacidade*. Quando o médico não consegue explicar o raciocínio subjacente a uma recomendação algorítmica, a sua posição torna-se vulnerável. A Ordem dos Médicos reforça que a telemedicina e a IA devem ser instrumentos de apoio à decisão, não mecanismos de substituição.

### Restrições de Comunicação

O Manual de Boas Práticas de Publicidade em Saúde da ERS proíbe terminantemente o uso de superlativos ("o melhor", "pioneiro") ou garantias de resultados sem evidência científica robusta. Isto limita significativamente as estratégias de go-to-market tradicionais.

### A Inércia Institucional

Menos documentado mas igualmente relevante: o SNS opera com ciclos de procurement de 18-24 meses, sistemas legacy que precedem a era digital, e rotatividade de decisores que torna qualquer relação comercial precária. Mesmo com conformidade regulatória total, uma startup pode esgotar o seu runway antes de concretizar uma venda.

### Escassez de Talento Especializado

Portugal tem um número limitado de profissionais que combinam competências em machine learning, terminologias clínicas (SNOMED, ICD-11), requisitos regulatórios (MDR, AI Act), e capacidade de comunicação com stakeholders médicos. Estimativas informais apontam para 50-100 profissionais com este perfil completo.

### Ausência de Modelo de Reembolso

Mesmo que o produto exista, esteja conforme e seja clinicamente validado, permanece a questão: quem paga? O SNS não dispõe de tabela de reembolso para "IA de apoio à decisão clínica". Sem enquadramento económico claro, a adoção institucional é lenta.

---

## III. Soluções Técnicas

A engenharia desenvolveu abordagens para alguns destes problemas. O sucesso depende de uma estratégia que combine conformidade técnica com viabilidade institucional.

### Federated Learning

Esta arquitetura permite colaboração entre instituições sem comprometer a privacidade. Em vez de centralizar dados num servidor, o algoritmo desloca-se até aos dados locais. Cada hospital treina o modelo com os seus próprios dados; apenas os parâmetros matemáticos (pesos) são partilhados e agregados centralmente.

**Evidência de viabilidade:** Projetos europeus como o DataTools4Heart (cardiologia) e frameworks como o FED-EHR demonstram que é possível criar modelos robustos sem centralização de dados sensíveis.

**Implementação conceptual:**

```python
def federated_averaging(local_updates):
    """
    Agregação federada simplificada.
    O servidor central recebe apenas pesos matemáticos,
    nunca dados de pacientes.
    """
    aggregated = []
    for weights in zip(*local_updates):
        aggregated.append(sum(weights) / len(weights))
    return aggregated
```

### Dados Sintéticos

A geração de dados artificiais é validada pela Comissão Europeia através da iniciativa Virtual Human Twins como via para desenvolvimento e teste. Se o processo de geração for estatisticamente irreversível, mitiga significativamente os riscos de privacidade.

**Ferramentas disponíveis:** Synthea (open-source), CTGAN, Gretel.ai, Mostly AI.

### Estratégia B2B

Para contornar as restrições de comunicação da ERS, os players de sucesso focam-se em vendas B2B e métricas de eficiência clínica. Empresas como a Glintt posicionam-se como parceiros tecnológicos; a UpHill foca-se na automação de jornadas de cuidados; a Knok lidera na integração de teleconsulta.

A conformidade regulatória torna-se argumento de venda: um Diretor Clínico compra segurança, não apenas funcionalidade.

---

## IV. Limitações das Soluções

É importante reconhecer que as soluções técnicas propostas têm limitações próprias.

### Limitações do Federated Learning

**Heterogeneidade de dados:** O algoritmo de agregação assume distribuições estatísticas similares entre instituições. Na realidade portuguesa, os perfis epidemiológicos variam significativamente entre um hospital central de Lisboa e um hospital distrital do interior. A agregação simples pode degradar a performance global do modelo.

**Privacidade não absoluta:** Ataques documentados na literatura (membership inference, gradient leakage) demonstram que a partilha de pesos pode, em certas condições, revelar informação sobre os dados originais. Mitigações como Differential Privacy existem, mas introduzem trade-offs de performance.

**Complexidade institucional:** Implementar FL em múltiplos hospitais do SNS requer aprovações de várias Comissões de Ética, acordos jurídicos bilaterais, instalação de infraestrutura local, e definição de governance. Estimativa realista: 18-36 meses para um piloto funcional.

### Limitações dos Dados Sintéticos

**Validação clínica:** Dados sintéticos são úteis para desenvolvimento, mas o regulador exigirá evidência de eficácia em pacientes reais. Não substituem a necessidade de acesso a dados clínicos para validação final.

**Perpetuação de enviesamentos:** Modelos generativos aprendem — e podem amplificar — os vieses presentes nos dados originais. Um dataset predominantemente urbano gerará sintéticos predominantemente urbanos.

**Enquadramento regulatório instável:** O EHDS menciona dados sintéticos como via promissora, mas os critérios técnicos para "anonimização irreversível" ainda não estão consolidados.

### Limitações do B2B no SNS

**Ciclos de venda prolongados:** Do primeiro contacto ao primeiro euro de receita, o ciclo típico no SNS é de 27-60 meses.

**Risco político:** Mudanças de governo ou de direção hospitalar podem reiniciar processos de procurement.

---

## V. Estratégias Alternativas

### Validação no Setor Privado

O artigo focou-se no SNS por ser o maior mercado. Mas para uma startup early-stage, o setor privado oferece vantagens: grupos como CUF ou Luz Saúde têm autonomia de decisão e ciclos de compra mais curtos. Seguradoras como Médis ou Multicare têm incentivos claros para adotar soluções que reduzam custos. Validar no privado e escalar para o público com evidência acumulada pode ser uma trajetória mais sustentável.

### Foco em Interoperabilidade

A geração de dados sintéticos está a tornar-se commodity (Synthea é gratuito). Um diferenciador mais defensável pode ser resolver o problema de interoperabilidade — muitos sistemas hospitalares portugueses ainda operam em HL7 v2 ou formatos proprietários. Quem facilitar a transição para HL7 FHIR terá um moat significativo.

### Proposta de Sandbox Regulatória

Portugal tem experiência com sandboxes regulatórias (Banco de Portugal para fintech). Uma proposta estruturada para um regime equivalente em HealthTech — com supervisão conjunta de CNPD, ERS e SPMS, limites de escala definidos, e saída para conformidade total — poderia acelerar a inovação sem comprometer a proteção dos utentes.

---

## VI. Checklist de Viabilidade

Antes de avançar com um projeto de IA em saúde, considere:

**Dimensão técnica**
- A solução suporta HL7 FHIR?
- Existe estratégia para lidar com heterogeneidade de dados em contexto federado?
- Os dados sintéticos têm plano de validação clínica?
- O modelo oferece explicabilidade mínima (SHAP, attention maps, ou equivalente)?

**Dimensão regulatória**
- A classificação de risco segundo o AI Act está documentada?
- Foi realizada uma DPIA (Data Protection Impact Assessment)?
- O caminho para marcação CE está definido?
- O material de comunicação está conforme com as diretrizes da ERS?

**Dimensão institucional**
- Existe parceiro hospitalar confirmado para piloto?
- A Comissão de Ética relevante foi contactada?
- Está identificado um sponsor interno na instituição-alvo?

**Dimensão de negócio**
- O modelo de reembolso está validado?
- O pipeline está diversificado (não dependente exclusivamente do SNS)?
- O runway é suficiente para um ciclo de venda de 24-36 meses?
- A equipa combina competências técnicas, clínicas e regulatórias?

---

## VII. Conclusão

O período do "Far West" digital na saúde terminou. A era da Saúde Algorítmica Regulada exige competência simultânea em múltiplas dimensões: tecnologia, regulação, modelo de negócio, relações institucionais, e — não menos importante — paciência.

As startups que vão prosperar não serão necessariamente as mais avançadas tecnicamente. Serão as que melhor conseguirem navegar a complexidade do ecossistema, transformando conformidade regulatória em vantagem competitiva e construindo relações institucionais duradouras.

A regulação não é apenas um obstáculo — é também um filtro que elimina concorrentes menos preparados e uma barreira de entrada que protege quem a ultrapassar primeiro.

---

## Referências

### Regulação e Doutrina Oficial

1. SPMS (2025). *O impacto da Regulamentação para a Inteligência Artificial na Saúde Digital em Portugal*. [PDF](https://www.spms.min-saude.pt/wp-content/uploads/2025/03/White-Paper_Inteligencia-Artificial-na-Saude-em-Portugal_-Final2-1.pdf)

2. União Europeia (2024). *AI Act: High-level summary*. [Link](https://artificialintelligenceact.eu/high-level-summary/)

3. ERS. *Manual de Boas Práticas de Publicidade em Saúde*. [PDF](https://www.ers.pt/media/e50by3ag/manual-boas-praticas-publicidade-saude.pdf)

4. Comissão Europeia. *European Health Data Space Regulation*. [Link](https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en)

### Tecnologia

5. SPRY (2025). *AI and Machine Learning in Healthcare: How Federated Learning Enables Collaborative Research Without Compromising Privacy*. [Link](https://www.sprypt.com/blog/ai-machine-learning-healthcare-federated-learning-privacy)

6. European Society of Cardiology. *DataTools4Heart: EU project combining European cardiology data*. [Link](https://www.escardio.org/news/press/press-releases/eu-project-combining-european-cardiology-data-in-different-formats-and-languages/)

7. MDPI (2025). *FED-EHR: A Privacy-Preserving Federated Learning Framework*. [Link](https://www.mdpi.com/2079-9292/14/16/3261)

8. Frontiers in Digital Health (2025). *Synthetic data in medical imaging within the EHDS*. [Link](https://www.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2025.1620270/full)

9. Comissão Europeia. *European Virtual Human Twins Initiative*. [Link](https://digital-strategy.ec.europa.eu/en/policies/virtual-human-twins)

### Responsabilidade e Ética

10. Maastricht University. *The Epistemic Cost of Opacity: How AI Undermines Medical Knowledge*. [Link](https://cris.maastrichtuniversity.nl/en/publications/the-epistemic-cost-of-opacity-how-the-use-of-artificial-intellige/)

11. Franco, J. (2025). *Inteligência Artificial e Responsabilidade Civil no Setor da Saúde*. Universidade Nova de Lisboa. [PDF](https://run.unl.pt/bitstream/10362/189194/1/Franco_Joao_Tese_2025.pdf)

12. Ordem dos Médicos. *Parecer sobre o Exercício da Telemedicina*. [PDF](https://www.omsul.pt/Portals/0/docs/Parecer-Exercicio-da-Telemedicina.pdf)

### Ecossistema e Mercado

13. Tech Funding News. *UpHill: Digital health startup automating care journeys*. [Link](https://techfundingnews.com/startup-in-spotlight-this-digital-health-startup-founded-by-three-doctors-wants-to-automate-care-journeys-scoops-e7m-funding/)

14. Armilar Venture Partners. *Knok raises €4.4M*. [Link](https://www.armilar.com/articles/knok-raises-eu4-4m-co-led-by-armilar)

15. Fons, D. (2025). *Servidor de Terminologias Clínicas Baseado em HL7 FHIR*. Universidade Católica Portuguesa. [PDF](https://repositorio.ucp.pt/server/api/core/bitstreams/a9eb8370-962c-44e9-94f2-3d5087367e0e/content)
