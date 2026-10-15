import React, { useEffect } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"
import { PointLog } from "@/components/PointLog"
import { ScoreBoard } from "@/components/ScoreBoard"
import { useMatches } from "@/hooks/useMatches"
import { RotateCcw, Trophy } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { confirmAction } from "@/utils/confirmAction"
import { clubForSide } from "@/utils/tournament"
import { useLanguage } from "@/i18n"

import { styles } from "./LiveMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "LiveMatch">
type LiveMatchRouteProp = RouteProp<MatchesStackParamList, "LiveMatch">

function playersById(players: Player[], ids: string[]): Player[] {
  return ids.map((id) => players.find((p) => p.id === id)).filter((p): p is Player => !!p)
}

export function LiveMatchScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<LiveMatchRouteProp>().params
  const players = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) =>
    s.tournaments?.find((t) => t.id === match?.tournamentId)
  )
  const { undoLastPoint, finishMatch } = useMatches()

  useEffect(() => {
    if (match?.status === "completed") {
      navigation.replace("MatchDetail", { matchId })
    }
  }, [match?.status, matchId, navigation])

  if (!match) return null

  const teamAPlayers = playersById(players, match.teamA)
  const teamBPlayers = playersById(players, match.teamB)

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

  const canUndo = match.points.length > 0

  return (
    <View style={[styles.root, { paddingTop: insets.top + theme.spacing.md }]}>
      <View>
        <Text style={styles.targetLabel}>
          {t("match.firstTo", { target: match.targetScore, winBy: match.winBy })}
        </Text>
      </View>

      <ScoreBoard
        teamAPlayers={teamAPlayers}
        teamBPlayers={teamBPlayers}
        scoreA={match.scoreA}
        scoreB={match.scoreB}
        clubA={clubForSide(match, tournament, "A")}
        clubB={clubForSide(match, tournament, "B")}
        onScorePoint={(team) => navigation.navigate("PointEntry", { matchId: match.id, team })}
      />

      <View style={styles.logHeader}>
        <Text style={styles.logTitle}>{t("match.pointLog")}</Text>
      </View>
      <ScrollView
        style={styles.logScroll}
        contentContainerStyle={styles.logContent}
        showsVerticalScrollIndicator={false}
      >
        <PointLog points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
      </ScrollView>

      <View style={[styles.actions, { marginBottom: insets.bottom }]}>
        <TouchableOpacity
          style={[styles.actionButton, !canUndo && styles.actionButtonDisabled]}
          onPress={handleUndo}
          disabled={!canUndo}
          activeOpacity={0.85}
        >
          <RotateCcw size={16} color={theme.colors.text} />
          <Text style={styles.actionButtonLabel}>{t("match.undo")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.finishButton]}
          onPress={handleFinish}
          activeOpacity={0.85}
        >
          <Trophy size={16} color={theme.colors.danger} />
          <Text style={[styles.actionButtonLabel, styles.finishLabel]}>{t("match.finish")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
