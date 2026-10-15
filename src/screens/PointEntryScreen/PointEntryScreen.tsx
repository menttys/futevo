import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { AttackTypeId, CourtZone, Player, TeamSide } from "@/@types/futevo"
import { AttackTypePicker } from "@/components/AttackTypePicker"
import { CourtGrid } from "@/components/CourtGrid"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { useMatches } from "@/hooks/useMatches"
import { X } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useLanguage } from "@/i18n"

import { styles } from "./PointEntryScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "PointEntry">
type PointEntryRouteProp = RouteProp<MatchesStackParamList, "PointEntry">

export function PointEntryScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  // Wide screens put the "out" square beside the court, phones put it below.
  const wide = width >= 600
  const navigation = useNavigation<NavigationProp>()
  const { matchId, team } = useRoute<PointEntryRouteProp>().params
  const allPlayers = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const { addPoint } = useMatches()

  const [zone, setZone] = useState<CourtZone | undefined>()
  const [ballOut, setBallOut] = useState(false)
  const [attackType, setAttackType] = useState<AttackTypeId | undefined>()
  const [scoringPlayerId, setScoringPlayerId] = useState<string | undefined>()

  if (!match) return null

  const teamIds = team === "A" ? match.teamA : match.teamB
  const teamPlayers = teamIds
    .map((id) => allPlayers.find((p) => p.id === id))
    .filter((p): p is Player => !!p)

  // The point is decided on the opposing half, so that's the only court shown.
  const opponent: TeamSide = team === "A" ? "B" : "A"
  // Attack type is optional: without one the point is logged as a plain attack.
  // A scorer is required for in-court points whenever the team has known players.
  const needsPlayer = teamPlayers.length > 0
  const canConfirm =
    ballOut ||
    (zone !== undefined && (!needsPlayer || !!scoringPlayerId))

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
    // Always land on the live match (navigate pops back to it, or opens it when this
    // screen was the entry point, e.g. a deep link). A finishing point goes to the result.
    const updated = useMatchStore.getState().matches?.find((m) => m.id === match.id)
    if (updated?.status === "completed") {
      navigation.navigate("MatchDetail", { matchId: match.id })
    } else {
      navigation.navigate("LiveMatch", { matchId: match.id })
    }
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.closeRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={theme.hitSlop.md}>
          <X size={26} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + theme.spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t("point.title", { team })}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>{t("point.whereLanded", { team: opponent })}</Text>
          <View style={styles.courtRow(wide)}>
            <View style={styles.courtWrapper}>
              <CourtGrid side={opponent} selectedZone={zone} onSelectZone={handleSelectZone} />
            </View>
            <TouchableOpacity
              style={styles.outCell(ballOut, wide)}
              onPress={handleToggleBallOut}
              activeOpacity={0.85}
              accessibilityRole="button"
            >
              <Text style={styles.ballOutLabel(ballOut)}>{t("point.ballOut")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionSpacer} />

        {ballOut ? null : (
          <>
            <Text style={styles.sectionLabel}>{t("point.attackType")}</Text>
            <AttackTypePicker
              selected={attackType}
              onSelect={(next) => setAttackType((current) => (current === next ? undefined : next))}
            />
          </>
        )}

        {!ballOut && teamPlayers.length > 0 ? (
          <>
            <View style={styles.sectionSpacer} />
            <Text style={styles.sectionLabel}>{t("point.whoScored")}</Text>
            <View style={styles.playersRow}>
              {teamPlayers.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={styles.playerOption}
                  onPress={() =>
                    setScoringPlayerId((current) => (current === player.id ? undefined : player.id))
                  }
                >
                  <PlayerAvatar name={player.name} selected={scoringPlayerId === player.id} />
                  <Text style={styles.playerName}>{player.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}

        <View style={styles.sectionSpacer} />

        <TouchableOpacity
          style={styles.confirmButton(canConfirm)}
          onPress={handleConfirm}
          disabled={!canConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmLabel(canConfirm)}>{t("point.confirm")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
