"use client";

import { useEffect, useRef } from "react";

/**
 * Mancha de cor orgânica (SVG) que respira e segue o mouse/giroscópio.
 * Pausa fora da viewport; em reduced-motion fica parada.
 */
export function LiquidBlob({ className = "" }: { className?: string }) {
  const path = useRef<SVGPathElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = path.current!;
    const w = wrap.current!;
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 8;
    const alvo = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let visivel = true;
    let raf = 0;

    const forma = (t: number) => {
      const pts = Array.from({ length: N }, (_, i) => {
        const a = (i / N) * Math.PI * 2;
        const r = 160 + Math.sin(t * 0.9 + i * 1.7) * 18 + Math.cos(t * 0.6 + i * 2.3) * 14;
        return [200 + Math.cos(a) * r, 200 + Math.sin(a) * r];
      });
      // Catmull-Rom → Bézier fechado
      let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < N; i++) {
        const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
      }
      p.setAttribute("d", d + "Z");
    };
    forma(0);
    if (reduzido) return;

    const loop = (ms: number) => {
      pos.x += (alvo.x - pos.x) * 0.05;
      pos.y += (alvo.y - pos.y) * 0.05;
      w.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      forma(ms / 1000);
      if (visivel) raf = requestAnimationFrame(loop);
    };
    const mouse = (e: PointerEvent) => {
      alvo.x = (e.clientX / innerWidth - 0.5) * 80;
      alvo.y = (e.clientY / innerHeight - 0.5) * 60;
    };
    const giro = (e: DeviceOrientationEvent) => {
      alvo.x = Math.max(-40, Math.min(40, (e.gamma ?? 0) * 1.2));
      alvo.y = Math.max(-30, Math.min(30, ((e.beta ?? 45) - 45) * 1.2));
    };
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visivel) raf = requestAnimationFrame(loop);
    });
    io.observe(w);
    addEventListener("pointermove", mouse, { passive: true });
    addEventListener("deviceorientation", giro, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", mouse);
      removeEventListener("deviceorientation", giro);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className={`pointer-events-none will-change-transform ${className}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="brilho" cx="35%" cy="30%" r="70%">
            <stop offset="0" stopColor="#fff" stopOpacity=".55" />
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path ref={path} className="recolore" style={{ fill: "var(--cor-ju)" }} />
        <ellipse cx="165" cy="150" rx="95" ry="80" fill="url(#brilho)" />
      </svg>
    </div>
  );
}
