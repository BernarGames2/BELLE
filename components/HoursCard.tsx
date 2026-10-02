"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { agoraNoSalao, statusSalao, type Status } from "@/lib/hours";

/** Selo calculado em America/Sao_Paulo, atualizado a cada minuto (só no cliente). */
export function OpenNowBadge() {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const f = () => setS(statusSalao());
    f();
    const id = setInterval(f, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!s) return <span className="inline-block h-8" />;
  return (
    <span role="status" className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${s.aberto ? "bg-[#1F7A4D] text-white" : "bg-grafite text-perola"}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${s.aberto ? "animate-pulse bg-white" : "bg-pessego"}`} />
      {s.texto.toUpperCase()}
    </span>
  );
}

export function HoursCard() {
  const [hoje, setHoje] = useState<number | null>(null);
  useEffect(() => setHoje(agoraNoSalao().dia), []);
  const ordem = [2, 3, 4, 5, 6, 0, 1];
  return (
    <div className="organica-2 recolore bg-ju px-12 py-14 text-ju-on shadow-xl md:px-16 md:py-16" style={{ animationDuration: "14s" }}>
      <p className="font-mao text-2xl">horários</p>
      <div className="mt-2"><OpenNowBadge /></div>
      <dl className="mt-6 space-y-1.5">
        {ordem.map((d) => {
          const h = site.horarios[d];
          return (
            <div key={d} style={{ borderColor: "color-mix(in srgb, currentColor 25%, transparent)" }} className={`flex justify-between gap-6 border-b pb-1.5 ${hoje === d ? "font-bold" : ""}`}>
              <dt>{h.nome}{hoje === d ? " (hoje)" : ""}</dt>
              <dd>{h.abre ? `${Number(h.abre.slice(0, 2))}h – ${Number(h.fecha!.slice(0, 2))}h` : "Fechado"}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
