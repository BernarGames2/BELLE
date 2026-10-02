"use client";

import { useState } from "react";

/**
 * Antes & agora — slider com puxador em forma de gota. Ao arrastar, a gota
 * "pinta" o lado de depois. Só com pares reais autorizados (placeholders por ora).
 */
export function DropCompare({ antes, depois, rotulo }: { antes?: string; depois?: string; rotulo: string }) {
  const [v, setV] = useState(50);
  return (
    <figure className="relative">
      <div className="organica relative aspect-[4/5] w-full overflow-hidden bg-white shadow-xl md:aspect-[5/4]">
        <Lado src={antes} legenda="ANTES" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${v}%)` }}>
          <Lado src={depois} legenda="AGORA" pintado />
        </div>
        {/* gota no puxador */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-perola" style={{ left: `${v}%` }}>
          <svg viewBox="0 0 40 52" className="absolute left-1/2 top-1/2 h-14 w-11 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
            <path d="M20 2C20 2 4 22 4 33a16 16 0 0 0 32 0C36 22 20 2 20 2Z" className="recolore" style={{ fill: "var(--cor-ju)" }} stroke="#FFFBF7" strokeWidth="3" />
            <path d="M14 28c-2 4-2 8 0 11" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7" />
          </svg>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label={`Comparar antes e agora: ${rotulo}`}
          aria-valuetext={`${v}% antes`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-giz">{rotulo} · arraste a gota</figcaption>
    </figure>
  );
}

function Lado({ src, legenda, pintado }: { src?: string; legenda: string; pintado?: boolean }) {
  return (
    <div className="absolute inset-0">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={legenda} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className={`flex h-full w-full items-center ${pintado ? "recolore justify-end bg-ju-soft pr-[12%]" : "justify-start bg-[#EDE6E0] pl-[12%]"}`}>
          <span className="rounded bg-perola/90 px-3 py-1 text-center text-xs font-semibold text-grafite">FOTO {legenda}<br />A CONFIRMAR</span>
        </div>
      )}
      <span className={`absolute top-[14%] ${legenda === "ANTES" ? "left-[18%]" : "right-[18%]"} rounded-full bg-grafite px-3 py-1 text-xs font-bold tracking-widest text-perola`}>{legenda}</span>
    </div>
  );
}
