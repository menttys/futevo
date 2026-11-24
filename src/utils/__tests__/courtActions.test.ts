import {
  confirmedPoint,
  OPPONENT_ERROR_POINT,
  placeLanding,
  resolveDrop,
  resolveOpponentError,
  resolveTap,
  screenPhase,
  squareFor,
  TAP_SLOP,
  toggleAttack,
  tokenAt,
} from "../courtActions"
import type { CourtToken, PlacedLanding, Squares } from "../courtActions"
import { zoneCenter } from "../courtSelection"

// Court-mode rules. These pin down what each touch does, so a refactor of the screen can't quietly
// change them. Court: 300 × 600, so every square is 100 × 100. Team B is the top half (y 0–300),
// Team A the bottom half (y 300–600); zones are row-major from the top of each half.
const court = { x: 0, y: 0, width: 300, height: 600 }

const token = (id: string, team: "A" | "B", zone: CourtToken["zone"]): CourtToken => ({
  id,
  team,
  zone,
  center: zoneCenter(team, zone, court),
})

// Home squares: Team A left on 4, right on 6; Team B mirrored (left on 6, right on 4).
const vitinho = token("vitinho", "A", 4) // centre (50, 450)
const kaiky = token("kaiky", "A", 6) // centre (250, 450)
const gilmar = token("gilmar", "B", 6) // centre (250, 150)
const marcinho = token("marcinho", "B", 4) // centre (50, 150)
const tokens = [vitinho, kaiky, gilmar, marcinho]

const NO_SQUARES: Squares = {}

const drop = (
  carried: CourtToken,
  end: { x: number; y: number },
  extra: { squares?: Squares; placed?: PlacedLanding | null; start?: { x: number; y: number } } = {}
) =>
  resolveDrop({
    token: carried,
    tokens,
    start: extra.start ?? carried.center,
    end,
    court,
    squares: extra.squares ?? NO_SQUARES,
    placed: extra.placed ?? null,
  })

describe("squareFor", () => {
  it("puts players on their home square until they are moved", () => {
    expect(squareFor("vitinho", "A", 0, NO_SQUARES)).toBe(4)
    expect(squareFor("kaiky", "A", 1, NO_SQUARES)).toBe(6)
    expect(squareFor("gilmar", "B", 0, NO_SQUARES)).toBe(6)
    expect(squareFor("marcinho", "B", 1, NO_SQUARES)).toBe(4)
  })

  it("uses the square a player was moved to", () => {
    expect(squareFor("vitinho", "A", 0, { vitinho: 7 })).toBe(7)
    expect(squareFor("kaiky", "A", 1, { vitinho: 7 })).toBe(6)
  })
})

describe("tokenAt", () => {
  it("finds the token under the touch", () => {
    expect(tokenAt(tokens, { x: 60, y: 440 }, 35)?.id).toBe("vitinho")
  })

  it("finds nothing on an empty square", () => {
    expect(tokenAt(tokens, { x: 150, y: 450 }, 35)).toBeUndefined()
  })
})

