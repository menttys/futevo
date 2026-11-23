import React, { useEffect, useMemo, useRef, useState } from "react"
import { Pressable, Text, View } from "react-native"
import type { LayoutChangeEvent } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Svg, { Path } from "react-native-svg"
import { useUnistyles } from "react-native-unistyles"

import type { AttackTypeId, CourtZone, Player, TeamSide } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { AttackTypePicker } from "@/components/AttackTypePicker"
import { CourtNet } from "@/components/CourtNet"
import { CourtStatusChip } from "@/components/CourtStatusChip"
import type { CourtStatusChipProps } from "@/components/CourtStatusChip/CourtStatusChip.d"
import { FutevoMark } from "@/components/FutevoMark"
import { MeshBackground } from "@/components/MeshBackground"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { useMatches } from "@/hooks/useMatches"
import { useLanguage } from "@/i18n"
import { Undo, X } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { confirmAction } from "@/utils/confirmAction"
import type { CourtHit, Point2D } from "@/utils/courtGesture"
import { locateOnCourt, suggestAttackType, toCourtPosition, zoneRect } from "@/utils/courtGesture"
import type { SelectionPhase } from "@/utils/courtSelection"
import {
  arcPath,
  dragPhase,
  fitCourt,
  homeZone,
  netEdge,
  opponentOf,
  zoneCenter,
} from "@/utils/courtSelection"
import { firstName, sideLabel } from "@/utils/matchLabels"

import type { CellTint, TokenVariant } from "./GamifiedMatchScreen.styles"
import {
  COURT_FIT,
  LANDING_MARK_SIZE,
  LIFTED_SIZE,
  styles,
  TOKEN_SIZE,
} from "./GamifiedMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "GamifiedMatch">
type GamifiedRouteProp = RouteProp<MatchesStackParamList, "GamifiedMatch">

// Every player stands on a square of their own half.
type Token = { player: Player; team: TeamSide; zone: CourtZone; center: Point2D }

// A token being carried: where the finger went down and where it is now.
type Drag = { playerId: string; start: Point2D; current: Point2D }

// A released landing, waiting for the points sheet to confirm it. `landing` is exactly where the
// finger let go; `hit` is the zone that point falls in.
type Placed = { playerId: string; hit: CourtHit; landing: Point2D; attackType?: AttackTypeId }

// "error": Opp. error was pressed with nobody picked up; the next token tapped wins the point.
type ScreenPhase = SelectionPhase | "error"

