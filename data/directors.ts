// Phase 1: only country names + codes are available.
// Phase 2 will populate directorName, photoUrl and instagramUrl on each
// entry below — the CountryCard component already knows how to render
// those fields the moment they exist, with zero changes required to
// DirectorsSection or the page layout.

export interface NationalDirector {
  countryName: string;
  // ISO 3166-1 alpha-2 code — used to generate the flag emoji now,
  // and can be reused for a flag image asset in Phase 2.
  countryCode: string;
  directorName?: string;
  photoUrl?: string;
  instagramUrl?: string;
}

export const directors: NationalDirector[] = [
  { countryName: "Serbia", countryCode: "RS" },
  { countryName: "Croatia", countryCode: "HR" },
  { countryName: "Slovenia", countryCode: "SI" },
  { countryName: "Bosnia & Herzegovina", countryCode: "BA" },
  { countryName: "Montenegro", countryCode: "ME" },
  { countryName: "North Macedonia", countryCode: "MK" },
  { countryName: "Greece", countryCode: "GR" },
  { countryName: "Italy", countryCode: "IT" },
  { countryName: "Spain", countryCode: "ES" },
  { countryName: "Portugal", countryCode: "PT" },
  { countryName: "France", countryCode: "FR" },
  { countryName: "Germany", countryCode: "DE" },
  { countryName: "Austria", countryCode: "AT" },
  { countryName: "Hungary", countryCode: "HU" },
  { countryName: "Romania", countryCode: "RO" },
  { countryName: "Bulgaria", countryCode: "BG" },
  { countryName: "Poland", countryCode: "PL" },
  { countryName: "Turkey", countryCode: "TR" },
  { countryName: "United Kingdom", countryCode: "GB" },
  { countryName: "United States", countryCode: "US" },
];
