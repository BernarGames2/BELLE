import type { Metadata, Viewport } from "next";
import { Albert_Sans, Bricolage_Grotesque, Caveat } from "next/font/google";
import { site } from "@/content/site";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["wdth", "opsz"], display: "swap" });
const texto = Albert_Sans({ subsets: ["latin"], variable: "--font-texto", display: "swap" });
const mao = Caveat({ subsets: ["latin"], variable: "--font-mao", display: "swap" });

const titulo = "Belle Ju Salão de Beleza | Mechas, cores, unhas e sobrancelhas em Uberlândia";
const descricao =
  "Salão da Ju, hair stylist na Santa Mônica, Uberlândia/MG: mechas, cores, brilho, design de unhas e sobrancelhas. Escolha sua cor e fale com a Ju no WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: { title: titulo, description: descricao, locale: "pt_BR", type: "website", siteName: site.nome },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
};

export const viewport: Viewport = { themeColor: "#4A1F4E", width: "device-width", initialScale: 1 };

// Decide antes da pintura: JS ativo, cor salva e se pula o preloader.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var v=localStorage.getItem('belleju:visitou');if(r||v)d.classList.add('sem-preloader');localStorage.setItem('belleju:visitou','1');var c=JSON.parse(localStorage.getItem('belleju:cor')||'null');if(c&&c.t){for(var k in c.t)d.style.setProperty(k,c.t[k]);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${texto.variable} ${mao.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
