import type { AttackTypeId, CourtPosition, CourtZone, TeamSide } from "@/@types/futevo"

export type Point2D = { x: number; y: number }

export type CourtRect = { x: number; y: number; width: number; height: number }

export type CourtHit = {
  // Which half of the court the point is on. Team B is drawn above the net, Team A below.
  side: TeamSide
  // Zone as drawn by CourtGrid: row-major from the top of the screen, so the same
  // number means the same square the heat map and point log show.
  zone: CourtZone
}

export function isInsideCourt(point: Point2D, court: CourtRect): boolean {
  return (
    point.x >= court.x &&
    point.x <= court.x + court.width &&
    point.y >= court.y &&
    point.y <= court.y + court.height
  )
}

// Returns null when the point is outside the court lines (i.e. the ball went out).
export function locateOnCourt(point: Point2D, court: CourtRect): CourtHit | null {
  if (!isInsideCourt(point, court)) return null

  const half = court.height / 2
  const side: TeamSide = point.y < court.y + half ? "B" : "A"
  const top = side === "B" ? court.y : court.y + half

  const col = Math.min(2, Math.floor(((point.x - court.x) / court.width) * 3))
  const row = Math.min(2, Math.floor(((point.y - top) / half) * 3))
  return { side, zone: (row * 3 + col + 1) as CourtZone }
}

// Distance from the net as a fraction of one half: 0 at the net, 1 at the baseline.
function depthFromNet(y: number, court: CourtRect): number {
  const half = court.height / 2
  return Math.abs(y - (court.y + half)) / half
}

// Where the ball landed decides the attack when the user doesn't pick one:
//   Ace   — the gesture started behind the scorer's own baseline (a serve)
//   Pingo — a soft touch that dies in the row closest to the net
//   Loby  — a lift that lands deep, in the baseline row
//   Shark — everything in between
// The result only pre-selects a chip; the user can always change it before confirming.
export const PINGO_MAX_DEPTH = 1 / 3
export const LOBY_MIN_DEPTH = 2 / 3

export function suggestAttackType(
  origin: Point2D,
  landing: Point2D,
  court: CourtRect,
  scoringTeam: TeamSide
): AttackTypeId {
  const ownBaseline = scoringTeam === "A" ? court.y + court.height : court.y
  const behindBaseline = scoringTeam === "A" ? origin.y > ownBaseline : origin.y < ownBaseline
  if (behindBaseline) return "ace"

  const depth = depthFromNet(landing.y, court)
  if (depth <= PINGO_MAX_DEPTH) return "pingo"
  if (depth >= LOBY_MIN_DEPTH) return "loby"
  return "shark"
}

// Inverse of locateOnCourt: the on-screen rectangle of one zone, for highlighting it.
export function zoneRect(side: TeamSide, zone: CourtZone, court: CourtRect): CourtRect {
  const half = court.height / 2
  const row = Math.floor((zone - 1) / 3)
  const col = (zone - 1) % 3
  const top = side === "B" ? court.y : court.y + half
  return {
    x: court.x + (col * court.width) / 3,
    y: top + (row * half) / 3,
    width: court.width / 3,
    height: half / 3,
  }
}

// Keeps a dragged player on their own half. `behindBaseline` lets the token step past the
// baseline (where a serve is taken) so the ace suggestion can still be triggered.
export function clampToOwnHalf(
  point: Point2D,
  team: TeamSide,
  court: CourtRect,
  radius: number,
  behindBaseline: number
): Point2D {
  const half = court.height / 2
  const minY = team === "A" ? court.y + half + radius : court.y - behindBaseline
  const maxY = team === "A" ? court.y + court.height + behindBaseline : court.y + half - radius
  return {
    x: Math.min(court.x + court.width - radius, Math.max(court.x + radius, point.x)),
    y: Math.min(maxY, Math.max(minY, point.y)),
  }
}

export function toCourtPosition(point: Point2D, court: CourtRect): CourtPosition {
  return { x: (point.x - court.x) / court.width, y: (point.y - court.y) / court.height }
}
