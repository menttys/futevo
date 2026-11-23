import type { CourtZone, TeamSide } from "@/@types/futevo"
import type { CourtHit, CourtRect, Point2D } from "@/utils/courtGesture"
import { locateOnCourt, zoneRect } from "@/utils/courtGesture"

// Court mode's selection states, in the order a point is usually recorded:
//   idle     — nothing picked up
//   picked   — a token is lifted but still on its own square
//   valid    — dragging over a square on the other side of the net
//   move     — dragging over another square of the player's own side; releasing moves the player
//              there, which becomes where the attack is taken from
//   off      — dragged outside the court; releasing cancels
//   placed   — released on a valid square, waiting for Confirm point
export type SelectionPhase = "idle" | "picked" | "valid" | "move" | "off" | "placed"

export type DragPhase = Extract<SelectionPhase, "picked" | "valid" | "move" | "off">

export function opponentOf(team: TeamSide): TeamSide {
  return team === "A" ? "B" : "A"
}

// Where a token being dragged stands right now. `slop` is how far the finger may wander
// before a touch counts as a drag.
export function dragPhase(
  origin: Point2D,
  current: Point2D,
  team: TeamSide,
  court: CourtRect,
  slop: number
): { phase: DragPhase; hit: CourtHit | null } {
  if (Math.hypot(current.x - origin.x, current.y - origin.y) <= slop) {
    return { phase: "picked", hit: locateOnCourt(origin, court) }
  }
  const hit = locateOnCourt(current, court)
  if (!hit) return { phase: "off", hit: null }
  if (hit.side === team) {
    const home = locateOnCourt(origin, court)
    const onOwnSquare = home !== null && home.side === hit.side && home.zone === hit.zone
    return { phase: onOwnSquare ? "picked" : "move", hit }
  }
  return { phase: "valid", hit }
}

// Each player stands on a square of their own half, in the middle row. Team B is drawn upside
// down relative to Team A, so its left player ([0]) stands on the screen's right.
export function homeZone(team: TeamSide, index: 0 | 1): CourtZone {
  if (team === "A") return index === 0 ? 4 : 6
  return index === 0 ? 6 : 4
}

export function zoneCenter(side: TeamSide, zone: CourtZone, court: CourtRect): Point2D {
  const rect = zoneRect(side, zone, court)
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

// Which edge of a square touches the net: Team B's bottom row and Team A's top row.
export function netEdge(side: TeamSide, zone: CourtZone): "top" | "bottom" | null {
  const row = Math.floor((zone - 1) / 3)
  if (side === "B" && row === 2) return "bottom"
  if (side === "A" && row === 0) return "top"
  return null
}

// The ball's flight: a gentle quadratic curve from `from` to `to`, bowed to one side.
export function arcPath(from: Point2D, to: Point2D, bend = 0.12): string {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const cx = (from.x + to.x) / 2 - (dy / length) * length * bend
  const cy = (from.y + to.y) / 2 + (dx / length) * length * bend
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

// The largest court of square cells (3 wide, 6 tall) that fits the arena with the given margins,
// centred in it. The side margins leave room to drag a token off the court.
export function fitCourt(
  arena: { width: number; height: number },
  margin: { side: number; end: number },
  maxCell: number
): CourtRect {
  const cell = Math.max(
    0,
    Math.min((arena.width - margin.side * 2) / 3, (arena.height - margin.end * 2) / 6, maxCell)
  )
  return {
    x: (arena.width - cell * 3) / 2,
    y: (arena.height - cell * 6) / 2,
    width: cell * 3,
    height: cell * 6,
  }
}
