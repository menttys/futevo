import type { AttackTypeId, CourtZone, PointDetails, TeamSide } from "@/@types/futevo"
import type { CourtHit, CourtRect, Point2D } from "@/utils/courtGesture"
import { locateOnCourt, suggestAttackType, toCourtPosition } from "@/utils/courtGesture"
import type { SelectionPhase } from "@/utils/courtSelection"
import { dragPhase, homeZone, zoneCenter } from "@/utils/courtSelection"

// Court mode's rules, kept free of React so they can be tested on their own. The screen owns the
// state and the gestures; every decision about what a touch does is made here.

// A player standing on the court. `id` is the player id.
export type CourtToken = { id: string; team: TeamSide; zone: CourtZone; center: Point2D }

// A released landing waiting for the points sheet. `landing` is exactly where the finger let go;
// `hit` is the zone that point falls in.
export type PlacedLanding = {
  playerId: string
  hit: CourtHit
  landing: Point2D
  attackType?: AttackTypeId
}

// Squares players were moved to this rally; anyone missing stands on their home square.
export type Squares = Record<string, CourtZone>

// "error": Opp. error was pressed with nobody placed; the next token tapped wins the point.
export type ScreenPhase = SelectionPhase | "error"

// Moving less than this between touch-down and release counts as a tap.
export const TAP_SLOP = 12

// --- Where players stand --------------------------------------------------------------------

// A player's square: where they were moved to this rally, else their home square.
// `index` is their slot in the team tuple ([0] = left from their own point of view).
export function squareFor(
  playerId: string,
  team: TeamSide,
  index: 0 | 1,
  squares: Squares
): CourtZone {
  return squares[playerId] ?? homeZone(team, index)
}

// The token under a touch, if any.
export function tokenAt<T extends CourtToken>(
  tokens: T[],
  point: Point2D,
  radius: number
): T | undefined {
  return tokens.find(
    (token) => Math.hypot(token.center.x - point.x, token.center.y - point.y) <= radius
  )
}

// --- Landings -------------------------------------------------------------------------------

// A new landing pre-selects the attack its depth suggests (from where the shot was taken).
// `from` defaults to the player's current square.
export function placeLanding(
  token: CourtToken,
  landing: Point2D,
  hit: CourtHit,
  court: CourtRect,
  from: Point2D = token.center
): PlacedLanding {
  return {
    playerId: token.id,
    hit,
    landing,
    attackType: suggestAttackType(from, landing, court, token.team),
  }
}

// Tapping the selected attack chip again clears it, as on the points screen.
export function toggleAttack(placed: PlacedLanding, next: AttackTypeId): PlacedLanding {
  return { ...placed, attackType: placed.attackType === next ? undefined : next }
}

// --- Moving a player ------------------------------------------------------------------------

// Moving a player to another square of their own side: that square is where the attack starts.
// A teammate already standing there swaps onto the square just left. A landing already placed
// for either of them is re-suggested from the new square, keeping the landing itself.
export function moveToSquare(
  token: CourtToken,
  zone: CourtZone,
  tokens: CourtToken[],
  squares: Squares,
  placed: PlacedLanding | null,
  court: CourtRect
): { squares: Squares; placed: PlacedLanding | null } {
  const teammate = tokens.find(
    (other) => other.team === token.team && other.id !== token.id && other.zone === zone
  )
  const nextSquares: Squares = {
    ...squares,
    [token.id]: zone,
    ...(teammate ? { [teammate.id]: token.zone } : {}),
  }
  let nextPlaced = placed
  if (placed?.playerId === token.id) {
    nextPlaced = placeLanding(
      token,
      placed.landing,
      placed.hit,
      court,
      zoneCenter(token.team, zone, court)
    )
  } else if (teammate && placed?.playerId === teammate.id) {
    nextPlaced = placeLanding(
      teammate,
      placed.landing,
      placed.hit,
      court,
      zoneCenter(token.team, token.zone, court)
    )
  }
  return { squares: nextSquares, placed: nextPlaced }
}

// --- Releasing a carried token --------------------------------------------------------------

