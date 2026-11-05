# BEAUTY NATIONS – ažuriranje 26.10.2026

Ovo je kompletan Next.js projekat baziran na posljednjoj verziji sa horizontalnim sliderom koji je Danijel objavio na Vercelu. Stari izgled hero sekcije i slidera sa zlatnom trakom je sačuvan.

## Izmjene

- **Finale:** `2027 SERBIA` promijenjeno u `2027 ZAGREB` u hero statistici (bez promjene dizajna).
- **Nacionalni koordinatori:** dodat originalni poster **Switzerland – Lela Pantelic (Season 2027)** u slider i optimizovana kartica istog odnosa stranica kao postojeći posteri. Originalni poster otvara se klikom.
- **Founder:** postavljena Lelina nova fotografija u sekciju biografije; `grayscale` CSS filter čini je crno-bijelom. Originalna fotografija kao fajl zadržava boje, što omogućuje laku kasniju promjenu.
- **Instagram dugmad:** dodata ispod kartica za Croatia, Bosnia & Herzegovina, Slovenia i Switzerland. Svako vodi na link koji je Lela poslala. Bulgaria nema link jer nije poslat.
- **Ostalo:** postojeće prazne kartice, slider, zlatna traka, pretraga i dizajn ostaju isti.

## Test i objava

1. Raspakuj ZIP i otvori folder `beauty-nation-2` u VS Code.
2. Pokreni `npm install`, zatim `npm run dev`; pregledaj `http://localhost:3000`.
3. Pokreni `npm run build`.
4. Ako si raspakovao novi folder, ponovo poveži POSTOJEĆI Vercel projekat sa `npx vercel link` (izaberi `danijel-web-studio/beauty-nations`). Ako si zamijenio fajlove u već povezanom folderu, povezivanje obično ostaje.
5. Probni deployment: `npx vercel`. Po potvrdi, produkcija: `npx vercel --prod`.

**Napomena:** prije zamjene lokalnog foldera napravi sigurnosnu kopiju `.env.local`, `.vercel` i svih eventualnih vlastitih nesnimljenih promjena. Nemoj kopirati `.env.local` u javni Git repozitorijum.
