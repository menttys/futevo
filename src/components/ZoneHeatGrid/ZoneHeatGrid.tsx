import React, { useMemo } from "react"
import { Text, View } from "react-native"

import type { CourtZone } from "@/@types/futevo"

import type { ZoneHeatGridProps } from "./ZoneHeatGrid.d"
import { styles } from "./ZoneHeatGrid.styles"

const ROWS: CourtZone[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// Landing zones as a 3×3 heat grid; the hottest zone is solid brand yellow.
export function ZoneHeatGrid({ points }: ZoneHeatGridProps) {
  const counts = useMemo(() => {
    const map = new Map<CourtZone, number>()
    points.forEach((p) => {
      if (p.zone) map.set(p.zone, (map.get(p.zone) ?? 0) + 1)
    })
    return map
  }, [points])
  const max = Math.max(0, ...counts.values())

  return (
    <View style={styles.grid}>
      {ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((zone) => {
            const count = counts.get(zone) ?? 0
            const alpha = max > 0 && count > 0 ? Math.max(0.15, count / max) : 0
            return (
              <View key={zone} style={styles.cell(alpha)}>
                <Text style={styles.count}>{count}</Text>
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}
