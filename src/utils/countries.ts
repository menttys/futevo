export type Country = {
  code: string
  name: string
  flag: string
}

const COUNTRY_NAMES: Record<string, string> = {
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  BE: "Belgium",
  BO: "Bolivia",
  BR: "Brazil",
  CA: "Canada",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CZ: "Czechia",
  DK: "Denmark",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  GT: "Guatemala",
  HN: "Honduras",
  IN: "India",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  KR: "South Korea",
  LB: "Lebanon",
  MX: "Mexico",
  MA: "Morocco",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NG: "Nigeria",
  NO: "Norway",
  PA: "Panama",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  RO: "Romania",
  RU: "Russia",
  SA: "Saudi Arabia",
  ZA: "South Africa",
  ES: "Spain",
  SE: "Sweden",
  CH: "Switzerland",
  TR: "Turkey",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  VE: "Venezuela",
}

export function getFlagEmoji(code: string): string {
  const upper = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(upper)) return ""
  return String.fromCodePoint(...[...upper].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

export function getCountryName(code: string, locale?: string): string {
  const upper = code.toUpperCase()
  if (locale) {
    try {
      const localized = new Intl.DisplayNames([locale], { type: "region" }).of(upper)
      if (localized && localized !== upper) return localized
    } catch {
      // Intl.DisplayNames unavailable — fall back to the English name.
    }
  }
  return COUNTRY_NAMES[upper] ?? upper
}

export function getCountries(locale?: string): Country[] {
  return Object.keys(COUNTRY_NAMES)
    .map((code) => ({ code, name: getCountryName(code, locale), flag: getFlagEmoji(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}
