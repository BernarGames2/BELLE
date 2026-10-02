import Link from "next/link";

export const metadata = { title: "Essa cor não existe… | Belle Ju" };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-perola px-4 text-center">
      <div>
        <svg viewBox="0 0 40 52" className="mx-auto h-24 w-20" aria-hidden>
          <path d="M20 2S4 22 4 33a16 16 0 0 0 32 0C36 22 20 2 20 2Z" fill="#F26B5B" />
        </svg>
        <p className="mt-6 font-mao text-3xl text-ameixa">ops…</p>
        <h1 className="font-display text-5xl font-extrabold text-grafite md:text-7xl">Essa cor não existe…</h1>
        <p className="mt-4 text-giz">A página que você procurou não está na parede de esmaltes.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-ameixa px-7 py-4 font-semibold text-perola">Volta pra Ju</Link>
      </div>
    </main>
  );
}
