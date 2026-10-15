import type { AttackTypeId, CourtZone, MatchPoint, TeamSide } from "@/@types/futevo"

export type HeatMapFilter = {
  playerId?: string
  attackType?: AttackTypeId
}

export type ZoneCounts = Record<CourtZone, number>

export type HeatMapData = {
  // Keyed by the court half the points landed on.
  halves: Record<TeamSide, ZoneCounts>
  max: number
  total: number
  ballOut: number
}

export const COURT_ZONES: CourtZone[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function emptyCounts(): ZoneCounts {
  return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
}

// Counts where points landed, optionally narrowed to one scorer and/or attack type.
// Ball-out points have no zone, so they're only tallied separately (and dropped when
// an attack type is selected, since they have none).
export function computeHeatMap(points: MatchPoint[], filter: HeatMapFilter = {}): HeatMapData {
  const halves: Record<TeamSide, ZoneCounts> = { A: emptyCounts(), B: emptyCounts() }
  let max = 0
  let total = 0
  let ballOut = 0

  points.forEach((point) => {
    if (filter.playerId && point.scoringPlayerId !== filter.playerId) return
    if (filter.attackType && point.attackType !== filter.attackType) return

    if (point.ballOut) {
      ballOut += 1
      return
    }
    if (!point.zone) return

    const half: TeamSide = point.courtSide ?? (point.team === "A" ? "B" : "A")
    const next = halves[half][point.zone] + 1
    halves[half][point.zone] = next
    max = Math.max(max, next)
    total += 1
  })

  return { halves, max, total, ballOut }
}
