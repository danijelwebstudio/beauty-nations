import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="font-heading text-sm tracking-widest text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl uppercase">Page not found</h1>
      <p className="mt-4 font-body text-white/70">This page could not be found.</p>
      <Link href="/" className="mt-8 border border-gold px-6 py-3 font-heading text-sm uppercase text-gold hover:bg-gold/10">Back to Beauty Nations</Link>
    </main>
  );
}
