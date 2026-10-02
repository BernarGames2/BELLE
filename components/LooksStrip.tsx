"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { looks } from "@/content/site";

/** Faixa horizontal pinada de looks em molduras orgânicas. */
export function LooksStrip() {
  const secao = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    gsap.registerPlugin(ScrollTrigger);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const t = trilho.current!;
      const dist = () => t.scrollWidth - innerWidth + 80;
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: secao.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);

  const formas = ["organica", "organica-2"];
  return (
    <div ref={secao} className="overflow-hidden py-16 md:flex md:h-screen md:items-center md:py-0">
      <ul ref={trilho} className="scroll-x flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 md:overflow-visible md:px-10">
        <li className="flex w-[70vw] shrink-0 flex-col justify-center md:w-[32vw]">
          <p className="font-mao text-3xl text-ameixa">os looks</p>
          <h3 className="elastica font-display text-5xl font-extrabold leading-[0.9] text-grafite md:text-7xl">Cor viva,<br />loiro, mecha,<br />unha.</h3>
          <p className="mt-4 text-giz">Fotos do feed entram aqui só com autorização de cada cliente.</p>
        </li>
        {looks.map((l, i) => (
          <li key={l.id} className="w-[70vw] shrink-0 snap-center md:w-[28vw]">
            <div role="img" aria-label={`${l.rotulo} — FOTO A CONFIRMAR`} className={`${formas[i % 2]} foto-a-confirmar recolore grid aspect-[3/4] place-items-center shadow-lg`} style={{ marginTop: i % 2 ? "3rem" : 0 }}>
              <span className="rounded bg-perola/90 px-3 py-1 text-center text-xs font-semibold text-grafite">
                FOTO A CONFIRMAR{"observacao" in l ? <><br />({l.observacao})</> : null}
              </span>
            </div>
            <p className="mt-3 font-display text-xl font-bold text-grafite">{l.rotulo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
