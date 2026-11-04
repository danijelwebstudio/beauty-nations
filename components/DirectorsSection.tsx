"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { directors } from "@/data/directors";
import CountryCard from "./CountryCard";

export default function DirectorsSection() {
  const [query, setQuery] = useState("");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const railRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    // Confirmed coordinators first; remaining country cards are intentionally
    // placeholders, not claims that those coordinators have signed.
    const sorted = [...directors].sort((a, b) =>
      Number(Boolean(b.posterUrl)) - Number(Boolean(a.posterUrl))
    );
    const q = query.trim().toLocaleLowerCase();
    return q
      ? sorted.filter((d) =>
          `${d.countryName} ${d.directorName ?? ""}`
            .toLocaleLowerCase()
            .includes(q)
        )
      : sorted;
  }, [query]);

  const updateScrollButtons = () => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    updateScrollButtons();
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered]);

  const scrollByCard = (direction: number) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardWidth = first?.getBoundingClientRect().width ?? 300;
    el.scrollBy({ left: direction * (cardWidth + (window.innerWidth < 768 ? 16 : 24)), behavior: "smooth" });
  };

  return (
    <section id="directors" className="relative bg-black py-14 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold"
        >
          Representing The World
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center font-display text-4xl uppercase text-white md:text-5xl"
        >
          NATIONAL COORDINATORS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-2xl text-center font-body text-sm text-white/70 md:text-base"
        >
          Meet the official national coordinators for Season 2027.
          More countries will be announced as agreements are finalized.
        </motion.p>

        <div className="mx-auto mb-8 max-w-md">
          <div className="flex items-center gap-3 border-b border-gold/40 px-2 py-3 transition-colors focus-within:border-gold">
            <Search size={18} className="text-gold/70" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country or name..."
              className="w-full bg-transparent font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
              aria-label="Search national coordinators by country or name"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center font-body text-white/50" role="status">
            No country found for this search.
          </p>
        ) : (
          <>
            <div className="mb-3 flex justify-end gap-2">
              <button
                type="button"
                aria-label="Previous national coordinators"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next national coordinators"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                className="flex h-9 w-9 items-center justify-center border border-gold/30 text-gold transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div
              ref={railRef}
              onScroll={updateScrollButtons}
              className="gold-scrollbar flex snap-x snap-mandatory items-start gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-6"
              role="region"
              aria-label="Scrollable national coordinators"
              tabIndex={0}
            >
              {filtered.map((director) => (
                <div
                  key={director.countryCode}
                  className="w-[64vw] max-w-[280px] shrink-0 snap-start sm:w-[40vw] lg:w-[290px]"
                >
                  <CountryCard {...director} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
