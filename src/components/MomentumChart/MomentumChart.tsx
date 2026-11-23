import React, { useMemo } from "react"
import { View } from "react-native"

import type { MomentumChartProps } from "./MomentumChart.d"
import { styles } from "./MomentumChart.styles"

// Who led over time: one bar per point, the running lead after it.
export function MomentumChart({ points, height = 84 }: MomentumChartProps) {
  const leads = useMemo(() => points.map((p) => p.scoreAAfter - p.scoreBAfter), [points])
  const max = Math.max(1, ...leads.map(Math.abs))

  return (
    <View style={styles.chart(height)} accessibilityRole="image">
      {leads.map((lead, index) => (
        <View key={index} style={styles.column}>
          <View style={styles.halfTop}>{lead > 0 ? <View style={styles.up((lead / max) * 100)} /> : null}</View>
          <View style={styles.half}>{lead < 0 ? <View style={styles.down((-lead / max) * 100)} /> : null}</View>
        </View>
      ))}
    </View>
  )
}
