# Beauty Nations — finalni profili koordinatora (20.10.2026.)

## Urađeno u ovoj verziji

- Dodana sva tri nacionalna koordinatora iz originalnih WhatsApp postera za sezonu **2027**:
  - **Bosnia & Herzegovina:** Adana Valjevac (BA)
  - **Croatia:** Andreja Dodikova (HR)
  - **Bulgaria:** Aleksander Finko (BG)
- Zamijenjene privremene slike iz screenshota kvalitetnijim, optimizovanim WebP portretima u `public/directors/`.
- Originalni promotivni posteri pohranjeni su u `public/directors/posters/` radi lakše buduće upotrebe.
- Sva tri koordinatora pojavljuju se prije zemalja koje još nemaju profile, a pretraga radi po imenu i državi.
- U hero sekciji ostaje ranije dogovorena izmjena **2027 SERBIA** umjesto **2027 SWITZERLAND**.
- Sačuvane su SEO i analitičke korekcije iz prethodne verzije (`NEXT_PUBLIC_SITE_URL` i `NEXT_PUBLIC_GA_ID`).

## Važno prije objave

1. Nova fotografija Lele još nije dostavljena; stara slika osnivačice ostaje.
2. Kontakt forma trenutno ne šalje podatke, nego poziva `preventDefault()` — potrebno je spojiti backend/email prije produkcije.
3. Domen `beauty-nations.com` još nije potvrđeno kupljen / povezan. Kada se poveže, podesiti `NEXT_PUBLIC_SITE_URL=https://beauty-nations.com`.
4. Kontakt email `info@beautynations.world` treba zamijeniti kada nova poslovna adresa bude aktivirana.
5. Potvrditi finalne detalje događaja (godinu 2027 i lokaciju Srbija) prije javnog lansiranja.
6. Projekt nije automatski objavljen na Vercel. Za objavu je potrebno ažurirati odgovarajući Git repozitorijum ili Vercel deploy.

## Pokretanje

ZIP sadrži **izvorni kod** bez `node_modules`, `.next` i `.git`.

```bash
npm ci
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## Provjere izvršene 20.10.2026.

- ESLint: 0 grešaka, 3 postojeća upozorenja za `<img>` elemente zastava/logotipa.
- TypeScript `tsc --noEmit`: prolazi bez grešaka.
- Produkcioni `next build`: **nije uspješno izvršen u ovom okruženju** jer nedostaje Next SWC binarni paket za Linux, a npm registar nije dostupan; potrebno je provjeriti na lokalnom računaru / CI prije objave.
