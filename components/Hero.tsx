"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/content/site";
import { PAREDE, tintaSobrePerola } from "@/lib/colors";
import { linkWhatsApp } from "@/lib/whatsapp";
import { useCor } from "./ColorProvider";
import { LiquidBlob } from "./LiquidBlob";
import { IconeWhats, MagneticButton } from "./MagneticButton";
import { PolishWall } from "./PolishWall";
import { SetaManuscrita } from "./SignatureStroke";

export function Hero() {
  const { cor, escolhida } = useCor();
  const [i, setI] = useState(0);
  const titulo = useRef<HTMLHeadingElement>(null);

  // "COR" troca de cor e nome em loop até a visitante escolher.
  useEffect(() => {
    if (escolhida || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % PAREDE.length), 1400);
    return () => clearInterval(id);
  }, [escolhida]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const linhas = titulo.current?.querySelectorAll("[data-linha]");
    if (!linhas) return;
    const atraso = document.documentElement.classList.contains("sem-preloader") ? 0.1 : 2.1;
    gsap.fromTo(
      linhas,
      { yPercent: 60, opacity: 0, fontVariationSettings: '"wght" 300, "wdth" 75' },
      { yPercent: 0, opacity: 1, fontVariationSettings: '"wght" 800, "wdth" 100', duration: 1.1, ease: "expo.out", stagger: 0.09, delay: atraso, clearProps: "fontVariationSettings,transform,opacity" }
    );
  }, []);

  const mostrada = escolhida ? cor : PAREDE[i];

  return (
    <section id="topo" aria-labelledby="titulo-hero" className="relative isolate overflow-hidden px-4 pb-16 pt-6 md:px-10">
      <LiquidBlob className="absolute -right-[30vw] -top-[10vw] -z-10 h-[90vw] w-[90vw] opacity-90 md:-right-[8vw] md:-top-[12vw] md:h-[62vw] md:w-[62vw]" />

      <header className="flex items-center justify-between">
        <a href="#topo" className="font-mao text-3xl font-bold text-ameixa">{site.marca}</a>
        <a href={site.instagram.url} className="rounded-full border border-grafite/15 bg-perola/80 px-3 py-1.5 text-sm text-grafite backdrop-blur" rel="noopener" target="_blank">
          @{site.instagram.usuario}
        </a>
      </header>

      <div className="mx-auto mt-10 max-w-6xl md:mt-16">
        <p className="font-mao text-3xl text-ameixa md:text-4xl">Oi, gente!</p>
        <h1 id="titulo-hero" ref={titulo} className="mt-2 font-display text-[15vw] font-extrabold uppercase leading-[0.86] tracking-tight text-grafite md:text-[9.5vw]">
          <span data-linha className="elastica block">Seu cabelo.</span>
          <span data-linha className="elastica block">Suas unhas.</span>
          <span data-linha className="elastica block">
            Sua{" "}
            <span className="recolore" style={{ color: tintaSobrePerola(mostrada.hex) }}>
              cor.
            </span>
          </span>
        </h1>
        <p aria-live="off" className="mt-2 font-mao text-2xl" style={{ color: tintaSobrePerola(mostrada.hex) }}>
          ↳ {mostrada.nome}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href={linkWhatsApp("Oi, Ju! Vim pelo site e quero conversar.", escolhida ? cor.nome : undefined)}
            target="_blank"
            rel="noopener"
            className="recolore bg-ju px-7 py-4 text-lg font-semibold text-ju-on shadow-lg"
          >
            <IconeWhats /> Falar com a Ju
          </MagneticButton>
          <p className="text-sm text-giz">{site.linhaServicos}</p>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute -top-10 left-2 flex items-end gap-1 text-ameixa md:left-auto md:right-6">
            <span className="font-mao text-2xl">escolhe uma cor!</span>
            <SetaManuscrita className="h-10 w-12 rotate-[60deg]" />
          </div>
          <PolishWall />
        </div>
      </div>
    </section>
  );
}
