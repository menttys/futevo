import React, { useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import type { AttackTypeId, CourtZone, Player, TeamSide } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { AttackTypePicker } from "@/components/AttackTypePicker"
import { CourtGrid } from "@/components/CourtGrid"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { useMatches } from "@/hooks/useMatches"
import { useLanguage } from "@/i18n"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { firstName, sideLabel } from "@/utils/matchLabels"

import { styles } from "./PointEntryScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "PointEntry">
type PointEntryRouteProp = RouteProp<MatchesStackParamList, "PointEntry">

// Three taps: where it landed, which attack, who scored. A sheet over the live score.
export function PointEntryScreen() {
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { matchId, team } = useRoute<PointEntryRouteProp>().params
  const allPlayers = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) => s.tournaments?.find((tr) => tr.id === match?.tournamentId))
  const { addPoint } = useMatches()

  const [zone, setZone] = useState<CourtZone | undefined>()
  const [ballOut, setBallOut] = useState(false)
  const [attackType, setAttackType] = useState<AttackTypeId | undefined>()
  const [scoringPlayerId, setScoringPlayerId] = useState<string | undefined>()

  if (!match) return null

  const teamIds = team === "A" ? match.teamA : match.teamB
  const teamPlayers = teamIds.map((id) => allPlayers.find((p) => p.id === id)).filter((p): p is Player => !!p)
  const playerName = (id: string) => allPlayers.find((p) => p.id === id)?.name ?? t("common.unknownPlayer")
  const teamName = sideLabel(match, tournament, team, playerName)

  // The point is decided on the opposing half, so that's the only court shown.
  const opponent: TeamSide = team === "A" ? "B" : "A"
  // Attack type is optional: without one the point is logged as a plain attack.
  // A scorer is required for in-court points whenever the team has known players.
  const needsPlayer = teamPlayers.length > 0
  const canConfirm = ballOut || (zone !== undefined && (!needsPlayer || !!scoringPlayerId))

  const nextA = match.scoreA + (team === "A" ? 1 : 0)
  const nextB = match.scoreB + (team === "B" ? 1 : 0)

  const handleSelectZone = (nextZone: CourtZone) => {
    setBallOut(false)
    // Tapping the selected zone again clears it.
    setZone((current) => (current === nextZone ? undefined : nextZone))
  }

  const handleToggleBallOut = () => {
    // Choosing "out" discards any selected court zone.
    setZone(undefined)
    setBallOut((current) => !current)
    setAttackType(undefined)
    setScoringPlayerId(undefined)
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    addPoint(match.id, team, ballOut ? { ballOut: true } : { zone, attackType, scoringPlayerId })
    const updated = useMatchStore.getState().matches?.find((m) => m.id === match.id)
    if (updated?.status === "completed") {
      // A finishing point goes to the result.
      navigation.navigate("MatchDetail", { matchId: match.id })
      return
    }
    // Live or status screen directly below the sheet: just close the sheet to return to it.
    const { routes, index } = navigation.getState()
    const below = routes[index - 1]?.name
    if (below === "LiveMatch" || below === "MatchStatus") {
      navigation.goBack()
      return
    }
    // Otherwise (e.g. a deep link) open the live match.
    navigation.navigate("LiveMatch", { matchId: match.id })
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.dismissArea}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel={t("common.cancel")}
      />
      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>{t("point.pointFor")}</Text>
              <Text style={styles.team} numberOfLines={1}>
                {teamName}
              </Text>
            </View>
            <View style={styles.preview}>
              <Text style={styles.previewText}>{`${nextA}–${nextB}`}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.step}>{t("point.stepWhere")}</Text>
            <CourtGrid side={opponent} selectedZone={zone} onSelectZone={handleSelectZone} />
            <Text style={styles.note}>{t("point.courtNote")}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: ballOut }}
              onPress={handleToggleBallOut}
              style={styles.ballOut(ballOut)}
            >
              <Text style={styles.ballOutLabel(ballOut)}>{t("point.ballOut")}</Text>
            </Pressable>
          </View>

          {ballOut ? null : (
            <View>
              <Text style={styles.step}>{t("point.stepAttack")}</Text>
              <AttackTypePicker
                selected={attackType}
                onSelect={(next) => setAttackType((current) => (current === next ? undefined : next))}
              />
            </View>
          )}

          {!ballOut && teamPlayers.length > 0 ? (
            <View>
              <Text style={styles.step}>{t("point.stepWho")}</Text>
              <View style={styles.players}>
                {teamPlayers.map((player) => {
                  const selected = scoringPlayerId === player.id
                  return (
                    <Pressable
                      key={player.id}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => setScoringPlayerId((current) => (current === player.id ? undefined : player.id))}
                      style={({ pressed }) => styles.player(selected, pressed)}
                    >
                      <PlayerAvatar name={player.name} photoUri={player.photoUri} size={32} />
                      <Text style={styles.playerName(selected)} numberOfLines={1}>
                        {firstName(player.name)}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <AppButton label={t("point.save")} disabled={!canConfirm} onPress={handleConfirm} style={styles.save} />
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.cancel}>
            <Text style={styles.cancelLabel}>{t("common.cancel")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
