import type { Player, TeamSide, Tournament } from "@/@types/futevo"

export type NewMatchFormSubmit = {
  teamA: [string, string]
  teamB: [string, string]
  targetScore: number
  winBy: number
  tournamentId?: string
  // Set instead of tournamentId when the user creates a tournament inline.
  newTournament?: { name: string; location?: string; date?: string }
  round?: string
  // Only set for a dupla that has no club yet in the tournament (otherwise locked).
  clubA?: string
  clubB?: string
  // Team names for a friendly match (in a tournament the club is the name).
  teamNameA?: string
  teamNameB?: string
}

export type NewMatchFormProps = {
  players: Player[]
  tournaments: Tournament[]
  onSubmit: (params: NewMatchFormSubmit) => void
  // Opens the player picker for one court slot. Index 0 = left, 1 = right.
  onPickSlot: (side: TeamSide, index: number) => void
  // Desktop shows a Cancel button next to Start match.
  onCancel?: () => void
}
