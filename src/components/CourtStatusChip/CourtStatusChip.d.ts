import type { TeamSide } from "@/@types/futevo"

// active: a step is in progress · success: ready to confirm · error: nothing will be placed.
export type CourtStatusTone = "active" | "success" | "error"

export type CourtStatusChipProps = {
  title: string
  subtitle: string
  tone: CourtStatusTone
  // The player being handled; without one the chip shows a "grab" glyph.
  player?: { name: string; photoUri?: string; team: TeamSide }
}
