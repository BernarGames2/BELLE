import { site } from "../content/site.ts";

export function linkWhatsApp(mensagem: string, corNome?: string) {
  const texto = corNome ? `${mensagem}\n(minha cor: ${corNome})` : mensagem;
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(texto)}`;
}
