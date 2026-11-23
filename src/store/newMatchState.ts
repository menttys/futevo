import { create } from "zustand"

import type { TeamSide } from "@/@types/futevo"

type NewMatchState = {
  // Index 0 = left side of the court, 1 = right side. undefined = not picked yet.
  teamA: (string | undefined)[]
  teamB: (string | undefined)[]
  setSlot: (side: TeamSide, index: number, playerId: string | undefined) => void
  reset: () => void
}

// Draft of the New match form's four player slots. Not persisted: it lives only while
// the New match screen (and the player picker above it) is mounted.
export const useNewMatchStore = create<NewMatchState>()((set) => ({
  teamA: [undefined, undefined],
  teamB: [undefined, undefined],
  setSlot: (side, index, playerId) =>
    set((state) => {
      const update = (slots: (string | undefined)[]) =>
        slots.map((v, i) => (i === index ? playerId : v))
      return side === "A" ? { teamA: update(state.teamA) } : { teamB: update(state.teamB) }
    }),
  reset: () => set({ teamA: [undefined, undefined], teamB: [undefined, undefined] }),
}))
