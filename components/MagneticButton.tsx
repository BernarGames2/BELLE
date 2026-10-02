"use client";

import { useRef } from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { forca?: number };

/** CTA magnético: puxa levemente em direção ao cursor (só ponteiro fino). */
export function MagneticButton({ forca = 0.3, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * forca;
    const y = (e.clientY - r.top - r.height / 2) * forca;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const soltar = () => ref.current && (ref.current.style.transform = "");
  return (
    <a
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={soltar}
      className={`inline-flex items-center gap-2 rounded-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function IconeWhats({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
