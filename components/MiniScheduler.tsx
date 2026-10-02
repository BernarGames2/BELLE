"use client";

import { useRef, useState } from "react";
import { agendador } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import { useCor } from "./ColorProvider";
import { IconeWhats } from "./MagneticButton";

const DIAS = ["Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/** Mini-agendador de 3 toques → link wa.me com mensagem pronta (sem backend). */
export function MiniScheduler() {
  const { cor, escolhida } = useCor();
  const [servico, setServico] = useState<string>();
  const [dia, setDia] = useState<string>();
  const [periodo, setPeriodo] = useState<string>();
  const [nome, setNome] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);

  const pronto = servico && dia && periodo && nome.trim();
  const msg = `Oi, Ju! Sou ${nome.trim()}. Queria agendar: ${servico}, ${dia?.toLowerCase()} de ${periodo?.toLowerCase()}. Tem horário?`;
  const href = pronto ? linkWhatsApp(msg, escolhida ? cor.nome : undefined) : undefined;

  const confete = () => {
    navigator.vibrate?.(20);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const cores = [cor.hex, "#FFB98E", "#4A1F4E"];
    const ps = Array.from({ length: 70 }, () => ({
      x: c.width / 2, y: c.height * 0.7, vx: (Math.random() - 0.5) * 9, vy: -Math.random() * 10 - 4,
      r: Math.random() * 5 + 3, c: cores[(Math.random() * 3) | 0], a: Math.random() * 6,
    }));
    let f = 0;
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of ps) {
        p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.a += 0.2;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.6, p.a, 0, Math.PI * 2);
        ctx.fill();
      }
      if (++f < 90) requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, c.width, c.height);
    };
    loop();
  };

  return (
    <form className="relative rounded-[2rem] bg-white p-6 shadow-xl md:p-8" onSubmit={(e) => e.preventDefault()} aria-labelledby="titulo-agendar">
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <h3 id="titulo-agendar" className="font-display text-3xl font-extrabold text-grafite">Marca com a Ju em 3 toques</h3>

      <Passo n={1} titulo="O que você quer?">
        {agendador.servicos.map((s) => <Chip key={s} ativo={servico === s} onClick={() => setServico(s)}>{s}</Chip>)}
      </Passo>
      <Passo n={2} titulo="Que dia e período?">
        {DIAS.map((d) => <Chip key={d} ativo={dia === d} onClick={() => setDia(d)}>{d}</Chip>)}
        <span className="basis-full" />
        {agendador.periodos.map((p) => <Chip key={p} ativo={periodo === p} onClick={() => setPeriodo(p)}>{p}</Chip>)}
      </Passo>
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-grafite"><span className="recolore mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-ju text-xs text-ju-on">3</span>Seu nome</legend>
        <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" aria-label="Seu nome" placeholder="Como a Ju te chama?" className="mt-2 w-full rounded-xl border-2 border-grafite/15 bg-perola px-4 py-3 text-grafite outline-none focus:border-ameixa" />
      </fieldset>

      <a
        href={href}
        aria-disabled={!pronto}
        onClick={(e) => (pronto ? confete() : e.preventDefault())}
        target="_blank"
        rel="noopener"
        className={`recolore mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-bold transition ${pronto ? "bg-ju text-ju-on" : "cursor-not-allowed bg-grafite/10 text-giz"}`}
      >
        <IconeWhats /> {pronto ? "Mandar pra Ju no WhatsApp" : "Completa os 3 passos"}
      </a>
      <p className="mt-3 text-center text-xs text-giz">A Ju confirma o horário pelo WhatsApp. Nada é salvo aqui.</p>
    </form>
  );
}

function Passo({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-semibold text-grafite"><span className="recolore mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-ju text-xs text-ju-on">{n}</span>{titulo}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={ativo} onClick={onClick} className={`recolore rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition ${ativo ? "border-ju bg-ju text-ju-on" : "border-grafite/15 text-grafite hover:border-ju-ink"}`}>
      {children}
    </button>
  );
}
