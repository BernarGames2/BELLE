"use client";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const f = () => setR(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return r;
}

/** Dispara uma vez quando o elemento entra na tela. */
export function useEmVista<T extends Element>(ref: React.RefObject<T | null>, margem = "0px 0px -15% 0px") {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { rootMargin: margem });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margem]);
  return v;
}
