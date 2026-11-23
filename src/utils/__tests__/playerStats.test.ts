import type { Match } from "@/@types/futevo"
import { computePlayerRecord } from "@/utils/playerStats"

const match = (
  id: string,
  teamA: [string, string],
  teamB: [string, string],
  winner: "A" | "B",
  completedAt: string,
  status: Match["status"] = "completed"
): Match => ({
  id,
  userId: "u1",
  teamA,
  teamB,
  targetScore: 18,
  winBy: 2,
  status,
  winner: status === "completed" ? winner : undefined,
  scoreA: winner === "A" ? 18 : 12,
  scoreB: winner === "B" ? 18 : 12,
  points: [],
  createdAt: completedAt,
  completedAt,
})

describe("computePlayerRecord", () => {
  const matches = [
    match("1", ["rafa", "bel"], ["duda", "leo"], "A", "2026-11-01T10:00:00.000Z"),
    match("2", ["duda", "rafa"], ["bel", "leo"], "B", "2026-11-02T10:00:00.000Z"),
    match("3", ["leo", "tati"], ["rafa", "bel"], "B", "2026-11-03T10:00:00.000Z"),
    match("4", ["rafa", "bel"], ["duda", "leo"], "A", "2026-11-04T10:00:00.000Z", "in_progress"),
  ]

  it("counts completed matches and wins on either side", () => {
    const record = computePlayerRecord("rafa", matches)
    expect(record.played).toBe(3)
    expect(record.wins).toBe(2)
  })

  it("lists recent results newest first", () => {
    expect(computePlayerRecord("rafa", matches).lastResults).toEqual([true, false, true])
  })

  it("picks the most frequent partner", () => {
    expect(computePlayerRecord("rafa", matches).bestPartnerId).toBe("bel")
  })

  it("is empty for a player with no completed matches", () => {
    expect(computePlayerRecord("nobody", matches)).toEqual({
      played: 0,
      wins: 0,
      bestPartnerId: undefined,
      lastResults: [],
    })
  })
})
