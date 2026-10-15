import type { Player, TeamSide } from "@/@types/futevo"

export type ScoreBoardProps = {
  teamAPlayers: Player[]
  teamBPlayers: Player[]
  scoreA: number
  scoreB: number
  clubA?: string
  clubB?: string
  onScorePoint: (team: TeamSide) => void
  disabled?: boolean
}
