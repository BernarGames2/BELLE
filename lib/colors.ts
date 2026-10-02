export type CorJu = { id: string; nome: string; hex: string };

/** A parede de esmaltes. Nomes são só de interface — não são produtos. */
export const PAREDE: CorJu[] = [
  { id: "coral", nome: "Coral Fofoca", hex: "#F26B5B" },
  { id: "vinho", nome: "Vinho de Domingo", hex: "#7B1E3A" },
  { id: "nude", nome: "Café com Leite", hex: "#D9A58B" },
  { id: "rosa-chiclete", nome: "Chiclete Tutti-Frutti", hex: "#FF5FA2" },
  { id: "lavanda", nome: "Lavanda Calmaria", hex: "#B79CED" },
  { id: "azul-sereia", nome: "Azul Sereia", hex: "#2E86DE" },
  { id: "turquesa", nome: "Turquesa Piscina", hex: "#18C1B5" },
  { id: "verde-menta", nome: "Menta Gelada", hex: "#7FE0B0" },
  { id: "amarelo-sol", nome: "Amarelo Solzão", hex: "#FFD23F" },
  { id: "laranja-tangerina", nome: "Tangerina no Copo", hex: "#FF8A2A" },
  { id: "preto-gloss", nome: "Pretinho Básico", hex: "#16131A" },
  { id: "branco-perola", nome: "Pérola da Vó", hex: "#F1E9DF" },
];

export const COR_PADRAO = PAREDE[0];
export const PEROLA = "#FFFBF7";
export const GRAFITE = "#1E1A21";
export const BRANCO = "#FFFFFF";

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: number[]): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function luminancia(hex: string): number {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Texto sobre a cor: grafite ou branco, o que tiver mais contraste. */
export function textoSobre(hex: string): string {
  return contraste(hex, GRAFITE) >= contraste(hex, BRANCO) ? GRAFITE : BRANCO;
}

function misturar(a: string, b: string, t: number): string {
  const ca = rgb(a);
  const cb = rgb(b);
  return toHex(ca.map((v, i) => v + (cb[i] - v) * t));
}

/**
 * "Tinta" da cor para usar como texto/traço sobre o fundo pérola:
 * escurece rumo ao ameixa-profundo até passar AA (4,5:1).
 */
export function tintaSobrePerola(hex: string, alvo = 4.5): string {
  for (let t = 0; t <= 1; t += 0.02) {
    const c = misturar(hex, "#2D1230", t);
    if (contraste(c, PEROLA) >= alvo) return c;
  }
  return "#2D1230";
}

export function tokensDaCor(cor: CorJu) {
  return {
    "--cor-ju": cor.hex,
    "--cor-ju-on": textoSobre(cor.hex),
    "--cor-ju-ink": tintaSobrePerola(cor.hex),
    "--cor-ju-soft": misturar(cor.hex, PEROLA, 0.82),
  } as Record<string, string>;
}
