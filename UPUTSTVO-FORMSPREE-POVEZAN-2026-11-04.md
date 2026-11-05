# Beauty Nations - FORMULARI POVEZANI (04.11.2026)

Ovaj projekat je zasnovan na posljednjem kompletnom Beauty Nations ZIP-u
`Beauty-Nations-FORME-Test-Bez-Domena-KOMPLET-2026-11-04.zip`.

## Potvrđeni Formspree podaci

- Endpoint: https://formspree.io/f/xqppnpgo
- Form ID: `xqppnpgo`
- Primalac (podešen u Formspree nalogu): `info.lelapantelic@gmail.com`
- `.env.local` je unaprijed podešen za testiranje.
- Nema potrebe za zakupom domena niti Google Workspace za testiranje.

**Pažnja:** .env.local sadrži samo javno poznati Formspree ID, ne API tajnu.
Ne objavljuj druge lozinke ili privatne ključeve u projektu.

## Kako pokrenuti u novom folderu

1. Raspakuj ZIP i otvori **beauty-nation-2** folder u VS Code.
2. Pokreni `npm install`, zatim `npm run dev`.
3. Otvori http://localhost:3000 i pošalji po jednu **testnu prijavu** kroz svaku od četiri forme.
4. U Formspree Dashboard > Submissions provjeri da li su upisane.
5. Lela neka provjeri Gmail inbox/spam i naslove obavještenja.

Naslovi:
- `Beauty Nations — Competitor Inquiry`
- `Beauty Nations — National Coordinator Application`
- `Beauty Nations — Partner Inquiry`
- `Beauty Nations — Ticket Priority List`

Ako Formspree prihvati prijavu, korisnik će dobiti potvrdu. To NIJE garancija
da je email stigao u inbox; obavezno provjerite stvarni prijem.

## Ako kopiraš fajlove u STARI projekat sa Vercel povezivanjem

Sadržaj projekta možeš prekopirati u postojeći folder, ALI: nemoj slijepo
prepisati svoj stari `.env.local` jer u njemu možda imaš dodatne Vercel
podatke (npr. VERCEL_OIDC_TOKEN). Umjesto toga u postojeći `.env.local`
dodaj ili ažuriraj sljedeće redove:

```dotenv
FORMS_PROVIDER=formspree
FORMSPREE_FORM_ID=xqppnpgo
NEXT_PUBLIC_CONTACT_EMAIL=info.lelapantelic@gmail.com
NEXT_PUBLIC_SITE_URL=https://beauty-nations.vercel.app
```

Ne briši `.vercel` folder. Nakon promjene `.env.local` restartuj `npm run dev`.

## Kako da Lela testira ONLINE (prije kupovine domena)

`.env.local` vrijedi samo na tvom računaru. Vercel neće automatski
preuzeti te vrijednosti iz lokalnog fajla. Zato:

1. Vercel Dashboard > projekat **beauty-nations** > Settings > Environment Variables.
2. Za **Preview** dodaj:
   - `FORMS_PROVIDER` = `formspree`
   - `FORMSPREE_FORM_ID` = `xqppnpgo`
   - `NEXT_PUBLIC_CONTACT_EMAIL` = `info.lelapantelic@gmail.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://beauty-nations.vercel.app` (opciono)
3. Napravi novi Preview deployment: `npx vercel`.
4. Omogući Leli pristup previewu ako Vercel Authentication traži prijavu.
5. Zajedno testirajte sve četiri forme i pregledajte i Formspree dashboard i Gmail.

**Ne koristi `npx vercel --prod` dok test ne prođe**, ne bude
pripremljen tekst o privatnosti i dok nije potvrđeno objavljivanje.

## Napomena o privatnosti i obavijestima

Formspree obrađuje i čuva poslate podatke. Za javno prikupljanje stvarnih
prijava potrebno je urediti Privacy Policy, rokove čuvanja i način brisanja.
Za listu ulaznica trenutno se evidentira interesovanje, ali nije
implementirana automatska kampanja za kasniju prodaju ulaznica.

Resend je i dalje podržan kao budući provider u serverskoj API ruti,
ali trenutno je odabran Formspree.
