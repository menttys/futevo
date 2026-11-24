import React, { useEffect, useRef } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import type { TeamSide } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { MatchStatusCard } from "@/components/MatchStatusCard"
import { MeshBackground } from "@/components/MeshBackground"
import { ScoreBoard } from "@/components/ScoreBoard"
import { ScreenHeader } from "@/components/ScreenHeader"
import { useMatches } from "@/hooks/useMatches"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { CourtMode, Flag, Undo } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useSettingsStore } from "@/store/settingsState"
import { useTournamentStore } from "@/store/tournamentState"
import { confirmAction } from "@/utils/confirmAction"
import { firstName, pointSummary, sideLabel } from "@/utils/matchLabels"

import { styles } from "./LiveMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "LiveMatch">
type LiveMatchRouteProp = RouteProp<MatchesStackParamList, "LiveMatch">

const RECENT_POINTS = 6

export function LiveMatchScreen() {
  const { theme } = useUnistyles()
  const tabBarInset = useTabBarInset()
  const wide = useSideTabBar()
  const shortcuts = useSettingsStore((s) => s.keyboardShortcuts)
  const keyHandler = useRef<(key: string) => void>(() => {})
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<LiveMatchRouteProp>().params
  const players = usePlayerStore((s) => s.players)
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) =>
    s.tournaments?.find((tr) => tr.id === match?.tournamentId)
  )
  const { undoLastPoint, finishMatch } = useMatches()

  useEffect(() => {
    if (match?.status === "completed") {
      navigation.replace("MatchDetail", { matchId })
    }
  }, [match?.status, matchId, navigation])

  // Desktop shortcuts: A home point, L away point, Z undo. Ignored while typing in a field.
  useEffect(() => {
    if (!wide || !shortcuts) return
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable))
        return
      keyHandler.current(e.key.toLowerCase())
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [wide, shortcuts])

  if (!match) return null

  const playerName = (id: string) =>
    players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer")
  const homeName = sideLabel(match, tournament, "A", playerName)
  const awayName = sideLabel(match, tournament, "B", playerName)

  const handleFinish = () => {
    confirmAction({
      title: t("match.finishTitle"),
      message: t("match.finishMessage"),
      confirmLabel: t("match.finishConfirm"),
      onConfirm: () => finishMatch(match.id),
    })
  }

  const handleUndo = () => {
    confirmAction({
      title: t("match.undoTitle"),
      message: t("match.undoMessage"),
      confirmLabel: t("match.undoConfirm"),
      onConfirm: () => undoLastPoint(match.id),
    })
  }

  const scorePoint = (team: TeamSide) =>
    navigation.navigate("PointEntry", { matchId: match.id, team })
  const canUndo = match.points.length > 0
  // A completed match takes no more points, so the tap-to-score buttons are hidden.
  const isFull = match.status === "completed"
  keyHandler.current = (key) => {
    if (key === "a" && !isFull) scorePoint("A")
    else if (key === "l" && !isFull) scorePoint("B")
    else if (key === "z" && canUndo) handleUndo()
  }
  const recent = match.points.slice(-RECENT_POINTS).reverse()

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("common.live")}
        onBack={() => navigation.goBack()}
        backLabel={t("common.back")}
        right={
          wide ? (
            <AppButton
              label={t("match.finish")}
              variant="outline"
              labelStyle="body"
              onPress={handleFinish}
              icon={<Flag size={18} color={theme.colors.text} />}
              style={styles.headerButton}
            />
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate("GamifiedMatch", { matchId: match.id })}
              style={styles.courtMode}
            >
              <CourtMode size={16} color={theme.colors.text} />
              <Text style={styles.courtModeLabel}>{t("gamified.courtMode")}</Text>
            </Pressable>
          )
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          wide && styles.contentWide,
          { paddingBottom: tabBarInset + 16 },
        ]}
      >
        {wide ? (
          <View style={styles.row}>
            <View style={styles.colMain}>
              <ScoreBoard
                homeName={homeName}
                awayName={awayName}
                scoreA={match.scoreA}
                scoreB={match.scoreB}
                leftNote={t("match.pointsPlayed", { count: match.points.length })}
                rightNote={t("match.firstTo", { target: match.targetScore, winBy: match.winBy })}
              />

              <View style={styles.pointRow}>
                {(["A", "B"] as const).map((side) => (
                  <Pressable
                    key={side}
                    accessibilityRole="button"
                    onPress={() => scorePoint(side)}
                    style={({ pressed }) => [
                      styles.pointButton(side === "B", pressed),
                      styles.pointButtonWide,
                    ]}
                  >
                    <Text style={side === "A" ? styles.pointHintOnDark : styles.pointHint}>
                      {shortcuts
                        ? t("match.clickOrPress", { key: side === "A" ? "A" : "L" })
                        : t("match.tapToScore")}
                    </Text>
                    <Text
                      style={side === "A" ? styles.pointLabelOnDark : styles.pointLabel}
                      numberOfLines={1}
                    >
                      {t("match.pointFor", { team: side === "A" ? homeName : awayName })}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.undoRow}>
                <AppButton
                  label={t("match.undoLast")}
                  variant="wash"
                  labelStyle="body"
                  disabled={!canUndo}
                  onPress={handleUndo}
                  icon={<Undo size={18} color={theme.colors.text} />}
                  style={styles.headerButton}
                />
                {shortcuts ? <Text style={styles.hint}>{t("match.shortcutsHint")}</Text> : null}
              </View>
            </View>
            <View style={styles.colSide}>
              <MatchStatusCard
                detailed
                match={match}
                homeName={homeName}
                awayName={awayName}
                onPress={() => navigation.navigate("MatchStatus", { matchId: match.id })}
              />
              {recent.length > 0 ? (
                <View style={styles.lastCard}>
                  <Text style={styles.lastLabel}>{t("match.lastPoints")}</Text>
                  {recent.map((point) => {
                    const scorer = point.scoringPlayerId
                      ? playerName(point.scoringPlayerId)
                      : undefined
                    const how = point.ballOut
                      ? t("match.ballOut")
                      : point.attackType
                        ? t(`attackTypes.${point.attackType}`)
                        : undefined
                    const detail = [
                      how,
                      point.zone ? t("match.zone", { zone: point.zone }).toLowerCase() : undefined,
                    ]
                      .filter(Boolean)
                      .join(" · ")
                    return (
                      <View key={point.id} style={styles.lastRow}>
                        <View style={styles.lastDot(point.team === "B")} />
                        <Text
                          style={styles.lastScore}
                        >{`${point.scoreAAfter}–${point.scoreBAfter}`}</Text>
                        <Text style={styles.lastPlayer} numberOfLines={1}>
                          {scorer ? firstName(scorer) : point.team === "A" ? homeName : awayName}
                        </Text>
                        <Text style={styles.lastDetail} numberOfLines={1}>
                          {detail}
                        </Text>
                      </View>
                    )
                  })}
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <>
            <ScoreBoard
              homeName={homeName}
              awayName={awayName}
              scoreA={match.scoreA}
              scoreB={match.scoreB}
              leftNote={t("match.pointsPlayed", { count: match.points.length })}
              rightNote={t("match.firstTo", { target: match.targetScore, winBy: match.winBy })}
            />

            {!isFull &&
              (["A", "B"] as const).map((side) => (
                <Pressable
                  key={side}
                  accessibilityRole="button"
                  onPress={() => scorePoint(side)}
                  style={({ pressed }) => styles.pointButton(side === "B", pressed)}
                >
                  <Text style={side === "A" ? styles.pointHintOnDark : styles.pointHint}>
                    {t("match.tapToScore")}
                  </Text>
                  <Text
                    style={side === "A" ? styles.pointLabelOnDark : styles.pointLabel}
                    numberOfLines={1}
                  >
                    {t("match.pointFor", { team: side === "A" ? homeName : awayName })}
                  </Text>
                </Pressable>
              ))}

            <View style={styles.actions}>
              <AppButton
                label={t("match.undo")}
                variant="away"
                labelStyle="body"
                disabled={!canUndo}
                onPress={handleUndo}
                icon={<Undo size={18} color={theme.colors.white} />}
                style={styles.action}
              />
              <AppButton
                label={t("match.finish")}
                variant="magenta"
                labelStyle="body"
                onPress={handleFinish}
                icon={<Flag size={18} color={theme.colors.white} />}
                style={styles.finish}
              />
            </View>

            {recent.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chips}
              >
                {recent.map((point) => {
                  const scorer = point.scoringPlayerId
                    ? playerName(point.scoringPlayerId)
                    : undefined
                  const how = point.ballOut
                    ? t("match.ballOut")
                    : point.attackType
                      ? t(`attackTypes.${point.attackType}`)
                      : undefined
                  return (
                    <View key={point.id} style={styles.chip}>
                      <Text style={styles.chipLabel}>
                        {pointSummary(point, [scorer ? firstName(scorer) : undefined, how])}
                      </Text>
                    </View>
                  )
                })}
              </ScrollView>
            ) : null}

            <MatchStatusCard
              match={match}
              homeName={homeName}
              awayName={awayName}
              onPress={() => navigation.navigate("MatchStatus", { matchId: match.id })}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}
