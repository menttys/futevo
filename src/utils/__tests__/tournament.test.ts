import type { Tournament } from "@/@types/futevo"
import { clubForSide, duplaKey, findEntry } from "@/utils/tournament"

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
