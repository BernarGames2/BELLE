"use client";

import { useEffect, useState } from "react";

/**
 * Frasco de esmalte vira, a gota cai e se espalha tomando a tela na --cor-ju.
 * 100% CSS (some sozinho mesmo sem JS). Pulado em visita repetida e reduced-motion
 * pela classe .sem-preloader aplicada no <head>.
 */
export function Preloader() {
  const [n, setN] = useState(0);
  const [fora, setFora] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("sem-preloader")) return setFora(true);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1500);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const id = setTimeout(() => setFora(true), 2500);
    return () => (cancelAnimationFrame(raf), clearTimeout(id));
  }, []);
  if (fora) return null;

  return (
    <div id="preloader" aria-hidden className="preloader fixed inset-0 z-[100] grid place-items-center bg-perola">
      <style>{`
        .preloader{animation:pl-sai .5s ease 2s forwards}
        .pl-frasco{transform-origin:50% 80%;animation:pl-vira .6s cubic-bezier(.65,0,.35,1) .1s forwards}
        .pl-gota{opacity:0;animation:pl-cai .5s cubic-bezier(.55,0,1,.45) .65s forwards}
        .pl-mancha{transform:scale(0);animation:pl-espalha .85s cubic-bezier(.16,1,.3,1) 1.12s forwards}
        @keyframes pl-vira{to{transform:rotate(-140deg) translate(8px,10px)}}
        @keyframes pl-cai{0%{opacity:1;transform:translateY(0)}100%{opacity:1;transform:translateY(34vh)}}
        @keyframes pl-espalha{to{transform:scale(1)}}
        @keyframes pl-sai{to{opacity:0;visibility:hidden}}
      `}</style>
      <div className="pl-mancha absolute h-[300vmax] w-[300vmax] rounded-full" style={{ background: "var(--cor-ju)", left: "50%", top: "calc(50% + 30vh)", translate: "-50% -50%" }} />
      <div className="relative flex flex-col items-center">
        <svg className="pl-frasco h-28 w-20" viewBox="0 0 80 112" fill="none">
          <rect x="30" y="0" width="20" height="36" rx="4" fill="#1E1A21" />
          <rect x="26" y="34" width="28" height="8" rx="2" fill="#4A1F4E" />
          <path d="M14 48c0-4 3-6 7-6h38c4 0 7 2 7 6v52c0 7-5 12-12 12H26c-7 0-12-5-12-12V48Z" fill="var(--cor-ju)" />
          <path d="M22 54h8v44h-8z" fill="#fff" opacity=".35" />
        </svg>
        <span className="pl-gota absolute left-[46%] top-24 h-5 w-4 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]" style={{ background: "var(--cor-ju)" }} />
        <p className="mt-10 font-mao text-2xl text-ameixa">
          Ju está chegando… <span className="tabular-nums">{n}%</span>
        </p>
      </div>
    </div>
  );
}
