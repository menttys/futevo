import React from "react"
import { Text, View } from "react-native"

import type { StatTileProps } from "./StatTile.d"
import { styles } from "./StatTile.styles"

export function StatTile({ value, label, style }: StatTileProps) {
  return (
    <View style={[styles.tile, style]}>
      <Text style={styles.value} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  )
}