describe("resolveDrop: releasing a carried player", () => {
  describe("across the net (the landing)", () => {
    it("places the landing exactly where the finger let go, not at the zone centre", () => {
      const outcome = drop(vitinho, { x: 172, y: 61 })
      expect(outcome).toEqual({
        kind: "place",
        placed: {
          playerId: "vitinho",
          hit: { side: "B", zone: 2 },
          landing: { x: 172, y: 61 },
          attackType: "loby",
        },
      })
    })

    it("pre-selects the attack from how deep the ball lands", () => {
      const attackAt = (y: number) => {
        const outcome = drop(vitinho, { x: 150, y })
        return outcome.kind === "place" ? outcome.placed.attackType : undefined
      }
      expect(attackAt(250)).toBe("pingo") // row next to the net
      expect(attackAt(150)).toBe("shark") // middle row
      expect(attackAt(50)).toBe("loby") // baseline row
    })

    it("works the same for the top team throwing down", () => {
      const outcome = drop(gilmar, { x: 40, y: 580 })
      expect(outcome.kind).toBe("place")
      if (outcome.kind === "place") {
        expect(outcome.placed.hit).toEqual({ side: "A", zone: 7 })
        expect(outcome.placed.landing).toEqual({ x: 40, y: 580 })
      }
    })

    it("replaces a landing placed earlier", () => {
      const earlier = placeLanding(kaiky, { x: 250, y: 50 }, { side: "B", zone: 3 }, court)
      const outcome = drop(vitinho, { x: 50, y: 250 }, { placed: earlier })
      expect(outcome.kind).toBe("place")
      if (outcome.kind === "place") expect(outcome.placed.playerId).toBe("vitinho")
    })
  })

  describe("on the player's own side (where the attack starts)", () => {
    it("moves the player to the square they were dropped on", () => {
      expect(drop(vitinho, { x: 50, y: 560 })).toEqual({
        kind: "move",
        squares: { vitinho: 7 },
        placed: null,
      })
    })

    it("swaps with a teammate already on that square", () => {
      expect(drop(vitinho, { x: 250, y: 450 })).toEqual({
        kind: "move",
        squares: { vitinho: 6, kaiky: 4 },
        placed: null,
      })
    })

    it("keeps where everyone else was moved", () => {
      const outcome = drop(vitinho, { x: 150, y: 350 }, { squares: { gilmar: 3 } })
      expect(outcome).toMatchObject({ kind: "move", squares: { gilmar: 3, vitinho: 2 } })
    })

    it("lets the top team move on its own half too", () => {
      expect(drop(gilmar, { x: 150, y: 50 })).toMatchObject({
        kind: "move",
        squares: { gilmar: 2 },
      })
    })

    it("keeps the mover's landing and re-suggests the attack from the new square", () => {
      const placed: PlacedLanding = {
        playerId: "vitinho",
        hit: { side: "B", zone: 2 },
        landing: { x: 160, y: 40 },
        attackType: "head",
      }
      const outcome = drop(vitinho, { x: 50, y: 560 }, { placed })
      expect(outcome.kind).toBe("move")
      if (outcome.kind === "move") {
        expect(outcome.placed).toEqual({ ...placed, attackType: "loby" })
      }
    })

    it("re-bases a swapped teammate's landing onto their new square", () => {
      const placed = placeLanding(kaiky, { x: 150, y: 250 }, { side: "B", zone: 8 }, court)
      const outcome = drop(vitinho, { x: 250, y: 450 }, { placed })
      expect(outcome.kind).toBe("move")
      if (outcome.kind === "move") {
        expect(outcome.placed?.playerId).toBe("kaiky")
        expect(outcome.placed?.landing).toEqual({ x: 150, y: 250 })
      }
    })

    it("leaves another player's landing alone", () => {
      const placed = placeLanding(gilmar, { x: 150, y: 550 }, { side: "A", zone: 8 }, court)
      const outcome = drop(vitinho, { x: 50, y: 560 }, { placed })
      expect(outcome).toMatchObject({ kind: "move", placed })
    })
  })

  describe("putting the player back down", () => {
    it("does nothing when the finger never left the slop (a tap)", () => {
      expect(drop(vitinho, { x: vitinho.center.x + TAP_SLOP - 1, y: vitinho.center.y })).toEqual({
        kind: "none",
      })
    })

    it("does nothing when released on the player's own square", () => {
      expect(drop(vitinho, { x: 90, y: 410 })).toEqual({ kind: "none" })
    })
  })

  describe("off the court", () => {
    it("cancels when released outside the lines", () => {
      expect(drop(vitinho, { x: -20, y: 250 })).toEqual({ kind: "cancel" })
      expect(drop(vitinho, { x: 320, y: 450 })).toEqual({ kind: "cancel" })
      expect(drop(gilmar, { x: 150, y: -10 })).toEqual({ kind: "cancel" })
    })
  })

  it("judges the drop by where the finger ended, wherever the drag passed through", () => {
    // Started on the player's square, crossed their own side, released across the net.
    const outcome = drop(vitinho, { x: 280, y: 20 }, { start: { x: 55, y: 455 } })
    expect(outcome).toMatchObject({ kind: "place", placed: { hit: { side: "B", zone: 3 } } })
  })
})

