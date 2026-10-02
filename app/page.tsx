import { site } from "@/content/site";
import { Ambiente } from "@/components/Ambiente";
import { ChatStage } from "@/components/ChatStage";
import { ColorProvider } from "@/components/ColorProvider";
import { CourseBlock } from "@/components/CourseBlock";
import { DropCompare } from "@/components/DropCompare";
import { FeedbackWall } from "@/components/FeedbackWall";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LooksStrip } from "@/components/LooksStrip";
import { Preloader } from "@/components/Preloader";
import { VemProSalao } from "@/components/VemProSalao";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon"],
  name: site.nome,
  url: site.url,
  telephone: "+55 34 99677-1669",
  description: site.bio,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "19:00" },
  ],
  sameAs: [site.instagram.url],
  ...(site.google.autorizado && {
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.google.nota, reviewCount: site.google.avaliacoes },
  }),
};

export default function Home() {
  return (
    <ColorProvider>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Preloader />
      <Ambiente />
      <main id="conteudo">
        <Hero />
        <ChatStage />

        <section id="provas" aria-labelledby="titulo-provas">
          <div className="mx-auto max-w-6xl px-4 pt-24 md:px-10">
            <p className="font-mao text-3xl text-ameixa">antes &amp; agora</p>
            <h2 id="titulo-provas" className="elastica font-display text-6xl font-extrabold leading-[0.9] text-grafite md:text-8xl">Arrasta a gota.</h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              <DropCompare rotulo="Mechas — par real autorizado (A CONFIRMAR)" />
              <div className="md:mt-24"><DropCompare rotulo="Unhas — par real autorizado (A CONFIRMAR)" /></div>
            </div>
          </div>
          <LooksStrip />
        </section>

        <FeedbackWall />
        <CourseBlock />
        <VemProSalao />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </ColorProvider>
  );
}
