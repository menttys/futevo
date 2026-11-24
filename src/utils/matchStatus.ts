import type { AttackTypeId, MatchPoint, TeamSide } from "@/@types/futevo"

// The side on the current run of consecutive points, and how long it is.
export function currentStreak(points: MatchPoint[]): { team: TeamSide; count: number } | undefined {
  const last = points[points.length - 1]
  if (!last) return undefined
  let count = 0
  for (let i = points.length - 1; i >= 0 && points[i].team === last.team; i--) count++
  return { team: last.team, count }
}

// Largest lead either side has held, as a positive number.
export function biggestLead(points: MatchPoint[]): number {
  return points.reduce((max, p) => Math.max(max, Math.abs(p.scoreAAfter - p.scoreBAfter)), 0)
}

// The attack that has won the most points so far.
export function topAttack(points: MatchPoint[]): AttackTypeId | undefined {
  let best: AttackTypeId | undefined
  let bestCount = 0
  attackTally(points).forEach((count, id) => {
    if (count > bestCount) {
      best = id
      bestCount = count
    }
  })
  return best
}

export function attackTally(points: MatchPoint[]): Map<AttackTypeId, number> {
  const counts = new Map<AttackTypeId, number>()
  points.forEach((p) => {
    if (p.attackType) counts.set(p.attackType, (counts.get(p.attackType) ?? 0) + 1)
  })
  return counts
}
