# Ispravka Founder fotografije (26.10.2026)

Originalna fotografija je skoro kvadratna (1320 x 1322), ali je u prethodnoj verziji bila u uspravnom 3:4 okviru uz `object-cover`. To je dodatno odsijecalo bočne dijelove kadra.

U `components/FounderSection.tsx` izmijenjeno je:
- omjer `aspect-[3/4]` u `aspect-square`
- `object-cover` u `object-contain`
- širina fotografije i centriranje prilagođeni su desktopu i mobilnom prikazu.

Ništa drugo nije promijenjeno. Originalne fotografije, slider koordinatora, Instagram i lokacija finala ZAGREB ostaju isti.

Test: `npm install`, `npm run build`, `npm run dev`; nakon provjere `npx vercel --prod` u **postojećem povezanom projektu**. Sačuvaj postojeću `.vercel` direktoriju i `.env.local` ako kopiraš u postojeći folder.
