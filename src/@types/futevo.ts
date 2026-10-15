export const ATTACK_TYPES = [
  { id: "pingo", label: "Pingo" },
  { id: "loby", label: "Loby" },
  { id: "shark", label: "Shark" },
] as const

export type AttackTypeId = (typeof ATTACK_TYPES)[number]["id"]

export type Player = {
  id: string
  userId: string
  name: string
  color?: string
}

export type TeamSide = "A" | "B"

// 3x3 grid per court half, row-major: 1 2 3 / 4 5 6 / 7 8 9
export type CourtZone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

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
  scoreAAfter: number
  scoreBAfter: number
  createdAt: string
}

// What the user records when a team scores; the rest of a MatchPoint is derived.
export type PointDetails = Pick<MatchPoint, "zone" | "attackType" | "ballOut" | "scoringPlayerId">

export type MatchStatus = "in_progress" | "completed"

export type Match = {
  id: string
  userId: string
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
