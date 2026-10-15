import type { MatchPoint, TeamSide } from "@/@types/futevo"

export function isMatchPoint(
  scoreA: number,
  scoreB: number,
  targetScore: number,
  winBy: number
): boolean {
  const leader = Math.max(scoreA, scoreB)
  const margin = Math.abs(scoreA - scoreB)
  return leader >= targetScore && margin >= winBy
}

export function computeWinner(scoreA: number, scoreB: number): TeamSide | undefined {
  if (scoreA === scoreB) return undefined
  return scoreA > scoreB ? "A" : "B"
}

// Recomputes running scores from a point list rather than trusting a stored
// counter, so an undo (which drops the last point) can never drift from the
// points it's supposedly derived from.
export function computeScores(points: MatchPoint[]): { scoreA: number; scoreB: number } {
  return points.reduce(
    (acc, point) => {
      if (point.team === "A") acc.scoreA += 1
      else acc.scoreB += 1
      return acc
    },
    { scoreA: 0, scoreB: 0 }
  )
}
