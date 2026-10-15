import { computeScores, computeWinner, isMatchPoint } from "@/utils/matchScoring"

describe("isMatchPoint", () => {
  it("is not a match point below target score", () => {
    expect(isMatchPoint(14, 10, 15, 2)).toBe(false)
  })

  it("is not a match point at target with only a 1-point margin", () => {
    expect(isMatchPoint(15, 14, 15, 2)).toBe(false)
  })

  it("is a match point at target with a 2-point margin", () => {
    expect(isMatchPoint(15, 13, 15, 2)).toBe(true)
  })

  it("requires the margin past the target too (deuce-style extension)", () => {
    expect(isMatchPoint(20, 19, 15, 2)).toBe(false)
    expect(isMatchPoint(21, 19, 15, 2)).toBe(true)
  })
})

describe("computeWinner", () => {
  it("returns undefined when tied", () => {
    expect(computeWinner(10, 10)).toBeUndefined()
  })

  it("returns the higher-scoring team", () => {
    expect(computeWinner(15, 13)).toBe("A")
    expect(computeWinner(13, 15)).toBe("B")
  })
})

describe("computeScores", () => {
  it("tallies points per team from an empty list", () => {
    expect(computeScores([])).toEqual({ scoreA: 0, scoreB: 0 })
  })

  it("tallies points per team", () => {
    const points = [{ team: "A" }, { team: "B" }, { team: "A" }, { team: "A" }] as Parameters<
      typeof computeScores
    >[0]
    expect(computeScores(points)).toEqual({ scoreA: 3, scoreB: 1 })
  })
})
