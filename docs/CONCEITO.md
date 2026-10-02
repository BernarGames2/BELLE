# Conceito — "A COR DA JU"

1. **O ofício da Ju é cor** (cabelo, unha, olhar) → a cor é a interface. Uma variável viva `--cor-ju` recolore o site inteiro; a visitante escolhe na **parede de esmaltes**, que existe de verdade no salão.
2. **A Ju é a marca e fala direto com a cliente** ("Oi, gente!") → a narrativa é uma **conversa de WhatsApp**, e todo caminho termina no WhatsApp real (`wa.me/5534996771669`), levando a cor escolhida na mensagem.
3. **Paleta-base vem da logo** (ameixa) + pérola do salão claro + pêssego dos ícones de destaque. Nada de rosa-nude genérico: o rosa só existe se a visitante escolher.
4. **Tipografia**: Bricolage Grotesque (eixos de peso/largura → títulos "elásticos"), Albert Sans no texto, Caveat só como a mão da Ju (setas, "escolhe uma cor!", assinatura).
5. **Sem seções óbvias**: Hero "Oi, gente!" → Conversa (apresentação + serviços como respostas rápidas) → Antes & Agora (gota que pinta) → A gente fala (mural de prints) → Aprenda com a Ju → Vem pro salão (horário ao vivo + agendador de 3 toques).
6. **Formas orgânicas** que respiram no lugar de grids de cards e galeria quadriculada; a faixa de looks corre na horizontal.
7. **Preloader-frasco**: o esmalte vira, a gota cai e a mancha toma a tela — apresenta o motor de cor em 2 segundos e some em visitas repetidas.
8. **Contraste AA automático**: cada cor gera `--cor-ju-on` (grafite ou branco por luminância) e `--cor-ju-ink` (versão escurecida para texto sobre pérola). Testado nas 12 cores (`npm run test:contrast`).
9. **Verdade acima de tudo**: preços, cursos, história, fotos, feedbacks e nota Google ficam "A CONFIRMAR" em `/content/site.ts` até a Ju autorizar.
10. **Mobile-first**: parede em carrossel com snap, chat em tela cheia, botão fixo "Falar com a Ju" — a maioria chega pelo Instagram no celular.
11. **Movimento com respeito**: `prefers-reduced-motion` troca cor instantaneamente, sem pin, blob, Lenis ou confete.
