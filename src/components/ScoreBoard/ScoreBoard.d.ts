import type { Player, TeamSide } from "@/@types/futevo"

export type ScoreBoardProps = {
  teamAPlayers: Player[]
  teamBPlayers: Player[]
  scoreA: number
  scoreB: number
  onScorePoint: (team: TeamSide) => void
  disabled?: boolean
}
