import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { zustandStorage } from "@/store/zustandStorage"

type MenuState = {
  // Desktop web left menu: false = 72px icon rail, true = 200px with labels.
  open: boolean
  toggle: () => void
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      open: false,
      toggle: () => set((s) => ({ open: !s.open })),
    }),
    {
      name: "menu-state",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
