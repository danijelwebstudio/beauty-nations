# Beauty Nations — verzija sa Slovenijom (20.10.2026)

Ovo je ista verzija koja je na posljednjem testu imala jednostavnu hero sekciju, horizontalni slider sa zlatnom trakom, strelice lijevo/desno i placeholder kartice za države koje još nemaju nacionalne koordinatore.

## Novo
- Slovenija je potvrđena: **Antonela Rajkovacic**, Season 2027.
- Njen originalni Beauty Nations poster je sačuvan u `public/directors/posters/slovenia.jpg`.
- Za prikaz je napravljena ujednačena verzija `public/directors/cards/slovenia.jpg` (924 × 1329 px), uz uklanjanje samo praznih crnih margina. Sav važan tekst, logotip, zastava i fotografija su sačuvani.
- Sve četiri potvrđene države su na početku slidera: Hrvatska, BiH, Bugarska, Slovenija.
- Ostatak stranice nije mijenjan.

## Pokretanje
```bash
npm install
npm run dev
```
Otvori `http://localhost:3000` i testiraj National Coordinators te pretragu `Slovenia` / `Antonela`.

Prije objavljivanja na Vercel-u provjeri i:
```bash
npm run lint
npm run build
```

**Napomena:** projekat još zahtijeva povezivanje kontakt forme s funkcionalnim backendom prije zvanične javne objave.
