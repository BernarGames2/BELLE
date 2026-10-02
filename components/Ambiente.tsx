"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { linkWhatsApp } from "@/lib/whatsapp";
import { useCor } from "./ColorProvider";
import { IconeWhats } from "./MagneticButton";

/** Lenis + ScrollTrigger, cursor-gota, títulos elásticos ao entrar e botão fixo no mobile. */
export function Ambiente() {
  const gota = useRef<HTMLDivElement>(null);
  const { cor, escolhida } = useCor();
  const [mostrarFixo, setMostrarFixo] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // títulos: abrem o eixo de largura ao entrar
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.remove("elastica-in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -20% 0px" }
    );
    document.querySelectorAll("h2.elastica, h3.elastica").forEach((el) => {
      if (reduzido) return;
      el.classList.add("elastica-in");
      io.observe(el);
    });

    const fixo = () => setMostrarFixo(scrollY > innerHeight * 0.9);
    addEventListener("scroll", fixo, { passive: true });

    let lenis: Lenis | undefined;
    if (!reduzido) {
      lenis = new Lenis({ lerp: 0.12 });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // cursor em gota (só mouse)
    const g = gota.current!;
    const fino = matchMedia("(pointer: fine)").matches && !reduzido;
    const mover = (e: PointerEvent) => {
      g.style.opacity = "1";
      g.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    if (fino) addEventListener("pointermove", mover, { passive: true });

    return () => {
      io.disconnect();
      lenis?.destroy();
      removeEventListener("scroll", fixo);
      removeEventListener("pointermove", mover);
    };
  }, []);

  return (
    <>
      <div ref={gota} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] opacity-0 mix-blend-multiply transition-opacity" style={{ willChange: "transform" }}>
        <svg viewBox="0 0 20 26" className="-ml-2 -mt-1 h-6 w-5">
          <path d="M10 1S2 11 2 16.5a8 8 0 0 0 16 0C18 11 10 1 10 1Z" className="recolore" style={{ fill: "var(--cor-ju)" }} opacity=".8" />
        </svg>
      </div>
      <a
        href={linkWhatsApp("Oi, Ju! Vim pelo site.", escolhida ? cor.nome : undefined)}
        target="_blank"
        rel="noopener"
        tabIndex={mostrarFixo ? 0 : -1}
        aria-hidden={!mostrarFixo}
        className={`recolore fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-2 rounded-full bg-ju py-4 font-bold text-ju-on shadow-2xl transition-all duration-500 md:hidden ${mostrarFixo ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      >
        <IconeWhats /> Falar com a Ju
      </a>
    </>
  );
}
