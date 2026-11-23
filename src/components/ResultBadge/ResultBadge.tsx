import React from "react"
import { Text, View } from "react-native"

import type { ResultBadgeProps } from "./ResultBadge.d"
import { styles } from "./ResultBadge.styles"

export function ResultBadge({ result, label, size = 36 }: ResultBadgeProps) {
  return (
    <View style={styles.badge(result === "win", size)}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
