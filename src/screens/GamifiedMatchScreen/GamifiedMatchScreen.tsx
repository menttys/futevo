import React, { useEffect, useMemo, useRef, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import type { LayoutChangeEvent } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Svg, { Circle, Line } from "react-native-svg"
import { useUnistyles } from "react-native-unistyles"

import type { AttackTypeId, CourtZone, Player, TeamSide } from "@/@types/futevo"
import { AttackTypePicker } from "@/components/AttackTypePicker"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { useMatches } from "@/hooks/useMatches"
import { RotateCcw, X } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { heatGradient } from "@/utils/heatMap"
import { confirmAction } from "@/utils/confirmAction"
import type { CourtHit, CourtRect, Point2D } from "@/utils/courtGesture"
import {
  clampToOwnHalf,
  locateOnCourt,
  suggestAttackType,
  toCourtPosition,
  zoneRect,
} from "@/utils/courtGesture"
import { useLanguage } from "@/i18n"

import { COURT_MARGIN, styles, TOKEN_SIZE } from "./GamifiedMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "GamifiedMatch">
type GamifiedRouteProp = RouteProp<MatchesStackParamList, "GamifiedMatch">

type Token = { player: Player; team: TeamSide; center: Point2D }

type Drag = { playerId: string; origin: Point2D; current: Point2D }

// A finished gesture waiting for the user to choose the attack type and confirm.
type PendingPoint = {
  player: Player
  team: TeamSide
  origin: Point2D
  landing: Point2D
  // null when the ball landed outside the court lines.
  hit: CourtHit | null
  attackType?: AttackTypeId
}

// Same red-to-green band as the net on the stats court.
const NET_BANDS = heatGradient(32)

const COURT_ZONES: CourtZone[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const COURT_CELLS = (["B", "A"] as const).flatMap((side) =>
  COURT_ZONES.map((zone) => ({ side, zone }))
)

// Moving less than this between touch-down and release counts as a tap.
const TAP_SLOP = 12
const TOKEN_HIT_RADIUS = TOKEN_SIZE * 0.8
// Holding a player this long (without moving) switches the drag from "aim the ball" to
// "move the player".
const HOLD_TO_MOVE_MS = 300
// How far past its own baseline a player can be dragged (to take a serve).
const BEHIND_BASELINE = 20

export function GamifiedMatchScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<GamifiedRouteProp>().params
  const allPlayers = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const { addPoint, undoLastPoint } = useMatches()

  const [arena, setArena] = useState({ width: 0, height: 0 })
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [drag, setDrag] = useState<Drag | null>(null)
  const [pending, setPending] = useState<PendingPoint | null>(null)
  const [invalidDrop, setInvalidDrop] = useState(false)
  // Where the user has moved each player to; players without an entry stand at their default spot.
  const [positions, setPositions] = useState<Record<string, Point2D>>({})
  const [movingId, setMovingId] = useState<string | undefined>()

  // Gesture callbacks fire between renders, so the in-flight drag lives in a ref.
  const dragRef = useRef<
    (Drag & { startedOnToken: boolean; mode: "pending" | "aim" | "move" }) | null
  >(null)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (match?.status === "completed") {
      navigation.replace("MatchDetail", { matchId })
    }
  }, [match?.status, matchId, navigation])

  const court: CourtRect = useMemo(
    () => ({
      x: COURT_MARGIN,
      y: COURT_MARGIN,
      width: Math.max(0, arena.width - COURT_MARGIN * 2),
      height: Math.max(0, arena.height - COURT_MARGIN * 2),
    }),
    [arena]
  )

  // Each team's tuple order is the side it plays: [0] = left from its own point of view,
  // so Team B (drawn upside down relative to Team A) has its left player on the screen's right.
  const tokens: Token[] = useMemo(() => {
    if (!match) return []
    const half = court.height / 2
    const place = (ids: [string, string], team: TeamSide): Token[] =>
      ids.flatMap((id, index) => {
        const player = allPlayers.find((p) => p.id === id)
        if (!player) return []
        const leftFraction = team === "A" ? 0.25 : 0.75
        const fraction = index === 0 ? leftFraction : 1 - leftFraction
        const depth = court.y + (team === "A" ? half + half * 0.7 : half * 0.3)
        const center = positions[id] ?? { x: court.x + court.width * fraction, y: depth }
        return [{ player, team, center }]
      })
    return [...place(match.teamA, "A"), ...place(match.teamB, "B")]
  }, [match, allPlayers, court, positions])

  if (!match) return null

  const tokenAt = (point: Point2D): Token | undefined =>
    tokens.find(
      (token) =>
        Math.hypot(token.center.x - point.x, token.center.y - point.y) <= TOKEN_HIT_RADIUS
    )

  const resolveDrop = (player: Player, team: TeamSide, origin: Point2D, landing: Point2D) => {
    const hit = locateOnCourt(landing, court)
    // The ball has to end up on the opponent's side (or out) to be a point for this team.
    if (hit && hit.side === team) {
      setInvalidDrop(true)
      return
    }
    setInvalidDrop(false)
    setPending({
      player,
      team,
      origin,
      landing,
      hit,
      attackType: hit ? suggestAttackType(origin, landing, court, team) : undefined,
    })
  }

  const clearHoldTimer = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holdTimer.current = undefined
  }

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .minDistance(0)
    .enabled(!pending)
    .onBegin((event) => {
      const point = { x: event.x, y: event.y }
      const token = tokenAt(point)
      const playerId = token?.player.id ?? selectedId
      if (!playerId) return
      const origin = token ? token.center : point
      dragRef.current = {
        playerId,
        origin,
        current: point,
        startedOnToken: !!token,
        mode: token ? "pending" : "aim",
      }
      if (token) {
        holdTimer.current = setTimeout(() => {
          const active = dragRef.current
          if (active?.mode !== "pending") return
          active.mode = "move"
          setSelectedId(active.playerId)
          setMovingId(active.playerId)
        }, HOLD_TO_MOVE_MS)
      }
    })
    .onUpdate((event) => {
      const active = dragRef.current
      if (!active) return
      active.current = { x: event.x, y: event.y }

      if (active.mode === "move") {
        const token = tokens.find((candidate) => candidate.player.id === active.playerId)
        if (!token) return
        const next = clampToOwnHalf(
          active.current,
          token.team,
          court,
          TOKEN_SIZE / 2,
          BEHIND_BASELINE
        )
        setPositions((current) => ({ ...current, [active.playerId]: next }))
        return
      }

      const travelled = Math.hypot(event.x - active.origin.x, event.y - active.origin.y)
      if (travelled <= TAP_SLOP) return
      // Moving before the hold timer fires means the user is aiming the ball.
      if (active.mode === "pending") {
        clearHoldTimer()
        active.mode = "aim"
      }
      setInvalidDrop(false)
      setDrag({ playerId: active.playerId, origin: active.origin, current: active.current })
    })
    .onFinalize((event, success) => {
      clearHoldTimer()
      const active = dragRef.current
      dragRef.current = null
      setDrag(null)
      setMovingId(undefined)
      if (!active || !success || active.mode === "move") return

      const landing = { x: event.x, y: event.y }
      const travelled = Math.hypot(landing.x - active.origin.x, landing.y - active.origin.y)

      if (travelled <= TAP_SLOP) {
        // A tap on a token toggles the selection; a tap elsewhere does nothing.
        if (active.startedOnToken) {
          setInvalidDrop(false)
          setSelectedId((current) => (current === active.playerId ? undefined : active.playerId))
        }
        return
      }

      const token = tokens.find((candidate) => candidate.player.id === active.playerId)
      if (!token) return
      setSelectedId(token.player.id)
      resolveDrop(token.player, token.team, active.origin, landing)
    })

  const handleCancelPending = () => setPending(null)

  const handleConfirm = () => {
    if (!pending) return
    // An ace is always a serve, so where the gesture started says nothing about it.
    const trajectory = {
      shotFrom:
        pending.attackType === "ace" ? undefined : toCourtPosition(pending.origin, court),
      landedAt: toCourtPosition(pending.landing, court),
    }
    addPoint(
      match.id,
      pending.team,
      pending.hit
        ? {
            zone: pending.hit.zone,
            attackType: pending.attackType,
            scoringPlayerId: pending.player.id,
            ...trajectory,
          }
        : { ballOut: true, ...trajectory }
    )
    setPending(null)
    setSelectedId(undefined)
    // Next rally: everyone goes back to their starting spot.
    setPositions({})
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

  const selectedPlayer = allPlayers.find((p) => p.id === selectedId)
  const line = drag ?? (pending ? { origin: pending.origin, current: pending.landing } : null)
  const liveHit = drag ? locateOnCourt(drag.current, court) : (pending?.hit ?? null)
  const draggingTeam = drag ? tokens.find((tk) => tk.player.id === drag.playerId)?.team : pending?.team
  const highlight =
    liveHit && liveHit.side !== draggingTeam ? zoneRect(liveHit.side, liveHit.zone, court) : null

  const hint = movingId
    ? t("gamified.hintMoving")
    : invalidDrop
    ? t("gamified.hintInvalid")
    : selectedPlayer
      ? t("gamified.hintDrag", { name: selectedPlayer.name })
      : t("gamified.hintPick")

  const canUndo = match.points.length > 0
  // Landing in the lower half of the arena (Team A's side) puts the sheet on top, and vice versa.
  const sheetAnchor = pending && pending.landing.y > arena.height / 2 ? "top" : "bottom"

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          hitSlop={theme.hitSlop.md}
        >
          <X size={26} color={theme.colors.white} />
        </TouchableOpacity>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText("A")}>{match.scoreA}</Text>
          <Text style={styles.scoreDivider}>–</Text>
          <Text style={styles.scoreText("B")}>{match.scoreB}</Text>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleUndo}
          disabled={!canUndo}
          hitSlop={theme.hitSlop.md}
        >
          <RotateCcw size={22} color={canUndo ? theme.colors.white : theme.colors.grey500} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.hint, invalidDrop && styles.hintError]}>{hint}</Text>

      <GestureDetector gesture={gesture}>
        <View style={styles.arena} onLayout={handleLayout}>
          {arena.width > 0 ? (
            <>
              {COURT_CELLS.map(({ side, zone }) => (
                <View
                  key={`${side}${zone}`}
                  style={styles.cell(zoneRect(side, zone, court))}
                  pointerEvents="none"
                />
              ))}
              {highlight ? (
                <View style={styles.zoneHighlight(highlight)} pointerEvents="none" />
              ) : null}
              <View style={styles.net(court)} pointerEvents="none">
                {NET_BANDS.map((color, index) => (
                  <View key={index} style={styles.netBand(color)} />
                ))}
                <Text style={styles.netLabel}>{t("court.net")}</Text>
              </View>

              {tokens.map((token) => {
                const selected = token.player.id === selectedId || token.player.id === movingId
                return (
                  <View
                    key={token.player.id}
                    style={styles.token(token.center.x, token.center.y)}
                    pointerEvents="none"
                  >
                    <PlayerAvatar
                      name={token.player.name}
                      photoUri={token.player.photoUri}
                      size={TOKEN_SIZE}
                      selected={selected}
                    />
                    <Text style={styles.tokenName(selected)} numberOfLines={1}>
                      {token.player.name}
                    </Text>
                  </View>
                )
              })}

              {line ? (
                <Svg style={styles.overlay} pointerEvents="none">
                  <Line
                    x1={line.origin.x}
                    y1={line.origin.y}
                    x2={line.current.x}
                    y2={line.current.y}
                    stroke={theme.colors.primary}
                    strokeWidth={4}
                    strokeDasharray="10 8"
                    strokeLinecap="round"
                  />
                  <Circle cx={line.origin.x} cy={line.origin.y} r={7} fill={theme.colors.white} />
                  <Circle
                    cx={line.current.x}
                    cy={line.current.y}
                    r={11}
                    fill={theme.colors.primary}
                    stroke={theme.colors.dark}
                    strokeWidth={3}
                  />
                </Svg>
              ) : null}
            </>
          ) : null}
        </View>
      </GestureDetector>

      {/* Always reserved, so the sheet (absolute) opening never resizes the arena. */}
      <View style={{ height: insets.bottom }} />

      {pending ? (
        <View
          style={[
            styles.sheet(sheetAnchor),
            sheetAnchor === "bottom"
              ? { paddingBottom: insets.bottom + theme.spacing.lg }
              : { paddingTop: insets.top + theme.spacing.md },
          ]}
        >
          <Text style={styles.sheetTitle}>
            {t("gamified.pointFor", { name: pending.player.name })}
          </Text>
          <Text style={styles.sheetSubtitle}>
            {pending.hit
              ? t("gamified.landedIn", {
                  side: pending.team === "A" ? "B" : "A",
                  zone: pending.hit.zone,
                })
              : t("point.ballOut")}
          </Text>
          {pending.hit ? (
            <>
              <Text style={styles.sheetLabel}>{t("point.attackType")}</Text>
              <AttackTypePicker
                selected={pending.attackType}
                onSelect={(next) =>
                  setPending((current) =>
                    current
                      ? { ...current, attackType: current.attackType === next ? undefined : next }
                      : current
                  )
                }
              />
            </>
          ) : null}
          <View style={styles.sheetActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPending}>
              <Text style={styles.cancelLabel}>{t("common.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmLabel}>{t("point.confirm")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  )
}
