import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import type { Player } from "@/@types/futevo"

import type { ScoreBoardProps } from "./ScoreBoard.d"
import { styles } from "./ScoreBoard.styles"

function teamNames(players: Player[]): string {
  return players.map((p) => p.name).join(" & ") || "Team"
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

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.panel(theme.colors.teamA)}
        onPress={() => onScorePoint("A")}
        disabled={disabled}
        activeOpacity={0.85}
      >
        <Text style={styles.names}>{teamNames(teamAPlayers)}</Text>
        <Text style={styles.score(theme.colors.teamA)}>{scoreA}</Text>
        <Text style={styles.hint}>Tap to score</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panel(theme.colors.teamB)}
        onPress={() => onScorePoint("B")}
        disabled={disabled}
        activeOpacity={0.85}
      >
        <Text style={styles.names}>{teamNames(teamBPlayers)}</Text>
        <Text style={styles.score(theme.colors.teamB)}>{scoreB}</Text>
        <Text style={styles.hint}>Tap to score</Text>
      </TouchableOpacity>
    </View>
  )
}
