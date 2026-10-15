import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { AuthUser } from "@/@types/futevo"
import { zustandStorage } from "@/store/zustandStorage"

export { zustandStorage }

export type User = (AuthUser & { id: string }) | null

type UserState = {
  user: User
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      // Auth itself already persists the session natively — onAuthStateChanged
      // repopulates `user` on every launch — so nothing here needs caching across
      // restarts; this just keeps the store's storage wiring consistent with the
      // rest of the app's MMKV-backed stores.
      name: "user-state",
      storage: createJSONStorage(() => zustandStorage),
      partialize: () => ({}),
    }
  )
)
