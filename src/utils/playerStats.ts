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
    .filter((m) => m.status === "completed" && (m.teamA.includes(playerId) || m.teamB.includes(playerId)))
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
