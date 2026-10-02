import { site } from "@/content/site";
import { SignatureStroke } from "./SignatureStroke";

export function Footer() {
  return (
    <footer className="bg-ameixa-profundo px-4 pb-28 pt-16 text-perola md:px-10 md:pb-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <SignatureStroke className="h-28 w-32" />
          {/* TODO(logo): trocar pelo SVG oficial da logo quando a Ju enviar (pendência 1). */}
          <p className="font-mao text-5xl font-bold">{site.marca}</p>
          <p className="mt-2 max-w-sm text-sm text-perola/70">{site.bio}</p>
        </div>
        <div className="text-sm text-perola/70">
          <p>{site.endereco.linha}</p>
          <p className="mt-1">Ter–Sáb 8h–19h · Dom e Seg fechado</p>
          <p className="mt-1">
            <a className="underline" href={`https://wa.me/${site.whatsapp.numero}`}>{site.whatsapp.exibicao}</a> ·{" "}
            <a className="underline" href={site.instagram.url}>@{site.instagram.usuario}</a>
          </p>
          <p className="mt-6 text-xs text-perola/60">© {new Date().getFullYear()} {site.nome}</p>
        </div>
      </div>
    </footer>
  );
}
