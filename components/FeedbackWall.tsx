"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { feedbacks, site } from "@/content/site";

const ROT = [-4, 3, -2, 5, -5, 2];

/** Mural de feedbacks reais (prints autorizados). Sem autorização = placeholders. */
export function FeedbackWall() {
  const mural = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      mural.current?.querySelectorAll<HTMLElement>("[data-par]").forEach((el, i) => {
        gsap.to(el, { yPercent: (i % 3) * -12 - 4, ease: "none", scrollTrigger: { trigger: mural.current, scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  const itens = feedbacks.length ? feedbacks : Array.from({ length: 6 }, () => null);

  return (
    <section id="feedbacks" aria-labelledby="titulo-feedbacks" className="recolore bg-ju-soft px-4 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-mao text-3xl text-ameixa">o que elas dizem</p>
        <h2 id="titulo-feedbacks" className="elastica font-display text-6xl font-extrabold leading-[0.9] text-grafite md:text-8xl">A gente fala.</h2>
        {site.google.autorizado && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-grafite shadow">
            ★ {site.google.nota.toFixed(1).replace(".", ",")} no Google · {site.google.avaliacoes} avaliações
            <span className="text-xs font-normal text-giz">(conferido em {site.google.conferidoEm})</span>
          </p>
        )}
        <ul ref={mural} className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {itens.map((f, i) => (
            <li key={i} data-par style={{ rotate: `${ROT[i % ROT.length]}deg` }}>
              {f ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.imagem} alt={f.alt} loading="lazy" className="w-full rounded-2xl shadow-lg" />
              ) : (
                <div className={`relative rounded-2xl p-6 shadow-lg ${i % 2 ? "rounded-br-md bg-white" : "rounded-bl-md bg-[#DCF8C6]"}`}>
                  <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-2 bg-pessego/80" />
                  <p className="font-display text-lg font-bold text-grafite">FEEDBACK A CONFIRMAR</p>
                  <p className="mt-2 text-sm text-giz">Print real de cliente, publicado só com autorização dela.</p>
                  <p className="mt-4 text-right text-xs text-giz">✓✓</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
