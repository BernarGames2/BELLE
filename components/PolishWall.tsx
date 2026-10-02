"use client";

import { PAREDE } from "@/lib/colors";
import { useCor } from "./ColorProvider";

/** A parede de esmaltes: 12 frascos clicáveis que recolorem o site inteiro. */
export function PolishWall() {
  const { cor, escolher } = useCor();
  return (
    <div role="radiogroup" aria-label="Parede de esmaltes: escolha a cor do site" className="relative">
      <ul className="scroll-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-4 md:mx-0 md:grid md:grid-cols-12 md:overflow-visible md:px-0">
        {PAREDE.map((c, i) => {
          const ativa = c.id === cor.id;
          return (
            <li key={c.id} className="snap-center">
              <button
                role="radio"
                aria-checked={ativa}
                aria-label={c.nome}
                title={c.nome}
                onClick={(e) => escolher(c, e.detail ? { x: e.clientX, y: e.clientY } : undefined)}
                className={`group flex w-16 flex-col items-center gap-2 rounded-2xl p-1 transition-transform duration-500 md:w-full ${ativa ? "-translate-y-2" : "hover:-translate-y-1"}`}
                style={{ transitionDelay: `${i * 10}ms` }}
              >
                <Frasco hex={c.hex} ativa={ativa} />
                <span className={`text-center text-[11px] leading-tight ${ativa ? "font-semibold text-grafite" : "text-giz"}`}>{c.nome}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Frasco({ hex, ativa }: { hex: string; ativa: boolean }) {
  return (
    <svg viewBox="0 0 40 64" className="h-16 w-10 drop-shadow-sm transition-transform duration-500 group-hover:rotate-[-8deg]" aria-hidden>
      <rect x="14" y="0" width="12" height="20" rx="3" fill="#1E1A21" />
      <rect x="12" y="19" width="16" height="5" rx="1.5" fill="#4A1F4E" />
      <path d="M6 30c0-3 2-5 5-5h18c3 0 5 2 5 5v26c0 4-3 8-8 8H14c-5 0-8-4-8-8V30Z" fill={hex} stroke={ativa ? "#1E1A21" : "rgba(30,26,33,.18)"} strokeWidth={ativa ? 2 : 1} />
      <path d="M10 32h4v24h-4z" fill="#fff" opacity=".4" />
    </svg>
  );
}
