# Beauty Nations – National Coordinators (originalni posteri)

## Šta je promijenjeno
- Potvrđeni nacionalni koordinatori su prikazani pomoću **cijelih, originalnih Beauty Nations postera** koje je dostavila Lela, bez cropa i dodatnih oznaka preko dizajna.
- Hrvatska / Andreja Dodikova, BiH / Adana Valjevac, Bugarska / Aleksander Finko.
- Umjesto vodoravnog skrolovanja i dupliranja države/zastave/imena, prikazane su tri velike slike u responzivnom gridu: 1 kolona mobilni, 2 tablet, 3 desktop.
- Kartice države bez potvrđenih koordinatora nisu prikazane; ostale su zapisane u data/directors.ts za kasnije.
- Zadržana pretraga države/imena među potvrđenim koordinatorima.
- Klik na poster otvara njegovu originalnu sliku u novoj kartici.
- Ostatak projekta nije mijenjan (uključujući ranije dogovorenu promjenu finala u Srbiju).

## Pokretanje
```bash
npm install
npm run dev
```
Otvori http://localhost:3000 i sekciju **National Coordinators**.

## Provjere
- TypeScript (`tsc --noEmit`) i ESLint su prošli.
- Produkcioni build nije moguće izvršiti u ovom testnom okruženju zbog nedostajućeg Next.js SWC Linux binarnog paketa. Pokrenuti `npm run build` lokalno nakon `npm install`.

## Dalje
Kada Lela pošalje sljedeći poster, kopirati ga u `public/directors/posters/` i u `data/directors.ts` upisati `directorName`, `posterUrl`, `posterHeight` (stvarnu visinu originala u pikselima).

Napomena: prijavna forma iz postojećeg projekta zahtijeva backend prije javnog lansiranja.
