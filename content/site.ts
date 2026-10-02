/**
 * Todo o conteúdo do site da Belle Ju mora aqui.
 * Regra: nada inventado. O que não foi confirmado com a Ju fica como
 * A_CONFIRMAR e com um TODO apontando a pendência (ver /docs/A-CONFIRMAR.md).
 */

export const A_CONFIRMAR = "A CONFIRMAR";

export const site = {
  nome: "Belle Ju Salão de Beleza",
  marca: "Belle Ju",
  // TODO(dominio): confirmar domínio final (pendência 9).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellejusalao.com.br",
  bio: "Hair stylist. Mechas, cores, brilho e elegância. Design de unhas e sobrancelhas.",
  linhaServicos: "Hair stylist · Unhas · Sobrancelhas · Santa Mônica, Uberlândia",

  instagram: {
    usuario: "bellejusalao",
    url: "https://www.instagram.com/bellejusalao/",
    // Números de out/2026 — editar quando mudar.
    seguidores: "1.933",
    posts: "153",
    dataReferencia: "out/2026",
    // TODO(link-bio): a bio tem "mais 1" link além do WhatsApp (pendência 4).
    linkExtra: A_CONFIRMAR,
  },

  whatsapp: {
    numero: "5534996771669",
    exibicao: "(34) 99677-1669",
  },

  endereco: {
    rua: "Av. Francisco Ribeiro, 154",
    bairro: "Santa Mônica",
    cidade: "Uberlândia",
    uf: "MG",
    cep: "38408-186",
    linha: "Av. Francisco Ribeiro, 154 – Santa Mônica – Uberlândia/MG – CEP 38408-186",
  },

  // Fonte: Google. TODO(horarios): confirmar com a Ju (pendência 10).
  // dia: 0 = domingo … 6 = sábado. null = fechado.
  horarios: [
    { dia: 0, nome: "Domingo", abre: null, fecha: null },
    { dia: 1, nome: "Segunda", abre: null, fecha: null },
    { dia: 2, nome: "Terça", abre: "08:00", fecha: "19:00" },
    { dia: 3, nome: "Quarta", abre: "08:00", fecha: "19:00" },
    { dia: 4, nome: "Quinta", abre: "08:00", fecha: "19:00" },
    { dia: 5, nome: "Sexta", abre: "08:00", fecha: "19:00" },
    { dia: 6, nome: "Sábado", abre: "08:00", fecha: "19:00" },
  ] as const,
  fuso: "America/Sao_Paulo",

  // Nota Google: só aparece se confirmada E autorizada (pendência 7).
  google: {
    nota: 5.0,
    avaliacoes: 132,
    conferidoEm: "2026-10-02",
    // TODO(google): mudar para true somente com autorização da Ju e conferência no dia da entrega.
    autorizado: false as boolean,
  },

  // LGPD: desligado por padrão.
  analytics: { habilitado: false as boolean, id: "" },
} as const;

export type ServicoId = "mechas" | "unhas" | "sobrancelhas" | "cursos";

export type Balao =
  | { de: "ju" | "voce"; texto: string; confirmar?: boolean }
  | { de: "ju"; foto: string }
  | { de: "ju"; audio: string }
  | { de: "ju"; figurinha: string };

/** Abertura da conversa — só fatos confirmados (bio + destaques). */
export const conversaAbertura: Balao[] = [
  { de: "ju", texto: "Oi, gente! 💜" },
  { de: "ju", texto: "Aqui é a Ju, da Belle Ju. Sou hair stylist." },
  { de: "ju", texto: "Mechas, cores, brilho e elegância. E ainda design de unhas e sobrancelhas." },
  { de: "ju", audio: "0:12" },
  // TODO(quem-somos): história da Ju / tempo de salão — pendência (destaque "Quem somos").
  { de: "ju", texto: "Minha história: A CONFIRMAR", confirmar: true },
  { de: "ju", texto: "Fica na Santa Mônica, aqui em Uberlândia." },
  { de: "ju", figurinha: "✨" },
  { de: "ju", texto: "E aí, o que você quer hoje?" },
];

