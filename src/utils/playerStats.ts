import type { AttackTypeId, MatchPoint, Player } from "@/@types/futevo"
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
