# Beauty Nations — test formulara BEZ kupovine domena

**Verzija: 4. novembar 2026.** Ovo je kompletan projekat. Nije potreban zakup domena, Google Workspace niti uplata da bi se forme testirale.

## Šta je u projektu

1. **COMPETE** — pitanje takmičara, izbor jedne od 7 predstavljenih država.
2. **BECOME A NATIONAL COORDINATOR** — prijava koordinatora.
3. **BECOME A PARTNER** — poslovni upit brenda.
4. **PRIORITY TICKET NOTIFICATION LIST** — ime, email i država iz koje posjetilac dolazi, uz izričitu saglasnost. **Nema prodaje, naplate, rezervacije ni javno prikazane cijene ulaznica.**

Svaka prijava ima **posebnu oznaku/naslov**: `Beauty Nations — Competitor Inquiry`, `Beauty Nations — National Coordinator Application`, `Beauty Nations — Partner Inquiry` ili `Beauty Nations — Ticket Priority List`.

Server vrši validaciju; greške se jasno prikazuju. Uspjeh znači da je izabrani pružalac usluge **prihvatio** prijavu, ne da možemo garantovati ulazak poruke u Gmail inbox. To provjeri testom.

## A. Najjednostavnije testiranje sada: Formspree, BEZ domena

Formspree je nezavisna usluga koja prima podatke iz formulara i šalje email obavještenje. Prijave se čuvaju i u njihovom korisničkom nalogu; prije javnog puštanja treba obezbijediti odgovarajuću politiku privatnosti i saglasnost organizatora za korišćenje usluge.

1. Otvori **https://formspree.io/** i prijavi se / napravi nalog.
2. Napravi **New Form** i nazovi ga `Beauty Nations — Applications`.
3. U njegovim podešavanjima odaberi **Target email: info.lelapantelic@gmail.com**. Ako ta adresa nije među potvrđenim adresama, idi na **Account → Linked Emails → Add Email** i dodaj je. **Lela mora sama kliknuti potvrdu koja joj stigne na Gmail**. Bez toga ne računaj da će email obavještenja stizati.
4. U ekranu **Integration** kopiraj endpoint koji izgleda ovako: `https://formspree.io/f/abcdefgh`. Potreban ti je **samo ID** `abcdefgh` (ne ovaj primjer!).
5. U korijenu projekta (pored `package.json`) napravi `.env.local` i upiši:

```dotenv
FORMS_PROVIDER=formspree
FORMSPREE_FORM_ID=STVARNI_ID_IZ_FORMSPREE
NEXT_PUBLIC_CONTACT_EMAIL=info.lelapantelic@gmail.com
```

6. **Zaustavi `npm run dev` sa Ctrl+C i ponovo ga pokreni**. `.env.local` se čita pri pokretanju servera.
7. Otvori `http://localhost:3000` i pošalji probnu prijavu sa podacima kao što su `TEST Danijel Web`, `test@example.com` (ili svojim stvarnim testnim emailom). Uradi to za sve četiri vrste. Zatim provjeri **Formspree → Submissions**, te Lelino **Inbox / Spam**.

**Važno:** Prije testiranja s podacima stvarnih ljudi dobij Lelino odobrenje za Formspree i postavite odgovarajući tekst o obradi ličnih podataka. U testu koristi fiktivne podatke.

**Napomena o besplatnom planu:** Formspree Free plan prema javnoj ponudi ima ograničen broj prijava mjesečno (u oktobru 2026. do 50). Ako se limit prekorači, prijave mogu čekati obradu dok se limit ne resetuje ili plan nadogradi. To je dobar izbor za **testiranje**, a produkciono rješenje odlučujemo prije lansiranja.

## B. Kasnije: Resend na verifikovanom domenu

Kod podržava i Resend. U `.env.local` umjesto prethodnih varijabli postavi:

```dotenv
FORMS_PROVIDER=resend
RESEND_API_KEY=re_TVOJ_KLJUC
RESEND_FROM_EMAIL="Beauty Nations <applications@beauty-nations.com>"
APPLICATIONS_TO_EMAIL=info.lelapantelic@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=info.lelapantelic@gmail.com
```

`RESEND_FROM_EMAIL` smije koristiti Beauty Nations domen tek **nakon njegove kupovine i DNS verifikacije u Resendu**. Resendov početni `onboarding@resend.dev` može se koristiti samo za probno slanje **na email vlasnika Resend naloga**, ne direktno na Lelin Gmail (osim ako je ona vlasnik tog naloga).

## C. Postavljanje na Vercel Preview (ako želimo da Lela klikne i testira)

1. Ne mijenjaj glavni `beauty-nations.vercel.app` dok se testira.
2. U **Vercel → beauty-nations → Settings → Environment Variables** dodaj `FORMS_PROVIDER=formspree`, `FORMSPREE_FORM_ID=...`, `NEXT_PUBLIC_CONTACT_EMAIL=info.lelapantelic@gmail.com` za **Preview**. Nemoj slati ključeve u chat i nemoj commitovati `.env.local`.
3. Pokreni `npx vercel` iz postojećeg, već povezanog foldera projekta. Nastaje privremeni preview link.
4. Ako Vercel Deployment Protection traži login, odobri pristup Leli ili koristi dogovoreni način pregleda. Provjeri svaki formular testnim podacima.
5. Kada kasnije budete spremni za produkciju, podesi iste env varijable za Production, verifikuj sva četiri slanja i tek onda `npx vercel --prod` ili deploy u Coolify. Nemoj držati neispravne forme na javnoj stranici.

## D. Testni scenariji

- **Takmičar** — COMPETE → izaberi državu → unesi ime, email i pitanje → šalji → na Gmailu potraži `Beauty Nations — Competitor Inquiry`.
- **Koordinator** — zaseban meni → ispuni iskustvo, poziciju i razlog → očekivani naslov `Beauty Nations — National Coordinator Application`.
- **Partner** — popuni brend, zemlju i interesovanje → naslov `Beauty Nations — Partner Inquiry`.
- **Publika** — ime, email, **država iz koje dolazi**, saglasnost → naslov `Beauty Nations — Ticket Priority List`.
- Testiraj i greške: prazna obavezna polja, nevažeći email, bez saglasnosti kod ulaznica.

## E. Šta nije još gotovo

- Nismo otvorili Formspree ili Resend nalog u tvoje ime, niti imamo ID / API ključ: **slanje nije aktivno dok ih ne uneseš**.
- Nismo izvršili stvarno testno slanje, niti potvrdili prijem na Lelinoj adresi.
- Ne postoji automatsko buduće obavještavanje svih ljudi s liste; to je za sada evidencija prijava uz email obavještenje organizatoru.
- Za javni rad prije lansiranja treba završiti **Privacy Policy**, tekst o obradi podataka (uključujući trećeg pružaoca usluge), način odjave/brisanja, zaštitu od spam zloupotrebe i odluku o čuvanju prijava.
- Nema kartičnih plaćanja i nema rezervacija.

## Kratke komande (Windows / VS Code)

```powershell
npm install
npm run dev
# testiraj http://localhost:3000
# Ctrl+C
npm run build
# Preview tek nakon dodavanja Vercel varijabli
npx vercel
```

**Kopiranje u stari projekat:** ako koristiš ZIP sa samo izmjenama, kopiraj sve fajlove iz ZIP-a u root postojećeg `beauty-nation-2` foldera, uz zamjenu starih fajlova. Nemoj brisati `.env.local` ili `.vercel`.
