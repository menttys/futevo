import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { changeLanguage as applyLanguage, getCurrentLocale } from "@/i18n/i18n"
import type { LanguageCode } from "@/i18n/i18n"
import { zustandStorage } from "@/store/zustandStorage"

type LanguageState = {
  currentLanguage: LanguageCode
  changeLanguage: (locale: LanguageCode) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: getCurrentLocale(),
      changeLanguage: (locale) => {
        applyLanguage(locale)
        set({ currentLanguage: locale })
      },
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.currentLanguage) applyLanguage(state.currentLanguage)
      },
    }
  )
)
