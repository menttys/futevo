import React, { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"
import { ScoreBoard } from "@/components/ScoreBoard"
import { useMatches } from "@/hooks/useMatches"
import { RotateCcw, Trophy } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { confirmAction } from "@/utils/confirmAction"

import { styles } from "./LiveMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "LiveMatch">
type LiveMatchRouteProp = RouteProp<MatchesStackParamList, "LiveMatch">

function playersById(players: Player[], ids: string[]): Player[] {
  return ids.map((id) => players.find((p) => p.id === id)).filter((p): p is Player => !!p)
}

export function LiveMatchScreen() {
  const { theme } = useUnistyles()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<LiveMatchRouteProp>().params
  const players = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
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
      title: "Finish match?",
      message: "This ends the match with the current score.",
      confirmLabel: "Finish",
      onConfirm: () => finishMatch(match.id),
    })
  }

  const canUndo = match.points.length > 0

  return (
    <View style={[styles.root, { paddingTop: insets.top + theme.spacing.md }]}>
      <View>
        <Text style={styles.targetLabel}>
          First to {match.targetScore}, win by {match.winBy}
        </Text>
      </View>

      <ScoreBoard
        teamAPlayers={teamAPlayers}
        teamBPlayers={teamBPlayers}
        scoreA={match.scoreA}
        scoreB={match.scoreB}
        onScorePoint={(team) => navigation.navigate("PointEntry", { matchId: match.id, team })}
      />

      <View style={[styles.footer, { marginBottom: insets.bottom }]}>
        <TouchableOpacity
          style={[styles.footerButton, !canUndo && styles.footerButtonDisabled]}
          onPress={() => undoLastPoint(match.id)}
          disabled={!canUndo}
          activeOpacity={0.85}
        >
          <RotateCcw size={18} color={theme.colors.text} />
          <Text style={styles.footerButtonLabel}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.finishButton]}
          onPress={handleFinish}
          activeOpacity={0.85}
        >
          <Trophy size={18} color={theme.colors.danger} />
          <Text style={[styles.footerButtonLabel, styles.finishLabel]}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
