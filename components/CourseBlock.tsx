"use client";

import { cursos } from "@/content/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import { useCor } from "./ColorProvider";
import { MagneticButton } from "./MagneticButton";

/** Aprenda com a Ju — estrutura pronta, conteúdo todo A CONFIRMAR. */
export function CourseBlock() {
  const { cor, escolhida } = useCor();
  return (
    <section id="cursos" aria-labelledby="titulo-cursos" className="bg-grafite px-4 py-24 text-perola md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <p className="font-mao text-3xl text-pessego">quer aprender?</p>
          <h2 id="titulo-cursos" className="elastica font-display text-6xl font-extrabold leading-[0.9] md:text-8xl">
            Aprenda<br />com a <span className="recolore text-ju">Ju.</span>
          </h2>
        </div>
        <ul className="space-y-6">
          {cursos.map((c, i) => (
            <li key={i} className="rounded-3xl border border-perola/15 p-6 md:p-8">
              <h3 className="font-display text-3xl font-bold">{c.titulo}</h3>
              <p className="mt-3 text-perola/75">{c.descricao}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-perola/60">Datas</dt><dd className="font-semibold">{c.datas}</dd></div>
                <div><dt className="text-perola/60">Vagas</dt><dd className="font-semibold">{c.vagas}</dd></div>
              </dl>
              <MagneticButton
                href={linkWhatsApp("Oi, Ju! Quero saber mais sobre os cursos.", escolhida ? cor.nome : undefined)}
                target="_blank"
                rel="noopener"
                className="recolore mt-8 bg-ju px-6 py-3 font-semibold text-ju-on"
              >
                Quero saber mais →
              </MagneticButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
