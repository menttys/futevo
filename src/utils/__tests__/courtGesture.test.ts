import { clampToOwnHalf, locateOnCourt, suggestAttackType, toCourtPosition } from "../courtGesture"

const court = { x: 0, y: 0, width: 300, height: 600 }

describe("locateOnCourt", () => {
  it("maps the top half to team B and the bottom half to team A", () => {
    expect(locateOnCourt({ x: 10, y: 10 }, court)).toEqual({ side: "B", zone: 1 })
    expect(locateOnCourt({ x: 290, y: 290 }, court)).toEqual({ side: "B", zone: 9 })
    expect(locateOnCourt({ x: 150, y: 310 }, court)).toEqual({ side: "A", zone: 2 })
    expect(locateOnCourt({ x: 150, y: 590 }, court)).toEqual({ side: "A", zone: 8 })
  })

  it("returns null outside the court lines", () => {
    expect(locateOnCourt({ x: -1, y: 100 }, court)).toBeNull()
    expect(locateOnCourt({ x: 100, y: 601 }, court)).toBeNull()
  })
})

describe("suggestAttackType", () => {
  const origin = { x: 150, y: 450 }

  it("suggests pingo near the net, loby deep, shark between", () => {
    expect(suggestAttackType(origin, { x: 150, y: 250 }, court, "A")).toBe("pingo")
    expect(suggestAttackType(origin, { x: 150, y: 20 }, court, "A")).toBe("loby")
    expect(suggestAttackType(origin, { x: 150, y: 150 }, court, "A")).toBe("shark")
  })

  it("suggests ace when the gesture starts behind the scorer's baseline", () => {
    expect(suggestAttackType({ x: 150, y: 640 }, { x: 150, y: 150 }, court, "A")).toBe("ace")
    expect(suggestAttackType({ x: 150, y: -40 }, { x: 150, y: 450 }, court, "B")).toBe("ace")
  })
})

describe("clampToOwnHalf", () => {
  it("keeps team A below the net and allows stepping behind the baseline", () => {
    expect(clampToOwnHalf({ x: 150, y: 100 }, "A", court, 24, 20)).toEqual({ x: 150, y: 324 })
    expect(clampToOwnHalf({ x: 150, y: 700 }, "A", court, 24, 20)).toEqual({ x: 150, y: 620 })
  })

  it("keeps team B above the net and inside the sides", () => {
    expect(clampToOwnHalf({ x: -50, y: 500 }, "B", court, 24, 20)).toEqual({ x: 24, y: 276 })
    expect(clampToOwnHalf({ x: 150, y: -100 }, "B", court, 24, 20)).toEqual({ x: 150, y: -20 })
  })
})

describe("toCourtPosition", () => {
  it("normalises to the court rectangle, allowing values outside 0..1", () => {
    const offset = { x: 10, y: 20, width: 200, height: 400 }
    expect(toCourtPosition({ x: 110, y: 220 }, offset)).toEqual({ x: 0.5, y: 0.5 })
    expect(toCourtPosition({ x: 10, y: 440 }, offset)).toEqual({ x: 0, y: 1.05 })
  })
})
