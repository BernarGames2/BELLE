import { site } from "@/content/site";

/**
 * LGPD: desligado por padrão. Para ativar, preencher site.analytics
 * (habilitado: true, id) depois de publicar o aviso de privacidade.
 */
export function Analytics() {
  if (!site.analytics.habilitado || !site.analytics.id) return null;
  // Plausible (sem cookies) como sugestão; trocar se a Ju preferir outro.
  return <script defer data-domain={site.analytics.id} src="https://plausible.io/js/script.js" />;
}
