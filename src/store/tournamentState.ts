import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Tournament } from "@/@types/futevo"
import { zustandStorage } from "@/store/userState"

type TournamentState = {
  tournaments: Tournament[] | null
  setTournaments: (tournaments: Tournament[]) => void
  upsertTournament: (tournament: Tournament) => void
  removeTournament: (tournamentId: string) => void
  isLoadingTournaments: boolean
  setIsLoadingTournaments: (loading: boolean) => void
}

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set) => ({
      tournaments: null,
      setTournaments: (tournaments) => set({ tournaments, isLoadingTournaments: false }),
      upsertTournament: (tournament) =>
        set((state) => ({
          tournaments: (state.tournaments ?? []).some((t) => t.id === tournament.id)
            ? (state.tournaments ?? []).map((t) => (t.id === tournament.id ? tournament : t))
            : [...(state.tournaments ?? []), tournament],
        })),
      removeTournament: (tournamentId) =>
        set((state) => ({
          tournaments: (state.tournaments ?? []).filter((t) => t.id !== tournamentId),
        })),
      isLoadingTournaments: true,
      setIsLoadingTournaments: (isLoadingTournaments) => set({ isLoadingTournaments }),
    }),
    {
      name: "tournament-state",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.tournaments) {
          state.isLoadingTournaments = false
        }
      },
    }
  )
)
