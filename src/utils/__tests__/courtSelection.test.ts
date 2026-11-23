import {
  arcPath,
  dragPhase,
  fitCourt,
  homeZone,
  netEdge,
  opponentOf,
  zoneCenter,
} from "../courtSelection"

const court = { x: 0, y: 0, width: 300, height: 600 }
const SLOP = 12

describe("dragPhase", () => {
  // Team A's left player, on zone 4 of the bottom half.
  const origin = zoneCenter("A", 4, court)

  it("is picked while the finger stays within the slop", () => {
    expect(dragPhase(origin, { x: origin.x + 5, y: origin.y }, "A", court, SLOP).phase).toBe(
      "picked"
    )
  })

  it("stays picked anywhere on the player's own square", () => {
    expect(dragPhase(origin, { x: 90, y: 410 }, "A", court, SLOP).phase).toBe("picked")
  })

  it("is valid over the other side of the net", () => {
    expect(dragPhase(origin, { x: 150, y: 50 }, "A", court, SLOP)).toEqual({
      phase: "valid",
      hit: { side: "B", zone: 2 },
    })
  })

  it("is a move over another square of the player's own side", () => {
    expect(dragPhase(origin, { x: 250, y: 550 }, "A", court, SLOP)).toEqual({
      phase: "move",
      hit: { side: "A", zone: 9 },
    })
  })

  it("is off outside the court", () => {
    expect(dragPhase(origin, { x: -20, y: 250 }, "A", court, SLOP)).toEqual({
      phase: "off",
      hit: null,
    })
  })

  it("treats Team A's half as valid for a Team B player", () => {
    const top = zoneCenter("B", 6, court)
    expect(dragPhase(top, { x: 150, y: 550 }, "B", court, SLOP).phase).toBe("valid")
  })
})

describe("homeZone", () => {
  it("puts each team in its middle row, mirrored for Team B", () => {
    expect([homeZone("A", 0), homeZone("A", 1)]).toEqual([4, 6])
    expect([homeZone("B", 0), homeZone("B", 1)]).toEqual([6, 4])
  })
})

describe("opponentOf", () => {
  it("swaps sides", () => {
    expect(opponentOf("A")).toBe("B")
    expect(opponentOf("B")).toBe("A")
  })
})

describe("netEdge", () => {
  it("marks only the two rows that touch the net", () => {
    expect(netEdge("B", 8)).toBe("bottom")
    expect(netEdge("A", 2)).toBe("top")
    expect(netEdge("B", 2)).toBeNull()
    expect(netEdge("A", 8)).toBeNull()
  })
})

describe("arcPath", () => {
  it("starts and ends on the given points", () => {
    expect(arcPath({ x: 0, y: 100 }, { x: 0, y: 0 })).toMatch(/^M 0 100 Q .+ 0 0$/)
  })
})

describe("fitCourt", () => {
  it("keeps cells square and centres the court", () => {
    const fitted = fitCourt({ width: 400, height: 900 }, { side: 20, end: 10 }, 200)
    expect(fitted.width / 3).toBeCloseTo(fitted.height / 6)
    expect(fitted.x).toBeCloseTo((400 - fitted.width) / 2)
    expect(fitted.y).toBeCloseTo((900 - fitted.height) / 2)
  })

  it("is limited by the height on a short arena", () => {
    expect(fitCourt({ width: 400, height: 320 }, { side: 20, end: 10 }, 200).height).toBe(300)
  })

  it("never grows a cell past the cap", () => {
    expect(fitCourt({ width: 2000, height: 2000 }, { side: 20, end: 10 }, 90).width).toBe(270)
  })
})
