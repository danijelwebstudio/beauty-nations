// Each displayed coordinator uses the original, full-size announcement artwork
// supplied by the client. No cropping, extra labels or unconfirmed profiles.
// Add new posters only after Lela shares the confirmed details and design.
// Instagram links appear only when provided by the client; Bulgaria is pending.

export interface NationalDirector {
  countryName: string;
  countryCode: string;
  directorName?: string;
  posterUrl?: string;
  displayUrl?: string;
  // Original poster height (original poster sizes are maintained in their original files).
  posterHeight?: number;
  instagramUrl?: string;
}

export const directors: NationalDirector[] = [
  {
    countryName: "Serbia",
    countryCode: "RS",
    directorName: "Strahinja Radojkovic",
    posterUrl: "/directors/posters/serbia.jpg",
    displayUrl: "/directors/cards/serbia.jpg",
    posterHeight: 1536,
    instagramUrl: "https://www.instagram.com/beauty_nations_serbia",
  },
  {
    countryName: "Croatia",
    countryCode: "HR",
    directorName: "Andreja Dodikova",
    posterUrl: "/directors/posters/croatia.jpg",
    displayUrl: "/directors/cards/croatia.jpg",
    posterHeight: 1899,
    instagramUrl: "https://www.instagram.com/beautynations.croatia",
  },
  {
    countryName: "Slovenia",
    countryCode: "SI",
    directorName: "Antonela Rajkovacic",
    posterUrl: "/directors/posters/slovenia.jpg",
    displayUrl: "/directors/cards/slovenia.jpg",
    posterHeight: 2013,
    instagramUrl: "https://www.instagram.com/beautynations.slovenia",
  },
  {
    countryName: "Bosnia & Herzegovina",
    countryCode: "BA",
    directorName: "Adana Valjevac",
    posterUrl: "/directors/posters/bosnia-herzegovina.jpg",
    displayUrl: "/directors/cards/bosnia-herzegovina.jpg",
    posterHeight: 1637,
    instagramUrl: "https://www.instagram.com/beautynations.bih",
  },
  { countryName: "Montenegro", countryCode: "ME" },
  {
    countryName: "North Macedonia",
    countryCode: "MK",
    directorName: "Marija Stojanovska",
    posterUrl: "/directors/posters/north-macedonia.jpg",
    displayUrl: "/directors/cards/north-macedonia.webp",
    posterHeight: 1280,
    // Official Season 2027 announcement; no Instagram profile supplied.
  },
  { countryName: "Greece", countryCode: "GR" },
  { countryName: "Italy", countryCode: "IT" },
  { countryName: "Spain", countryCode: "ES" },
  { countryName: "Portugal", countryCode: "PT" },
  { countryName: "France", countryCode: "FR" },
  {
    countryName: "Germany",
    countryCode: "DE",
    directorName: "Ljubica Perica",
    posterUrl: "/directors/posters/germany.jpg",
    displayUrl: "/directors/cards/germany.jpg",
    posterHeight: 1536,
    // Instagram profile not yet provided by the client.
  },
  { countryName: "Austria", countryCode: "AT" },
  { countryName: "Hungary", countryCode: "HU" },
  { countryName: "Romania", countryCode: "RO" },
  {
    countryName: "Bulgaria",
    countryCode: "BG",
    directorName: "Aleksander Finko",
    posterUrl: "/directors/posters/bulgaria.jpg",
    displayUrl: "/directors/cards/bulgaria.jpg",
    posterHeight: 1735,
  },
  {
    countryName: "Switzerland",
    countryCode: "CH",
    directorName: "Lela Pantelic",
    posterUrl: "/directors/posters/switzerland.jpg",
    displayUrl: "/directors/cards/switzerland.jpg",
    posterHeight: 2031,
    instagramUrl: "https://www.instagram.com/beautynations_switzerland",
  },
  { countryName: "Poland", countryCode: "PL" },
  { countryName: "Turkey", countryCode: "TR" },
  { countryName: "United Kingdom", countryCode: "GB" },
  { countryName: "United States", countryCode: "US" },
];

export const confirmedDirectors = directors.filter(
  (director) => director.directorName && director.posterUrl && director.displayUrl,
);

export const confirmedCountryCount = confirmedDirectors.length;
