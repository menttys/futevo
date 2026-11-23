import React from "react"
import { Text, View } from "react-native"

import type { LivePillProps } from "./LivePill.d"
import { styles } from "./LivePill.styles"

export function LivePill({ label }: LivePillProps) {
  return (
    <View style={styles.pill}>
      <View style={styles.dot} />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}
