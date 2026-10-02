"use client";

import { useRef } from "react";
import { useEmVista } from "./useReducedMotion";

/** Assinatura "Ju" desenhada por stroke-dashoffset quando entra na tela. */
export function SignatureStroke({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const v = useEmVista(ref);
  return (
    <svg ref={ref} viewBox="0 0 170 150" className={className} role="img" aria-label="Assinatura da Ju">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" className="recolore" style={{ stroke: "var(--cor-ju-ink)" }}>
        <path className={`traco ${v ? "desenhado" : ""}`} style={{ ["--len" as string]: 90 }} d="M32 22c22-4 44-6 66-4" />
        <path className={`traco ${v ? "desenhado" : ""}`} style={{ ["--len" as string]: 190, transitionDelay: ".35s" }} d="M72 20c2 40 6 80-10 102-12 16-38 12-42-6" />
        <path className={`traco ${v ? "desenhado" : ""}`} style={{ ["--len" as string]: 200, transitionDelay: ".9s" }} d="M100 70c-3 20 0 40 15 42 15 1 22-18 23-42-2 20 0 40 12 42 6 0 10-4 14-10" />
      </g>
    </svg>
  );
}

/** Seta manuscrita da Ju, desenhada ao aparecer. */
export function SetaManuscrita({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const v = useEmVista(ref, "0px");
  return (
    <svg ref={ref} viewBox="0 0 60 50" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path className={`traco ${v ? "desenhado" : ""}`} style={{ ["--len" as string]: 80 }} d="M4 6c18 2 36 12 44 34" />
        <path className={`traco ${v ? "desenhado" : ""}`} style={{ ["--len" as string]: 40, transitionDelay: ".8s" }} d="M36 34l12 8 4-14" />
      </g>
    </svg>
  );
}
