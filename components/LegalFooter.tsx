export default function LegalFooter() {
  return (
    <footer className="border-t border-white/15 bg-black px-5 py-8 font-body text-sm text-white/65">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Beauty Nations</p>
        <nav aria-label="Legal information" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="/privacy-policy" className="transition-colors hover:text-gold focus-visible:text-gold">Privacy Policy</a>
          <a href="/terms-and-conditions" className="transition-colors hover:text-gold focus-visible:text-gold">Terms &amp; Conditions</a>
          <a href="mailto:info.lelapantelic@gmail.com" className="transition-colors hover:text-gold focus-visible:text-gold">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
