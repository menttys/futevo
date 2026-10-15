import type { MatchPoint } from "@/@types/futevo"

import { computeHeatMap } from "../heatMap"

function point(overrides: Partial<MatchPoint>): MatchPoint {
  return {
    id: "p",
    team: "A",
    scoreAAfter: 1,
    scoreBAfter: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  }
}

describe("computeHeatMap", () => {
  const points = [
    point({ id: "1", team: "A", zone: 5, attackType: "pingo", scoringPlayerId: "p1" }),
    point({ id: "2", team: "A", zone: 5, attackType: "loby", scoringPlayerId: "p2" }),
    point({ id: "3", team: "B", zone: 1, attackType: "pingo", scoringPlayerId: "p3" }),
    point({ id: "4", team: "B", ballOut: true, scoringPlayerId: "p3" }),
  ]

  it("places points on the opponent's half", () => {
    const data = computeHeatMap(points)
    expect(data.halves.B[5]).toBe(2)
    expect(data.halves.A[1]).toBe(1)
    expect(data.max).toBe(2)
    expect(data.total).toBe(3)
    expect(data.ballOut).toBe(1)
  })

  it("filters by player and attack type", () => {
    expect(computeHeatMap(points, { playerId: "p1" }).total).toBe(1)
    const pingo = computeHeatMap(points, { attackType: "pingo" })
    expect(pingo.total).toBe(2)
    expect(pingo.ballOut).toBe(0)
  })

  it("honours the legacy courtSide", () => {
    const data = computeHeatMap([point({ team: "A", zone: 2, courtSide: "A" })])
    expect(data.halves.A[2]).toBe(1)
  })
})
