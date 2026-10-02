"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { COR_PADRAO, PAREDE, tokensDaCor, type CorJu } from "@/lib/colors";
import { useReducedMotion } from "./useReducedMotion";

type Ctx = {
  cor: CorJu;
  escolhida: boolean;
  escolher: (cor: CorJu, origem?: { x: number; y: number }) => void;
};

const CorContext = createContext<Ctx>({ cor: COR_PADRAO, escolhida: false, escolher: () => {} });
export const useCor = () => useContext(CorContext);

const CHAVE = "belleju:cor";

function aplicar(cor: CorJu) {
  const t = tokensDaCor(cor);
  for (const [k, v] of Object.entries(t)) document.documentElement.style.setProperty(k, v);
  return t;
}

/** Guarda a --cor-ju (com texto em contraste automático) e faz a onda de recolorir. */
export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [cor, setCor] = useState<CorJu>(COR_PADRAO);
  const [escolhida, setEscolhida] = useState(false);
  const onda = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();

  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || "null");
      const achada = salvo && PAREDE.find((c) => c.id === salvo.id);
      if (achada) {
        setCor(achada);
        setEscolhida(true);
        aplicar(achada);
      }
    } catch {
      /* armazenamento bloqueado: segue com a cor padrão */
    }
  }, []);

  const escolher = useCallback(
    (nova: CorJu, origem?: { x: number; y: number }) => {
      const fim = () => {
        const t = aplicar(nova);
        setCor(nova);
        setEscolhida(true);
        try {
          localStorage.setItem(CHAVE, JSON.stringify({ id: nova.id, t }));
        } catch {}
      };
      const el = onda.current;
      if (reduzido || !el) return fim();
      const x = origem?.x ?? innerWidth / 2;
      const y = origem?.y ?? innerHeight / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      el.style.background = nova.hex;
      el.style.transition = "none";
      el.style.opacity = "0.9";
      el.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = "clip-path .8s cubic-bezier(.16,1,.3,1), opacity .5s ease .55s";
          el.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
          el.style.opacity = "0";
        })
      );
      setTimeout(fim, 380);
      if ("vibrate" in navigator) navigator.vibrate?.(12);
    },
    [reduzido]
  );

  return (
    <CorContext.Provider value={{ cor, escolhida, escolher }}>
      {children}
      <div ref={onda} aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: 0 }} />
    </CorContext.Provider>
  );
}