export type DropOutcome =
  // Released across the net: a landing exactly where the finger let go.
  | { kind: "place"; placed: PlacedLanding }
  // Released on another square of the player's own side: the player moves there.
  | { kind: "move"; squares: Squares; placed: PlacedLanding | null }
  // Released off the court: whatever was placed is cleared.
  | { kind: "cancel" }
  // Put back down on its own square (or never moved): nothing changes.
  | { kind: "none" }

// `end` is the last point the finger was seen at. The screen passes that rather than the final
// gesture event, so a gesture that ends as cancelled still lands where the finger was.
export function resolveDrop(args: {
  token: CourtToken
  tokens: CourtToken[]
  start: Point2D
  end: Point2D
  court: CourtRect
  squares: Squares
  placed: PlacedLanding | null
}): DropOutcome {
  const { token, tokens, start, end, court, squares, placed } = args
  const { phase, hit } = dragPhase(start, end, token.team, court, TAP_SLOP)
  if (phase === "valid" && hit) {
    return { kind: "place", placed: placeLanding(token, end, hit, court) }
  }
  if (phase === "move" && hit) {
    return { kind: "move", ...moveToSquare(token, hit.zone, tokens, squares, placed, court) }
  }
  if (phase === "off") return { kind: "cancel" }
  return { kind: "none" }
}

// --- Taps -----------------------------------------------------------------------------------

export type TapOutcome =
  // After Opp. error: the tapped player's team wins the point.
  | { kind: "opponentError"; team: TeamSide }
  // With a landing placed: tapping the other side moves the landing to exactly that spot.
  | { kind: "moveLanding"; placed: PlacedLanding }
  | { kind: "none" }

export function resolveTap(args: {
  point: Point2D
  tokens: CourtToken[]
  court: CourtRect
  placed: PlacedLanding | null
  errorMode: boolean
  hitRadius: number
}): TapOutcome {
  const { point, tokens, court, placed, errorMode, hitRadius } = args
  if (errorMode) {
    const token = tokenAt(tokens, point, hitRadius)
    return token ? { kind: "opponentError", team: token.team } : { kind: "none" }
  }
  const placedToken = placed ? tokens.find((token) => token.id === placed.playerId) : undefined
  const hit = locateOnCourt(point, court)
  if (placedToken && hit && hit.side !== placedToken.team) {
    return { kind: "moveLanding", placed: placeLanding(placedToken, point, hit, court) }
  }
  return { kind: "none" }
}

// --- Footer actions -------------------------------------------------------------------------

export type OpponentErrorOutcome =
  // A landing is placed: the error goes straight to that player's team.
  | { kind: "record"; team: TeamSide }
  // Nobody placed: toggle the "tap a player from the winning team" mode.
  | { kind: "toggleMode" }

export function resolveOpponentError(
  placed: PlacedLanding | null,
  tokens: CourtToken[]
): OpponentErrorOutcome {
  const placedToken = placed ? tokens.find((token) => token.id === placed.playerId) : undefined
  return placedToken ? { kind: "record", team: placedToken.team } : { kind: "toggleMode" }
}

// What an opponent-error point records.
export const OPPONENT_ERROR_POINT: PointDetails = { attackType: "opponentError" }

// What Confirm point records for a placed landing. An ace is always a serve, so where the shot
// started says nothing about it and is left out.
export function confirmedPoint(
  placed: PlacedLanding,
  token: CourtToken,
  court: CourtRect
): PointDetails {
  return {
    zone: placed.hit.zone,
    attackType: placed.attackType,
    scoringPlayerId: token.id,
    shotFrom: placed.attackType === "ace" ? undefined : toCourtPosition(token.center, court),
    landedAt: toCourtPosition(placed.landing, court),
  }
}

// --- What the screen is showing -------------------------------------------------------------

// A drag in progress wins over everything; then Opp. error mode; then a placed landing.
export function screenPhase(
  dragging: SelectionPhase | null,
  errorMode: boolean,
  hasPlacedLanding: boolean
): ScreenPhase {
  if (dragging) return dragging
  if (errorMode) return "error"
  return hasPlacedLanding ? "placed" : "idle"
}
