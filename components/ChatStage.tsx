"use client";

import { useEffect, useRef, useState } from "react";
import { conversaAbertura, servicos, site, type Balao, type ServicoId } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import { ChatBubble, Digitando } from "./ChatBubble";
import { useCor } from "./ColorProvider";
import { IconeWhats } from "./MagneticButton";
import { QuickReplies } from "./QuickReplies";
import { useReducedMotion } from "./useReducedMotion";

type Capitulo = { id: ServicoId; baloes: Balao[]; mostrados: number };

/**
 * A CONVERSA — seção pinada: os balões de abertura chegam conforme o scroll;
 * depois a visitante escolhe uma resposta rápida e abre um mini-capítulo.
 */
export function ChatStage() {
  const secao = useRef<HTMLElement>(null);
  const tela = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { cor, escolhida } = useCor();
  const [n, setN] = useState(conversaAbertura.length); // SSR/sem JS: tudo visível
  const [caps, setCaps] = useState<Capitulo[]>([]);
  const [digitando, setDigitando] = useState(false);

  // Progresso do scroll → quantos balões já chegaram
  useEffect(() => {
    if (reduzido) return setN(conversaAbertura.length);
    setN(0);
    const onScroll = () => {
      const el = secao.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total * 0.85)));
      setN(Math.round(p * conversaAbertura.length));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [reduzido]);

  // rolagem do chat acompanha as mensagens
  useEffect(() => {
    const t = tela.current;
    t?.scrollTo({ top: t.scrollHeight, behavior: reduzido ? "auto" : "smooth" });
  }, [n, caps, digitando, reduzido]);

  const abrir = (id: ServicoId) => {
    const s = servicos[id];
    const cap: Capitulo = { id, baloes: [{ de: "voce", texto: s.pedido }, ...s.baloes], mostrados: 1 };
    setCaps((c) => [...c, cap]);
    const idx = caps.length;
    if (reduzido) return setCaps((c) => c.map((x, i) => (i === idx ? { ...x, mostrados: x.baloes.length } : x)));
    let k = 1;
    const prox = () => {
      if (k >= cap.baloes.length) return setDigitando(false);
      setDigitando(true);
      setTimeout(() => {
        k++;
        setDigitando(false);
        setCaps((c) => c.map((x, i) => (i === idx ? { ...x, mostrados: k } : x)));
        setTimeout(prox, 250);
      }, 700);
    };
    setTimeout(prox, 300);
  };

  const proximoDigitando = !reduzido && n > 0 && n < conversaAbertura.length;
  const respondido = new Set(caps.map((c) => c.id));

  return (
    <section ref={secao} id="conversa" aria-labelledby="titulo-conversa" className={`relative bg-ameixa-profundo text-perola ${reduzido ? "" : "h-[260vh]"}`}>
      <div className={`${reduzido ? "" : "sticky top-0 h-[100svh]"} mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[1fr_400px] md:px-10`}>
        <div className="hidden md:block">
          <p className="font-mao text-3xl text-pessego">a conversa</p>
          <h2 id="titulo-conversa" className="elastica mt-2 font-display text-6xl font-extrabold leading-[0.9]">
            Conta pra Ju<br />o que você<br />sonha.
          </h2>
          <p className="mt-6 max-w-sm text-perola/80">
            É assim que a Ju atende: conversando. Rola a página pra ler, toca numa resposta e no fim cai no WhatsApp de verdade.
          </p>
        </div>
        <h2 className="sr-only md:hidden">A conversa com a Ju</h2>

        {/* celular */}
        <div className="mx-auto flex h-[min(78svh,720px)] w-full max-w-[400px] flex-col overflow-hidden rounded-[2.2rem] border-[6px] border-grafite bg-[#F3ECE6] text-grafite shadow-2xl">
          <div className="flex items-center gap-3 bg-ameixa px-4 py-3 text-perola">
            <span className="recolore grid h-10 w-10 place-items-center rounded-full bg-ju font-mao text-xl font-bold text-ju-on" aria-hidden>Ju</span>
            <div className="leading-tight">
              <p className="font-semibold">Ju · {site.marca}</p>
              <p className="text-xs text-perola/75">{digitando || proximoDigitando ? "digitando…" : "online"}</p>
            </div>
          </div>

          <div ref={tela} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversa com a Ju" className="scroll-x flex flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-4">
            {conversaAbertura.map((b, i) => (
              <ChatBubble key={i} b={b} visivel={i < n} />
            ))}
            {proximoDigitando && <Digitando />}

            {n >= conversaAbertura.length && (
              <>
                {caps.map((c, ci) => (
                  <div key={ci} className="flex flex-col gap-2">
                    {c.baloes.slice(0, c.mostrados).map((b, i) => (
                      <ChatBubble key={i} b={b} />
                    ))}
                    {c.mostrados >= c.baloes.length && (
                      <a
                        href={linkWhatsApp(servicos[c.id].mensagem, escolhida ? cor.nome : undefined)}
                        target="_blank"
                        rel="noopener"
                        className="recolore inline-flex items-center gap-2 self-start rounded-full bg-ju px-4 py-2 text-sm font-semibold text-ju-on shadow"
                      >
                        <IconeWhats className="h-4 w-4" /> Chamar a Ju
                      </a>
                    )}
                  </div>
                ))}
                {digitando && <Digitando />}
              </>
            )}
          </div>

          {n >= conversaAbertura.length && <QuickReplies respondido={respondido} onEscolher={abrir} desativado={digitando} />}
        </div>
      </div>

      <noscript>
        <ul className="mx-auto max-w-md px-4 pb-10 text-perola">
          {Object.values(servicos).map((s) => (
            <li key={s.rotulo}><a className="underline" href={linkWhatsApp(s.mensagem)}>{s.rotulo}: {s.pedido}</a></li>
          ))}
        </ul>
      </noscript>
    </section>
  );
}
