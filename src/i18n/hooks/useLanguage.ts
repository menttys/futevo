import { useCallback } from "react"

import { useLanguageStore } from "@/store/languageState"

import { i18n, LANGUAGES } from "../i18n"

/**
 * Reactive language hook. Reads the language from the Zustand store so
 * consumers re-render on change; `t` is re-created after every switch.
 */
export const useLanguage = () => {
  const currentLanguage = useLanguageStore((s) => s.currentLanguage)
  const changeLanguage = useLanguageStore((s) => s.changeLanguage)

  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => i18n.t(key, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLanguage]
  )

  return {
    currentLanguage,
    changeLanguage,
    t,
    languages: LANGUAGES,
    availableLanguages: Object.values(LANGUAGES),
  }
}
