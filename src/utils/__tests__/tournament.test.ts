import type { Match, Tournament } from "@/@types/futevo"
import { clubForSide, computeStandings, duplaKey, findEntry } from "@/utils/tournament"

const tournament: Tournament = {
  id: "t1",
  userId: "u1",
  name: "Copa",
  entries: [{ players: ["a", "b"], club: "Club X" }],
  createdAt: "2026-01-01T00:00:00.000Z",
}

describe("duplaKey", () => {
  it("is order-independent", () => {
    expect(duplaKey(["b", "a"])).toBe(duplaKey(["a", "b"]))
  })
})

describe("findEntry / clubForSide", () => {
  it("finds the entry regardless of player order", () => {
    expect(findEntry(tournament, ["b", "a"])?.club).toBe("Club X")
  })

  it("derives the club for each side of a match", () => {
    const match = { teamA: ["b", "a"] as [string, string], teamB: ["c", "d"] as [string, string] }
    expect(clubForSide(match, tournament, "A")).toBe("Club X")
    expect(clubForSide(match, tournament, "B")).toBeUndefined()
  })

  it("returns undefined without a tournament", () => {
    expect(findEntry(undefined, ["a", "b"])).toBeUndefined()
  })
})

describe("computeStandings", () => {
  const cup: Tournament = {
    ...tournament,
    entries: [
      { players: ["a", "b"] },
      { players: ["c", "d"] },
      { players: ["e", "f"] },
    ],
  }
  const match = (teamA: [string, string], teamB: [string, string], scoreA: number, scoreB: number): Match => ({
    id: `${teamA.join("")}-${teamB.join("")}`,
    userId: "u1",
    teamA,
    teamB,
    targetScore: 18,
    winBy: 2,
    status: "completed",
    winner: scoreA > scoreB ? "A" : "B",
    scoreA,
    scoreB,
    points: [],
    tournamentId: "t1",
    createdAt: "2026-01-01T00:00:00.000Z",
  })

  it("ranks by wins, then point difference", () => {
    const table = computeStandings(cup, [
      match(["a", "b"], ["c", "d"], 18, 10),
      match(["d", "c"], ["e", "f"], 18, 16),
      match(["e", "f"], ["b", "a"], 18, 14),
    ])
    expect(table.map((r) => r.entry.players.join(""))).toEqual(["ab", "ef", "cd"])
    expect(table[0]).toMatchObject({ wins: 1, losses: 1, diff: 4 })
    expect(table[2]).toMatchObject({ wins: 1, losses: 1, diff: -6 })
  })

  it("ignores live matches and other tournaments", () => {
    const live = { ...match(["a", "b"], ["c", "d"], 5, 3), status: "in_progress" as const }
    const other = { ...match(["a", "b"], ["c", "d"], 18, 3), tournamentId: "t2" }
    const table = computeStandings(cup, [live, other])
    expect(table.every((r) => r.wins === 0 && r.losses === 0 && r.diff === 0)).toBe(true)
  })
})
