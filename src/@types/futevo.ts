export const ATTACK_TYPES = [
  { id: "pingo", label: "Pingo" },
  { id: "loby", label: "Loby" },
  { id: "shark", label: "Shark" },
  { id: "ace", label: "Ace" },
  { id: "head", label: "Head attack" },
  { id: "opponentError", label: "Opponent error" },
] as const

export type AttackTypeId = (typeof ATTACK_TYPES)[number]["id"]

export type Player = {
  id: string
  userId: string
  name: string
  color?: string
  // Empty string means "cleared" (merge-writes can't drop a field when undefined is stripped).
  photoUri?: string
  // ISO 3166-1 alpha-2 codes
  birthCountry?: string
  residencyCountry?: string
}

export type TeamSide = "A" | "B"

// 3x3 grid per court half, row-major: 1 2 3 / 4 5 6 / 7 8 9
export type CourtZone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

// A spot on the court normalised to the court rectangle: x 0 (left) → 1 (right), y 0 (Team B's
// baseline, top) → 1 (Team A's baseline, bottom), the net at y = 0.5. Values may fall outside
// 0..1 for a serve taken behind the baseline or a ball that landed out.
export type CourtPosition = { x: number; y: number }

export type MatchPoint = {
  id: string
  team: TeamSide
  scoringPlayerId?: Player["id"]
  // Zone on the opponent's half where the point landed; absent when ballOut.
  zone?: CourtZone
  // Legacy: which half the zone belongs to. New points always land on the opponent's half.
  courtSide?: TeamSide
  // Point won because the opponent hit the ball out — no zone or attack type.
  ballOut?: boolean
  attackType?: AttackTypeId
  // Optional trajectory, only recorded from the court-mode screen: where the shot was taken
  // and where the ball landed (also set for ball-out points, where `zone` is absent).
  shotFrom?: CourtPosition
  landedAt?: CourtPosition
  scoreAAfter: number
  scoreBAfter: number
  createdAt: string
}

// What the user records when a team scores; the rest of a MatchPoint is derived.
export type PointDetails = Pick<
  MatchPoint,
  "zone" | "attackType" | "ballOut" | "scoringPlayerId" | "shotFrom" | "landedAt"
>

export type MatchStatus = "in_progress" | "completed"

export type Match = {
  id: string
  userId: string
  // Tuple order is the side played: [0] = left, [1] = right.
  teamA: [Player["id"], Player["id"]]
  teamB: [Player["id"], Player["id"]]
  targetScore: number
  winBy: number
  status: MatchStatus
  winner?: TeamSide
  scoreA: number
  scoreB: number
  points: MatchPoint[]
  // Absent for friendly/standalone matches. A dupla's club is derived from the
  // tournament's entries, never stored on the match, so it can't drift.
  tournamentId?: string
  round?: string
  // Optional team names for friendly matches; tournament matches use the club.
  teamNameA?: string
  teamNameB?: string
  notes?: string
  createdAt: string
  completedAt?: string
}

// A dupla registered in a tournament. `players` is stored sorted so the pair is
// order-independent; the club is locked to the dupla for the whole tournament.
export type TournamentEntry = {
  players: [Player["id"], Player["id"]]
  club?: string
}

export type Tournament = {
  id: string
  userId: string
  name: string
  location?: string
  // "YYYY-MM-DD"
  date?: string
  entries: TournamentEntry[]
  createdAt: string
}

// Minimal signed-in user shape shared by the native and web auth implementations.
export type AuthUser = {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}
