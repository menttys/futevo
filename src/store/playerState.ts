import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Player } from "@/@types/futevo"
import { zustandStorage } from "@/store/userState"

type PlayerState = {
  players: Player[] | null
  setPlayers: (players: Player[]) => void
  upsertPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  isLoadingPlayers: boolean
  setIsLoadingPlayers: (loading: boolean) => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      players: null,
      setPlayers: (players) => set({ players, isLoadingPlayers: false }),
      upsertPlayer: (player) =>
        set((state) => ({
          players: (state.players ?? []).some((p) => p.id === player.id)
            ? (state.players ?? []).map((p) => (p.id === player.id ? { ...p, ...player } : p))
            : [...(state.players ?? []), player],
        })),
      removePlayer: (playerId) =>
        set((state) => ({
          players: (state.players ?? []).filter((p) => p.id !== playerId),
        })),
      isLoadingPlayers: true,
      setIsLoadingPlayers: (isLoadingPlayers) => set({ isLoadingPlayers }),
    }),
    {
      name: "player-state",
      storage: createJSONStorage(() => zustandStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.players) {
          state.isLoadingPlayers = false
        }
      },
    }
  )
)
