import { site } from "@/content/site";
import { HoursCard } from "./HoursCard";
import { MiniScheduler } from "./MiniScheduler";

const q = encodeURIComponent(`${site.nome}, ${site.endereco.linha}`);

export function VemProSalao() {
  return (
    <section id="salao" aria-labelledby="titulo-salao" className="px-4 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-mao text-3xl text-ameixa">bora?</p>
        <h2 id="titulo-salao" className="elastica font-display text-6xl font-extrabold leading-[0.9] text-grafite md:text-8xl">Vem pro salão.</h2>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-10">
            <HoursCard />
            <div>
              <div className="organica overflow-hidden shadow-lg" style={{ animationDuration: "16s" }}>
                <iframe
                  title={`Mapa: ${site.endereco.linha}`}
                  src={`https://www.google.com/maps?q=${q}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-square w-full border-0 [filter:saturate(.6)_sepia(.15)_contrast(1.05)]"
                />
              </div>
              <address className="mt-5 not-italic text-grafite">
                <strong className="font-display text-xl">{site.endereco.rua}</strong>
                <br />{site.endereco.bairro} – {site.endereco.cidade}/{site.endereco.uf} · CEP {site.endereco.cep}
              </address>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                <a className="rounded-full border-2 border-grafite px-4 py-2" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener">Como chegar (Maps)</a>
                <a className="rounded-full border-2 border-grafite px-4 py-2" href={`https://waze.com/ul?q=${q}&navigate=yes`} target="_blank" rel="noopener">Waze</a>
                <a className="rounded-full border-2 border-grafite px-4 py-2" href={`https://wa.me/${site.whatsapp.numero}`} target="_blank" rel="noopener">WhatsApp {site.whatsapp.exibicao}</a>
                <a className="rounded-full border-2 border-grafite px-4 py-2" href={site.instagram.url} target="_blank" rel="noopener">Instagram</a>
              </div>
            </div>
          </div>
          <div className="md:sticky md:top-8 md:self-start">
            <MiniScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}
