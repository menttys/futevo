import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Match } from "@/@types/futevo"
import { zustandStorage } from "@/store/userState"

type MatchState = {
  matches: Match[] | null
  setMatches: (matches: Match[]) => void
  upsertMatch: (match: Match) => void
  removeMatch: (matchId: string) => void
  isLoadingMatches: boolean
  setIsLoadingMatches: (loading: boolean) => void
}

export const useMatchStore = create<MatchState>()(
  persist(
    (set) => ({
      matches: null,
      setMatches: (matches) => set({ matches, isLoadingMatches: false }),
      upsertMatch: (match) =>
        set((state) => ({
          matches: (state.matches ?? []).some((m) => m.id === match.id)
            ? (state.matches ?? []).map((m) => (m.id === match.id ? match : m))
            : [...(state.matches ?? []), match],
        })),
      removeMatch: (matchId) =>
        set((state) => ({
          matches: (state.matches ?? []).filter((m) => m.id !== matchId),
        })),
      isLoadingMatches: true,
      setIsLoadingMatches: (isLoadingMatches) => set({ isLoadingMatches }),
    }),
    {
      name: "match-state",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.matches) {
          state.isLoadingMatches = false
        }
      },
    }
  )
)
