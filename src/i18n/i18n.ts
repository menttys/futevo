import { getLocales } from "expo-localization"
import { I18n } from "i18n-js"

import { zustandStorage } from "@/store/zustandStorage"

import en from "./locales/en.json"
import es from "./locales/es.json"
import pt from "./locales/pt.json"

// Storage key for the persisted language preference
const LANGUAGE_KEY = "user_language"

export const LANGUAGES = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
} as const

export type LanguageCode = keyof typeof LANGUAGES

const i18n = new I18n({ en, es, pt })

const isLanguageCode = (value: string | null | undefined): value is LanguageCode =>
  !!value && value in LANGUAGES

// Initial locale: stored preference > device locale > "en"
const getInitialLocale = (): LanguageCode => {
  const stored = zustandStorage.getItem(LANGUAGE_KEY)
  if (typeof stored === "string" && isLanguageCode(stored)) return stored
  const deviceLocale = getLocales()[0]?.languageCode
  return isLanguageCode(deviceLocale) ? deviceLocale : "en"
}

i18n.locale = getInitialLocale()
i18n.enableFallback = true
i18n.defaultLocale = "en"

export const changeLanguage = (locale: LanguageCode) => {
  i18n.locale = locale
  zustandStorage.setItem(LANGUAGE_KEY, locale)
}

export const getCurrentLocale = (): LanguageCode => {
  const code = i18n.locale.split("-")[0]
  return isLanguageCode(code) ? code : "en"
}

export const getAvailableLocales = () => Object.keys(LANGUAGES) as LanguageCode[]

export const isCurrentLanguage = (locale: LanguageCode) => getCurrentLocale() === locale

export { i18n }
