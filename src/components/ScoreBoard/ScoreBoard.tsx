import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"
import { useLanguage } from "@/i18n"

import type { ScoreBoardProps } from "./ScoreBoard.d"
import { styles } from "./ScoreBoard.styles"

function teamNames(players: Player[], fallback: string): string {
  return players.map((p) => p.name).join(" & ") || fallback
}

export function ScoreBoard({
  teamAPlayers,
  teamBPlayers,
  scoreA,
  scoreB,
  onScorePoint,
  disabled = false,
}: ScoreBoardProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.panel(theme.colors.teamA)}
        onPress={() => onScorePoint("A")}
        disabled={disabled}
        activeOpacity={0.85}
      >
        <Text style={styles.names}>{teamNames(teamAPlayers, t("common.teamFallback"))}</Text>
        <Text style={styles.score(theme.colors.teamA)}>{scoreA}</Text>
        <Text style={styles.hint}>{t("match.tapToScore")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panel(theme.colors.teamB)}
        onPress={() => onScorePoint("B")}
        disabled={disabled}
        activeOpacity={0.85}
      >
        <Text style={styles.names}>{teamNames(teamBPlayers, t("common.teamFallback"))}</Text>
        <Text style={styles.score(theme.colors.teamB)}>{scoreB}</Text>
        <Text style={styles.hint}>{t("match.tapToScore")}</Text>
      </TouchableOpacity>
    </View>
  )
}