export const servicos: Record<
  ServicoId,
  { rotulo: string; pedido: string; baloes: Balao[]; mensagem: string }
> = {
  mechas: {
    rotulo: "MECHAS & CORES",
    pedido: "Quero mudar o cabelo",
    baloes: [
      { de: "ju", texto: "Ahh, eu amo! Mecha, loiro, cor viva… é comigo mesmo." },
      { de: "ju", foto: "Mecha sendo pintada" },
      { de: "ju", texto: "Me manda uma foto do seu cabelo hoje e uma do que você sonha. A gente conversa e monta junto." },
      // TODO(servicos): lista/preços — pendência 2.
      { de: "ju", texto: "Valores: A CONFIRMAR", confirmar: true },
    ],
    mensagem: "Oi, Ju! Quero mudar o cabelo (mechas/cores).",
  },
  unhas: {
    rotulo: "UNHAS",
    pedido: "Quero fazer as unhas",
    baloes: [
      { de: "ju", texto: "Você viu a parede de esmaltes ali em cima? É de verdade, tá lá no salão!" },
      { de: "ju", foto: "Unhas — antes e depois" },
      { de: "ju", texto: "Design de unhas do jeitinho que você pedir." },
      { de: "ju", texto: "Valores: A CONFIRMAR", confirmar: true },
    ],
    mensagem: "Oi, Ju! Quero fazer as unhas.",
  },
  sobrancelhas: {
    rotulo: "SOBRANCELHAS",
    pedido: "Quero ajeitar a sobrancelha",
    baloes: [
      { de: "ju", texto: "Sobrancelha muda o olhar inteiro, né?" },
      { de: "ju", foto: "Sobrancelha em processo" },
      { de: "ju", texto: "Design de sobrancelhas pensado pro seu rosto." },
      { de: "ju", texto: "Valores: A CONFIRMAR", confirmar: true },
    ],
    mensagem: "Oi, Ju! Quero fazer a sobrancelha.",
  },
  cursos: {
    rotulo: "CURSOS",
    pedido: "Quero um curso",
    baloes: [
      { de: "ju", texto: "Opa, quer aprender comigo? Que demais!" },
      // TODO(cursos): nome, datas, valor, vagas — pendência 3.
      { de: "ju", texto: "Detalhes dos cursos: A CONFIRMAR", confirmar: true },
      { de: "ju", texto: "Desce até \"Aprenda com a Ju\" ou me chama que eu te conto." },
    ],
    mensagem: "Oi, Ju! Quero saber dos cursos.",
  },
};

/** Looks — categorias reais do feed; fotos só com autorização (pendência 5). */
export const looks = [
  { id: "mechas", rotulo: "Mechas" },
  { id: "loiros", rotulo: "Loiros" },
  { id: "fantasia", rotulo: "Cor fantasia" },
  { id: "unhas", rotulo: "Unhas" },
  { id: "sobrancelha", rotulo: "Sobrancelha" },
  { id: "infantil", rotulo: "Cabelo infantil", observacao: "autorização do responsável" },
] as const;

/** Feedbacks — só prints reais autorizados (pendência 6). Vazio = placeholders. */
export const feedbacks: { imagem: string; alt: string }[] = [];

/** Cursos — estrutura pronta, tudo a confirmar (pendência 3). */
export const cursos = [
  {
    titulo: A_CONFIRMAR,
    descricao: A_CONFIRMAR,
    datas: A_CONFIRMAR,
    vagas: A_CONFIRMAR,
  },
];

export const agendador = {
  servicos: ["Mechas & cores", "Unhas", "Sobrancelhas", "Cursos", "Ainda não sei"],
  periodos: ["Manhã", "Tarde"],
};