const COURT_ZONES: CourtZone[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const COURT_CELLS = (["B", "A"] as const).flatMap((side) =>
  COURT_ZONES.map((zone) => ({ side, zone }))
)

// Moving less than this between touch-down and release counts as a tap.
const TAP_SLOP = 12
const TOKEN_HIT_RADIUS = TOKEN_SIZE * 0.8
// Stable fallback so the token memo doesn't recompute while players are loading.
const NO_PLAYERS: Player[] = []

export function GamifiedMatchScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<GamifiedRouteProp>().params
  const allPlayers = usePlayerStore((s) => s.players) ?? NO_PLAYERS
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournamentId = match?.tournamentId
  const tournament = useTournamentStore((s) =>
    tournamentId ? s.tournaments?.find((entry) => entry.id === tournamentId) : undefined
  )
  const { addPoint, undoLastPoint } = useMatches()

  const [arena, setArena] = useState({ width: 0, height: 0 })
  const [drag, setDrag] = useState<Drag | null>(null)
  const [placed, setPlaced] = useState<Placed | null>(null)
  const [errorMode, setErrorMode] = useState(false)
  // The square each player was moved to (where their attack starts); others stand on their home square.
  const [squares, setSquares] = useState<Record<string, CourtZone>>({})

  // Gesture callbacks fire between renders, so the token being carried (and the last point the
  // finger reached) lives in a ref.
  const carryRef = useRef<{ playerId: string; start: Point2D; current: Point2D } | null>(null)

  useEffect(() => {
    if (match?.status === "completed") {
      navigation.replace("MatchDetail", { matchId })
    }
  }, [match?.status, matchId, navigation])

  const court = useMemo(() => fitCourt(arena, COURT_FIT.margin, COURT_FIT.maxCell), [arena])

  // Each team's tuple order is the side it plays: [0] = left from its own point of view.
  const tokens: Token[] = useMemo(() => {
    if (!match) return []
    const place = (ids: [string, string], team: TeamSide): Token[] =>
      ids.flatMap((id, index) => {
        const player = allPlayers.find((p) => p.id === id)
        if (!player) return []
        const zone = squares[id] ?? homeZone(team, index === 0 ? 0 : 1)
        return [{ player, team, zone, center: zoneCenter(team, zone, court) }]
      })
    return [...place(match.teamA, "A"), ...place(match.teamB, "B")]
  }, [match, allPlayers, court, squares])

  if (!match) return null

  const tokenAt = (point: Point2D): Token | undefined =>
    tokens.find(
      (token) => Math.hypot(token.center.x - point.x, token.center.y - point.y) <= TOKEN_HIT_RADIUS
    )
  const tokenFor = (playerId: string | undefined): Token | undefined =>
    playerId ? tokens.find((token) => token.player.id === playerId) : undefined

  // After a point: clear the landing and send everyone back to their home square for the next rally.
  const resetSelection = () => {
    setPlaced(null)
    setErrorMode(false)
    setSquares({})
  }

  // Dropping a player on another square of their own side moves them there: that square is where
  // the attack is taken from. A teammate already standing there swaps onto the square just left.
  const movePlayer = (token: Token, zone: CourtZone) => {
    const teammate = tokens.find(
      (other) =>
        other.team === token.team && other.player.id !== token.player.id && other.zone === zone
    )
    setSquares((current) => ({
      ...current,
      [token.player.id]: zone,
      ...(teammate ? { [teammate.player.id]: token.zone } : {}),
    }))
    // A landing already placed now flies from the mover's (or swapped teammate's) new square.
    if (placed?.playerId === token.player.id) {
      setPlaced(placeAt(token, placed.landing, placed.hit, zoneCenter(token.team, zone, court)))
    } else if (teammate && placed?.playerId === teammate.player.id) {
      setPlaced(
        placeAt(teammate, placed.landing, placed.hit, zoneCenter(token.team, token.zone, court))
      )
    }
  }

  const recordOpponentError = (team: TeamSide) => {
    addPoint(match.id, team, { attackType: "opponentError" })
    resetSelection()
  }

  // Dragging a token. onBegin fires on touch-down (before the pan activates), so the token
  // lifts as soon as it is touched; the pan itself only activates once the finger moves.
  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(TAP_SLOP)
    .onBegin((event) => {
      const point = { x: event.x, y: event.y }
      const token = errorMode ? undefined : tokenAt(point)
      if (!token) return
      carryRef.current = { playerId: token.player.id, start: point, current: point }
      setDrag({ playerId: token.player.id, start: point, current: point })
    })
    .onUpdate((event) => {
      const carry = carryRef.current
      if (!carry) return
      carry.current = { x: event.x, y: event.y }
      setDrag({ playerId: carry.playerId, start: carry.start, current: carry.current })
    })
    // The drop is decided from the last point the finger was seen at, not from the final event or
    // its `success` flag: a gesture that ends as cancelled (another recognizer, a system touch,
    // a re-attach) would otherwise drop the landing and snap the token back.
    .onFinalize(() => {
      const carry = carryRef.current
      carryRef.current = null
      setDrag(null)
      if (!carry) return
      const token = tokenFor(carry.playerId)
      if (!token) return
      // Never left the slop (a tap): dragPhase says "picked" and nothing changes.
      const { phase, hit } = dragPhase(carry.start, carry.current, token.team, court, TAP_SLOP)
      if (phase === "valid" && hit) {
        // The landing stays exactly where the finger let go.
        setPlaced(placeAt(token, carry.current, hit))
      } else if (phase === "move" && hit) {
        movePlayer(token, hit.zone)
      }
      // Released off the court: cancel.
      else if (phase === "off") setPlaced(null)
    })

  // Taps: pick the winning team after Opp. error, or move a placed landing to another square.
  const tap = Gesture.Tap()
    .runOnJS(true)
    .maxDistance(TAP_SLOP)
    .onEnd((event, success) => {
      if (!success) return
      const point = { x: event.x, y: event.y }
      if (errorMode) {
        const token = tokenAt(point)
        if (token) recordOpponentError(token.team)
        return
      }
      // Tapping the other side moves the landing to exactly where the tap was.
      const placedToken = tokenFor(placed?.playerId)
      const hit = locateOnCourt(point, court)
      if (placedToken && hit && hit.side !== placedToken.team) {
        setPlaced(placeAt(placedToken, point, hit))
      }
    })

  const gesture = Gesture.Race(pan, tap)

  // A new landing pre-selects the attack the landing depth suggests; the sheet can change it.
  // `from` defaults to the player's current square.
  function placeAt(token: Token, landing: Point2D, hit: CourtHit, from = token.center): Placed {
    return {
      playerId: token.player.id,
      hit,
      landing,
      attackType: suggestAttackType(from, landing, court, token.team),
    }
  }

  const handleConfirm = () => {
    const token = tokenFor(placed?.playerId)
    if (!placed || !token) return
    // An ace is always a serve, so where the shot started says nothing about it.
    addPoint(match.id, token.team, {
      zone: placed.hit.zone,
      attackType: placed.attackType,
      scoringPlayerId: token.player.id,
      shotFrom: placed.attackType === "ace" ? undefined : toCourtPosition(token.center, court),
      landedAt: toCourtPosition(placed.landing, court),
    })
    resetSelection()
  }

  // Tapping the selected chip again clears it, as on the points screen.
  const handleSelectAttack = (next: AttackTypeId) =>
    setPlaced((current) =>
      current ? { ...current, attackType: current.attackType === next ? undefined : next } : current
    )

  // With a player placed the error goes to their team; otherwise the next token tapped decides.
  const handleOpponentError = () => {
    const placedToken = tokenFor(placed?.playerId)
    if (placedToken) {
      recordOpponentError(placedToken.team)
      return
    }
    setErrorMode((current) => !current)
  }

  const handleUndo = () => {
    confirmAction({
      title: t("match.undoTitle"),
      message: t("match.undoMessage"),
      confirmLabel: t("match.undoConfirm"),
      onConfirm: () => undoLastPoint(match.id),
    })
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setArena({ width, height })
  }

  // --- Derived selection state -------------------------------------------------------------
  const dragToken = tokenFor(drag?.playerId)
  const live =
    drag && dragToken ? dragPhase(drag.start, drag.current, dragToken.team, court, TAP_SLOP) : null
  const placedToken = tokenFor(placed?.playerId)
  const phase: ScreenPhase = live
    ? live.phase
    : errorMode
      ? "error"
      : placed && placedToken
        ? "placed"
        : "idle"
  const activeToken = dragToken ?? (phase === "placed" ? placedToken : undefined)
  // The half the active player can land on; before anyone is picked, the top half.
  const landingSide: TeamSide = activeToken ? opponentOf(activeToken.team) : "B"
  const hoverHit = live && (live.phase === "valid" || live.phase === "move") ? live.hit : null
  const shownPlaced = phase === "placed" ? placed : null

  const name = activeToken ? firstName(activeToken.player.name) : ""
  const chipPlayer = activeToken
    ? {
        name: activeToken.player.name,
        photoUri: activeToken.player.photoUri,
        team: activeToken.team,
      }
    : undefined
  const playerName = (id: string) => allPlayers.find((p) => p.id === id)?.name ?? ""

  const chip: CourtStatusChipProps = (() => {
    switch (phase) {
      case "picked":
        return {
          title: t("gamified.chipPickedTitle", { name }),
          subtitle: t("gamified.chipPickedSubtitle"),
          tone: "active",
          player: chipPlayer,
        }
      case "valid":
        return {
          title: t("gamified.chipHoldingTitle", { name }),
          subtitle: t("gamified.chipHoldingSubtitle", {
            zone: hoverHit?.zone,
            team: sideLabel(match, tournament, landingSide, playerName),
          }),
          tone: "active",
          player: chipPlayer,
        }
      case "move":
        return {
          title: t("gamified.chipMoveTitle", { name, zone: hoverHit?.zone }),
          subtitle: t("gamified.chipMoveSubtitle"),
          tone: "active",
          player: chipPlayer,
        }
      case "off":
        return {
          title: t("gamified.chipCancelTitle"),
          subtitle: t("gamified.chipCancelSubtitle", { name }),
          tone: "error",
          player: chipPlayer,
        }
      case "placed":
        return {
          title: t("gamified.chipPlacedTitle", { name, zone: placed?.hit.zone }),
          subtitle: t("gamified.chipPlacedSubtitle"),
          tone: "success",
          player: chipPlayer,
        }
      case "error":
        return {
          title: t("gamified.chipErrorTitle"),
          subtitle: t("gamified.chipErrorSubtitle"),
          tone: "active",
        }
      case "idle":
        return {
          title: t("gamified.chipIdleTitle"),
          subtitle: t("gamified.chipIdleSubtitle"),
          tone: "active",
        }
    }
  })()

  const hint = {
    idle: t("gamified.hintIdle"),
    picked: t("gamified.hintPicked"),
    valid: t("gamified.hintValid"),
    move: t("gamified.hintMove"),
    off: t("gamified.hintOff"),
    placed: t("gamified.hintPlaced"),
    error: t("gamified.hintError"),
  }[phase]

  // The dotted flight runs from the player's square to exactly where the finger is (or let go).
  const flight =
    live?.phase === "valid" && drag && dragToken
      ? { from: dragToken.center, to: drag.current }
      : shownPlaced && placedToken
        ? { from: placedToken.center, to: shownPlaced.landing }
        : null

  // The sheet docks on the edge farther from the landing, so the landing stays visible.
  const sheetAnchor = shownPlaced && shownPlaced.landing.y > arena.height / 2 ? "top" : "bottom"

  const canUndo = match.points.length > 0
  const tone = (team: TeamSide) => (team === "A" ? "dark" : "yellow")

  const renderToken = (token: Token, center: Point2D, variant: TokenVariant, key: string) => (
    <View key={key} style={styles.token(center, variant)} pointerEvents="none">
      {variant === "lifted" || variant === "off" ? <View style={styles.halo} /> : null}
      <PlayerAvatar
        name={token.player.name}
        photoUri={token.player.photoUri}
        size={variant === "lifted" || variant === "off" ? LIFTED_SIZE : TOKEN_SIZE}
        tone={tone(token.team)}
      />
    </View>
  )

  return (
    <View style={styles.root}>
      <MeshBackground />
      <View style={styles.topBar}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          hitSlop={theme.hitSlop.sm}
          accessibilityRole="button"
          accessibilityLabel={t("common.close")}
        >
          <X size={18} color={theme.colors.text} />
        </Pressable>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText("A")}>{match.scoreA}</Text>
          <Text style={styles.scoreDivider}>·</Text>
          <Text style={styles.scoreText("B")}>{match.scoreB}</Text>
        </View>
        <Pressable
          style={styles.iconButton}
          onPress={handleUndo}
          disabled={!canUndo}
          hitSlop={theme.hitSlop.sm}
          accessibilityRole="button"
          accessibilityLabel={t("match.undo")}
          accessibilityState={{ disabled: !canUndo }}
        >
          <Undo size={18} color={canUndo ? theme.colors.text : theme.colors.iconMuted} />
        </Pressable>
      </View>

      {/* Above the court, so the finger never covers it. */}
      <View style={styles.chipRow}>
        <CourtStatusChip {...chip} />
      </View>

      <GestureDetector gesture={gesture}>
        <View style={styles.arena} onLayout={handleLayout}>
          {arena.width > 0 ? (
            <>
              {COURT_CELLS.map(({ side, zone }) => {
                // The own-side square a carried player would move to.
                const moveTarget =
                  live?.phase === "move" && hoverHit?.side === side && hoverHit.zone === zone
                const tint: CellTint = moveTarget
                  ? "move"
                  : live && live.phase !== "off" && side === landingSide
                    ? "landing"
                    : "none"
                const occupied = tokens.some((token) => token.team === side && token.zone === zone)
                const showNumber =
                  (side === landingSide && !occupied && phase !== "error") || moveTarget
                return (
                  <View
                    key={`${side}${zone}`}
                    style={styles.cell(zoneRect(side, zone, court), netEdge(side, zone), tint)}
                    pointerEvents="none"
                  >
                    {showNumber ? <Text style={styles.zoneNumber}>{zone}</Text> : null}
                  </View>
                )
              })}

              <CourtNet style={styles.net(court)} accessibilityLabel={t("court.net")} />

              {flight ? (
                <Svg style={styles.overlay} pointerEvents="none">
                  <Path
                    d={arcPath(flight.from, flight.to)}
                    stroke={theme.colors.dark}
                    strokeWidth={3}
                    strokeDasharray="0.1 7"
                    strokeLinecap="round"
                    fill="none"
                  />
                </Svg>
              ) : null}

              {shownPlaced ? (
                <>
                  <View
                    style={styles.placedZone(
                      zoneRect(shownPlaced.hit.side, shownPlaced.hit.zone, court),
                      netEdge(shownPlaced.hit.side, shownPlaced.hit.zone)
                    )}
                    pointerEvents="none"
                  >
                    <Text
                      style={styles.placedTag(
                        shownPlaced.landing.y >
                          zoneCenter(shownPlaced.hit.side, shownPlaced.hit.zone, court).y
                      )}
                    >
                      {t("gamified.zoneLabel", { zone: shownPlaced.hit.zone })}
                    </Text>
                  </View>
                  {/* Small brand mark exactly where the ball landed. */}
                  <View style={styles.landingMark(shownPlaced.landing)} pointerEvents="none">
                    <FutevoMark size={LANDING_MARK_SIZE} color={theme.colors.dark} />
                  </View>
                </>
              ) : null}

              {tokens.map((token) => {
                const key = token.player.id
                if (live && token.player.id === dragToken?.player.id) {
                  // Lifted in place while still on its square; a ghost once it is carried away.
                  return renderToken(
                    token,
                    token.center,
                    live.phase === "picked" ? "lifted" : "ghost",
                    key
                  )
                }
                return renderToken(token, token.center, "rest", key)
              })}

              {live?.phase === "valid" && hoverHit ? (
                <View
                  style={styles.liftedZone(
                    zoneRect(hoverHit.side, hoverHit.zone, court),
                    netEdge(hoverHit.side, hoverHit.zone)
                  )}
                  pointerEvents="none"
                >
                  <Text style={styles.liftedTag}>
                    {t("gamified.zoneLabel", { zone: hoverHit.zone })}
                  </Text>
                </View>
              ) : null}

              {/* Once carried off its square, the token follows the finger exactly. */}
              {live && live.phase !== "picked" && drag && dragToken
                ? renderToken(
                    dragToken,
                    drag.current,
                    live.phase === "off" ? "off" : "lifted",
                    "carried"
                  )
                : null}
            </>
          ) : null}
        </View>
      </GestureDetector>

      <Text style={styles.hint} numberOfLines={2}>
        {hint}
      </Text>
      <View style={styles.footer}>
        <AppButton
          label={t("gamified.oppError")}
          variant={errorMode ? "dark" : "wash"}
          labelStyle="body"
          onPress={handleOpponentError}
          style={styles.footerButton}
        />
        <AppButton
          label={t("point.confirm")}
          variant={phase === "placed" ? "primary" : "wash"}
          labelStyle="body"
          disabled={phase !== "placed"}
          onPress={handleConfirm}
          style={styles.footerButton}
        />
      </View>

      {/* The points sheet: who scored, where it landed, and the attack type to confirm. */}
      {shownPlaced && placedToken ? (
        <View style={styles.sheet(sheetAnchor)}>
          <Text style={styles.sheetTitle}>
            {t("gamified.pointFor", { name: placedToken.player.name })}
          </Text>
          <Text style={styles.sheetSubtitle}>
            {t("gamified.landedIn", {
              team: sideLabel(match, tournament, shownPlaced.hit.side, playerName),
              zone: shownPlaced.hit.zone,
            })}
          </Text>
          <Text style={styles.sheetLabel}>{t("point.attackType")}</Text>
          <AttackTypePicker selected={shownPlaced.attackType} onSelect={handleSelectAttack} />
          <View style={styles.sheetActions}>
            <AppButton
              label={t("common.cancel")}
              variant="wash"
              labelStyle="body"
              onPress={() => setPlaced(null)}
              style={styles.cancelButton}
            />
            <AppButton
              label={t("point.confirm")}
              onPress={handleConfirm}
              style={styles.confirmButton}
            />
          </View>
        </View>
      ) : null}
    </View>
  )
}
