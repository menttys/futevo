import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

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
  // A scorer is required for in-court points whenever the team has known players.
  const needsPlayer = teamPlayers.length > 0
  const canConfirm =
    ballOut ||
    (zone !== undefined && attackType !== undefined && (!needsPlayer || !!scoringPlayerId))

  const handleSelectZone = (nextZone: CourtZone) => {
    setBallOut(false)
    // Tapping the selected zone again clears it, re-enabling "Ball out".
    setZone((current) => (current === nextZone ? undefined : nextZone))
  }

  const handleToggleBallOut = () => {
    setBallOut((current) => !current)
    setAttackType(undefined)
    setScoringPlayerId(undefined)
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    addPoint(match.id, team, ballOut ? { ballOut: true } : { zone, attackType, scoringPlayerId })
    navigation.goBack()
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

        <Text style={styles.sectionLabel}>{t("point.whereLanded", { team: opponent })}</Text>
        <View style={styles.courtWrapper}>
          <CourtGrid side={opponent} selectedZone={zone} onSelectZone={handleSelectZone} />
        </View>

        <TouchableOpacity
          style={styles.ballOutButton(ballOut, zone !== undefined)}
          onPress={handleToggleBallOut}
          disabled={zone !== undefined}
          activeOpacity={0.85}
        >
          <Text style={styles.ballOutLabel(ballOut, zone !== undefined)}>{t("point.ballOut")}</Text>
        </TouchableOpacity>

        <View style={styles.sectionSpacer} />

        {ballOut ? null : (
          <>
            <Text style={styles.sectionLabel}>{t("point.attackType")}</Text>
            <AttackTypePicker selected={attackType} onSelect={setAttackType} />
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
