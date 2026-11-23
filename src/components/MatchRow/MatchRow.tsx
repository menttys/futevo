import React from "react"
import { Pressable, Text, View } from "react-native"

import { ResultBadge } from "@/components/ResultBadge"

import type { MatchRowProps } from "./MatchRow.d"
import { styles } from "./MatchRow.styles"

export function MatchRow({
  homeName,
  awayName,
  scoreA,
  scoreB,
  subtitle,
  winLabel,
  lossLabel,
  onPress,
}: MatchRowProps) {
  const homeWon = scoreA > scoreB
  const awayWon = scoreB > scoreA

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => styles.row(pressed)}>
      <ResultBadge result={homeWon ? "win" : "loss"} label={homeWon ? winLabel : lossLabel} />
      <View style={styles.names}>
        <Text style={styles.name(homeWon || !awayWon)} numberOfLines={1}>
          {homeName}
        </Text>
        <Text style={styles.name(awayWon)} numberOfLines={1}>
          {awayName}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Text style={styles.score}>{`${scoreA}–${scoreB}`}</Text>
    </Pressable>
  )
}