describe("resolveTap", () => {
  const tap = (
    point: { x: number; y: number },
    state: { placed?: PlacedLanding | null; errorMode?: boolean } = {}
  ) =>
    resolveTap({
      point,
      tokens,
      court,
      placed: state.placed ?? null,
      errorMode: state.errorMode ?? false,
      hitRadius: 35,
    })

  const placed = placeLanding(vitinho, { x: 150, y: 50 }, { side: "B", zone: 2 }, court)

  it("moves a placed landing to exactly the spot tapped on the other side", () => {
    expect(tap({ x: 270, y: 120 }, { placed })).toEqual({
      kind: "moveLanding",
      placed: {
        playerId: "vitinho",
        hit: { side: "B", zone: 6 },
        landing: { x: 270, y: 120 },
        attackType: "shark",
      },
    })
  })

  it("ignores taps on the scorer's own side or off the court", () => {
    expect(tap({ x: 150, y: 550 }, { placed })).toEqual({ kind: "none" })
    expect(tap({ x: -10, y: 100 }, { placed })).toEqual({ kind: "none" })
  })

  it("does nothing with no landing placed", () => {
    expect(tap({ x: 150, y: 50 })).toEqual({ kind: "none" })
  })

  it("after Opp. error, gives the point to the tapped player's team", () => {
    expect(tap(gilmar.center, { errorMode: true })).toEqual({ kind: "opponentError", team: "B" })
    expect(tap(vitinho.center, { errorMode: true })).toEqual({ kind: "opponentError", team: "A" })
  })

  it("after Opp. error, ignores taps that miss every player, even with a landing placed", () => {
    expect(tap({ x: 150, y: 50 }, { errorMode: true, placed })).toEqual({ kind: "none" })
  })
})

describe("resolveOpponentError (the Opp. error button)", () => {
  it("records straight away for the placed player's team", () => {
    const placed = placeLanding(gilmar, { x: 150, y: 550 }, { side: "A", zone: 8 }, court)
    expect(resolveOpponentError(placed, tokens)).toEqual({ kind: "record", team: "B" })
  })

  it("toggles tap-a-player mode when nothing is placed", () => {
    expect(resolveOpponentError(null, tokens)).toEqual({ kind: "toggleMode" })
  })

  it("records an opponent error with no zone or scorer", () => {
    expect(OPPONENT_ERROR_POINT).toEqual({ attackType: "opponentError" })
  })
})

describe("confirmedPoint (the Confirm point button)", () => {
  const placed: PlacedLanding = {
    playerId: "vitinho",
    hit: { side: "B", zone: 2 },
    landing: { x: 172, y: 61 },
    attackType: "loby",
  }

  it("records the zone, attack, scorer, and where the shot started and landed", () => {
    expect(confirmedPoint(placed, vitinho, court)).toEqual({
      zone: 2,
      attackType: "loby",
      scoringPlayerId: "vitinho",
      shotFrom: { x: 50 / 300, y: 450 / 600 },
      landedAt: { x: 172 / 300, y: 61 / 600 },
    })
  })

  it("records the shot from the square the player was moved to", () => {
    const moved = token("vitinho", "A", 7)
    expect(confirmedPoint(placed, moved, court).shotFrom).toEqual({ x: 50 / 300, y: 550 / 600 })
  })

  it("leaves out where an ace started", () => {
    expect(
      confirmedPoint({ ...placed, attackType: "ace" }, vitinho, court).shotFrom
    ).toBeUndefined()
  })

  it("keeps an attack type the user cleared as cleared", () => {
    expect(confirmedPoint({ ...placed, attackType: undefined }, vitinho, court).attackType).toBe(
      undefined
    )
  })
})

describe("toggleAttack (the attack chips in the points sheet)", () => {
  const placed = placeLanding(vitinho, { x: 150, y: 50 }, { side: "B", zone: 2 }, court)

  it("selects another attack", () => {
    expect(toggleAttack(placed, "shark").attackType).toBe("shark")
  })

  it("clears the attack when the selected chip is tapped again", () => {
    expect(toggleAttack(placed, "loby").attackType).toBeUndefined()
  })

  it("never touches the landing", () => {
    const next = toggleAttack(placed, "pingo")
    expect(next.landing).toEqual(placed.landing)
    expect(next.hit).toEqual(placed.hit)
  })
})

describe("screenPhase", () => {
  it("shows the drag while one is in progress, over everything else", () => {
    expect(screenPhase("move", true, true)).toBe("move")
    expect(screenPhase("valid", false, true)).toBe("valid")
  })

  it("shows Opp. error mode over a placed landing", () => {
    expect(screenPhase(null, true, true)).toBe("error")
  })

  it("shows a placed landing, else idle", () => {
    expect(screenPhase(null, false, true)).toBe("placed")
    expect(screenPhase(null, false, false)).toBe("idle")
  })
})
