import React from "react"
import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"

import type { ScoreBoardProps } from "./ScoreBoard.d"
import { styles } from "./ScoreBoard.styles"

// Readable from across the sand: Home in blue-black on the left, Away in deep purple on the right.
export function ScoreBoard({ homeName, awayName, scoreA, scoreB, leftNote, rightNote }: ScoreBoardProps) {
  const { theme } = useUnistyles()

  return (
    <View style={styles.card} accessibilityLabel={`${homeName} ${scoreA}, ${awayName} ${scoreB}`}>
      <FutevoMark size={260} rotate={8} color={theme.colors.primary} style={styles.watermark} />
      <View style={styles.row}>
        <Text style={styles.name(false)} numberOfLines={1}>
          {homeName}
        </Text>
        <Text style={styles.name(true)} numberOfLines={1}>
          {awayName}
        </Text>
      </View>
      <View style={[styles.row, styles.scores]}>
        <Text style={styles.score(false)}>{scoreA}</Text>
        <Text style={styles.score(true)}>{scoreB}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.note} numberOfLines={1}>
          {leftNote ?? ""}
        </Text>
        <Text style={styles.note} numberOfLines={1}>
          {rightNote ?? ""}
        </Text>
      </View>
    </View>
  )
}
