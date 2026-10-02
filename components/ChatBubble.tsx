import type { Balao } from "@/content/site";

export function ChatBubble({ b, visivel = true }: { b: Balao; visivel?: boolean }) {
  const daJu = b.de === "ju";
  const base = `max-w-[82%] transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${daJu ? "self-start origin-bottom-left" : "self-end origin-bottom-right"} ${visivel ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-3"}`;
  const oculto = visivel ? {} : { "data-oculto": "" };

  if ("foto" in b) {
    return (
      <div className={base} {...oculto}>
        <div role="img" aria-label={`Foto: ${b.foto} — FOTO A CONFIRMAR`} className="foto-a-confirmar grid aspect-[4/5] w-48 place-items-center rounded-2xl rounded-bl-md p-3 text-center text-xs font-semibold text-grafite shadow-sm">
          <span className="rounded bg-perola/90 px-2 py-1">{b.foto}<br />FOTO A CONFIRMAR</span>
        </div>
      </div>
    );
  }
  if ("audio" in b) {
    return (
      <div className={`${base} flex items-center gap-3 rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm`} {...oculto}>
        <span className="recolore grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ju text-ju-on" aria-hidden>▶</span>
        <span className="flex h-6 items-center gap-[3px]" aria-hidden>
          {[4, 10, 16, 8, 20, 12, 6, 14, 18, 9, 5, 12, 16, 7, 11, 4].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-giz/60" style={{ height: h }} />
          ))}
        </span>
        <span className="text-xs text-giz">{b.audio}</span>
        <span className="sr-only">Áudio ilustrativo da Ju (sem som)</span>
      </div>
    );
  }
  if ("figurinha" in b) {
    return (
      <div className={`${base} text-6xl`} aria-label="Figurinha de brilho" role="img" {...oculto}>
        <span aria-hidden className="inline-block -rotate-6 drop-shadow">{b.figurinha}</span>
      </div>
    );
  }
  return (
    <p
      className={`${base} rounded-2xl px-4 py-2.5 text-[15px] leading-snug shadow-sm ${
        daJu ? "rounded-bl-md bg-white text-grafite" : "recolore rounded-br-md bg-ju text-ju-on"
      } ${b.confirmar ? "border-2 border-dashed border-giz/50" : ""}`}
      {...oculto}
    >
      <span className="sr-only">{daJu ? "Ju: " : "Você: "}</span>
      {b.texto}
    </p>
  );
}

export function Digitando({ quem = "Ju" }: { quem?: string }) {
  return (
    <div className="flex items-center gap-2 self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
      <span className="digitando flex gap-1" aria-hidden><span /><span /><span /></span>
      <span className="sr-only">{quem} está digitando…</span>
    </div>
  );
}
