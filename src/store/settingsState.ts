import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { DEFAULT_TARGET_SCORE, DEFAULT_WIN_BY } from "@/constants/App"
import { zustandStorage } from "@/store/zustandStorage"

type SettingsState = {
  // Pre-selected rules on the New match screen.
  defaultTargetScore: number
  defaultWinBy: number
  // Desktop web: A / L / Z scoring keys on the live match.
  keyboardShortcuts: boolean
  setDefaultTargetScore: (value: number) => void
  setDefaultWinBy: (value: number) => void
  setKeyboardShortcuts: (value: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      defaultTargetScore: DEFAULT_TARGET_SCORE,
      defaultWinBy: DEFAULT_WIN_BY,
      keyboardShortcuts: true,
      setDefaultTargetScore: (defaultTargetScore) => set({ defaultTargetScore }),
      setDefaultWinBy: (defaultWinBy) => set({ defaultWinBy }),
      setKeyboardShortcuts: (keyboardShortcuts) => set({ keyboardShortcuts }),
    }),
    {
      name: "settings-state",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
