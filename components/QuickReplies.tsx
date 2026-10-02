"use client";

import { servicos, type ServicoId } from "@/content/site";

export function QuickReplies({ respondido, onEscolher, desativado }: { respondido: Set<ServicoId>; onEscolher: (id: ServicoId) => void; desativado?: boolean }) {
  return (
    <div className="border-t border-grafite/10 bg-white/70 px-3 py-3">
      <p id="qr-titulo" className="mb-2 text-xs text-giz">Responda pra Ju:</p>
      <div role="group" aria-labelledby="qr-titulo" className="flex flex-wrap gap-2">
        {(Object.keys(servicos) as ServicoId[]).map((id) => (
          <button
            key={id}
            disabled={desativado || respondido.has(id)}
            onClick={() => onEscolher(id)}
            className="recolore rounded-full border-2 border-ju-ink px-3 py-1.5 text-xs font-bold tracking-wide text-ju-ink transition hover:bg-ju hover:text-ju-on disabled:opacity-40"
          >
            {servicos[id].rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}
