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

export const HEAT_EMPTY_COLOR = "#F3F4F8"
// Low -> max, interpolated continuously by heatColor.
export const HEAT_STOPS = ["#B8F0D2", "#FAE266", "#F0984E", "#DD524A"]

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Maps ratio 0..1 onto the stops; 0 count is handled by callers (HEAT_EMPTY_COLOR).
export function heatColor(ratio: number): string {
  const r = Math.min(1, Math.max(0, ratio))
  const scaled = r * (HEAT_STOPS.length - 1)
  const i = Math.min(Math.floor(scaled), HEAT_STOPS.length - 2)
  const f = scaled - i
  const a = hexToRgb(HEAT_STOPS[i])
  const b = hexToRgb(HEAT_STOPS[i + 1])
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f))
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`
}

// Evenly spaced colors across the whole scale, for drawing gradient bars without a gradient library.
export function heatGradient(bands: number): string[] {
  return Array.from({ length: bands }, (_, i) => heatColor(bands > 1 ? i / (bands - 1) : 0))
}
