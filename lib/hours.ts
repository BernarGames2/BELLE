import { site } from "../content/site.ts";

type Agora = { dia: number; minutos: number };

const DIAS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Dia da semana e minutos do dia no fuso do salão. */
export function agoraNoSalao(data = new Date()): Agora {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: site.fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(data);
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? "0";
  return { dia: DIAS[get("weekday")], minutos: Number(get("hour")) * 60 + Number(get("minute")) };
}

const min = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));
const hora = (hhmm: string) => (hhmm.endsWith(":00") ? `${Number(hhmm.slice(0, 2))}h` : hhmm.replace(":", "h"));

export type Status = { aberto: boolean; texto: string };

export function statusSalao(data = new Date()): Status {
  const { dia, minutos } = agoraNoSalao(data);
  const hoje = site.horarios[dia];
  if (hoje.abre && hoje.fecha && minutos >= min(hoje.abre) && minutos < min(hoje.fecha)) {
    return { aberto: true, texto: `Aberto agora · até as ${hora(hoje.fecha)}` };
  }
  if (hoje.abre && minutos < min(hoje.abre)) {
    return { aberto: false, texto: `Fechado · abre hoje às ${hora(hoje.abre)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = site.horarios[(dia + i) % 7];
    if (d.abre) {
      const quando = i === 1 ? "amanhã" : d.nome.toLowerCase();
      return { aberto: false, texto: `Fechado · abre ${quando} às ${hora(d.abre)}` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}
