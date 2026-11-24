import type { AttackTypeId, Match, MatchPoint, Player } from "@/@types/futevo"
import { ATTACK_TYPES } from "@/@types/futevo"

export type PlayerStats = {
  playerId: Player["id"]
  points: number
  attacks: Record<AttackTypeId, number>
}

// Tallies points and attack types per scorer. Points without a recorded scorer
// are not attributed to anyone.
export function computePlayerStats(points: MatchPoint[], playerIds: string[]): PlayerStats[] {
  return playerIds.map((playerId) => {
    const attacks = Object.fromEntries(ATTACK_TYPES.map((a) => [a.id, 0])) as Record<
      AttackTypeId,
      number
    >
    let total = 0
    points.forEach((point) => {
      if (point.scoringPlayerId !== playerId) return
      total += 1
      if (point.attackType) attacks[point.attackType] += 1
    })
    return { playerId, points: total, attacks }
  })
}

export type PlayerRecord = {
  played: number
  wins: number
  // Most frequent partner across completed matches, if any.
  bestPartnerId?: Player["id"]
  // Most recent first, up to `recent` results: true = win.
  lastResults: boolean[]
}

// A player's record from completed matches: games, wins, favourite partner and recent form.
export function computePlayerRecord(
  playerId: Player["id"],
  matches: Match[],
  recent = 5
): PlayerRecord {
  const played = matches
    .filter(
      (m) => m.status === "completed" && (m.teamA.includes(playerId) || m.teamB.includes(playerId))
    )
    .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt))

  const partners = new Map<string, number>()
  let wins = 0
  const results: boolean[] = []
  for (const m of played) {
    const side = m.teamA.includes(playerId) ? "A" : "B"
    const team = side === "A" ? m.teamA : m.teamB
    const winner = m.winner ?? (m.scoreA > m.scoreB ? "A" : "B")
    const won = winner === side
    if (won) wins += 1
    results.push(won)
    const partner = team.find((id) => id !== playerId)
    if (partner) partners.set(partner, (partners.get(partner) ?? 0) + 1)
  }

  let bestPartnerId: string | undefined
  let best = 0
  partners.forEach((count, id) => {
    if (count > best) {
      best = count
      bestPartnerId = id
    }
  })

  return { played: played.length, wins, bestPartnerId, lastResults: results.slice(0, recent) }
}

export type PlayerInsights = {
  // Longest run of consecutive wins.
  bestStreak: number
  // Attack types this player scored with, most used first.
  attacks: { label: string; count: number }[]
  // Partners by matches played together, most first (top 3).
  partners: { id: Player["id"]; played: number; wins: number }[]
  // Points this player scored, for the landing-zone grid.
  points: MatchPoint[]
  topZone?: number
}

export function playerInsights(
  playerId: Player["id"],
  matches: Match[],
  attackLabel: (id: AttackTypeId) => string
): PlayerInsights {
  const played = matches
    .filter(
      (m) => m.status === "completed" && (m.teamA.includes(playerId) || m.teamB.includes(playerId))
    )
    .sort((a, b) => (a.completedAt ?? a.createdAt).localeCompare(b.completedAt ?? b.createdAt))

  let bestStreak = 0
  let run = 0
  const partners = new Map<string, { played: number; wins: number }>()
  for (const m of played) {
    const side = m.teamA.includes(playerId) ? "A" : "B"
    const won = (m.winner ?? (m.scoreA > m.scoreB ? "A" : "B")) === side
    run = won ? run + 1 : 0
    bestStreak = Math.max(bestStreak, run)
    const partner = (side === "A" ? m.teamA : m.teamB).find((id) => id !== playerId)
    if (partner) {
      const row = partners.get(partner) ?? { played: 0, wins: 0 }
      row.played += 1
      if (won) row.wins += 1
      partners.set(partner, row)
    }
  }

  const points = matches.flatMap((m) => m.points.filter((p) => p.scoringPlayerId === playerId))
  const attackCounts = new Map<AttackTypeId, number>()
  const zoneCounts = new Map<number, number>()
  points.forEach((p) => {
    if (p.attackType) attackCounts.set(p.attackType, (attackCounts.get(p.attackType) ?? 0) + 1)
    if (p.zone) zoneCounts.set(p.zone, (zoneCounts.get(p.zone) ?? 0) + 1)
  })
  let topZone: number | undefined
  zoneCounts.forEach((count, zone) => {
    if (topZone === undefined || count > (zoneCounts.get(topZone) ?? 0)) topZone = zone
  })

  return {
    bestStreak,
    attacks: ATTACK_TYPES.map((a) => ({
      label: attackLabel(a.id),
      count: attackCounts.get(a.id) ?? 0,
    }))
      .filter((a) => a.count > 0)
      .sort((a, b) => b.count - a.count),
    partners: [...partners.entries()]
      .map(([id, row]) => ({ id, ...row }))
      .sort((a, b) => b.played - a.played)
      .slice(0, 3),
    points,
    topZone,
  }
}
