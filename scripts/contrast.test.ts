// Teste automatizado: contraste AA nas 12 cores da parede + badge de horário.
import assert from "node:assert/strict";
import { PAREDE, PEROLA, contraste, textoSobre, tintaSobrePerola } from "../lib/colors.ts";
import { statusSalao } from "../lib/hours.ts";

assert.equal(PAREDE.length, 12, "a parede tem 12 cores");
for (const cor of PAREDE) {
  const on = contraste(cor.hex, textoSobre(cor.hex));
  const ink = contraste(tintaSobrePerola(cor.hex), PEROLA);
  assert.ok(on >= 4.5, `${cor.nome}: texto sobre a cor ${on.toFixed(2)} < 4.5`);
  assert.ok(ink >= 4.5, `${cor.nome}: tinta sobre pérola ${ink.toFixed(2)} < 4.5`);
  console.log(`✓ ${cor.nome.padEnd(22)} sobre-cor ${on.toFixed(2)} · tinta ${ink.toFixed(2)}`);
}

// Datas em UTC; Uberlândia = UTC-3.
const casos: [string, boolean, string][] = [
  ["2026-10-06T11:00:00Z", true, "Aberto agora · até as 19h"], // ter 8h
  ["2026-10-06T21:59:00Z", true, "Aberto agora · até as 19h"], // ter 18h59
  ["2026-10-06T22:00:00Z", false, "Fechado · abre amanhã às 8h"], // ter 19h
  ["2026-10-06T10:00:00Z", false, "Fechado · abre hoje às 8h"], // ter 7h
  ["2026-10-10T23:00:00Z", false, "Fechado · abre terça às 8h"], // sáb 20h
  ["2026-10-11T15:00:00Z", false, "Fechado · abre terça às 8h"], // dom
  ["2026-10-12T15:00:00Z", false, "Fechado · abre amanhã às 8h"], // seg
];
for (const [iso, aberto, texto] of casos) {
  const s = statusSalao(new Date(iso));
  assert.equal(s.aberto, aberto, iso);
  assert.equal(s.texto, texto, iso);
}
console.log(`✓ ${casos.length} casos de horário (America/Sao_Paulo)`);
