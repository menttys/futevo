import React from "react"
import { Text, View } from "react-native"

import type { AttackBarsProps } from "./AttackBars.d"
import { styles } from "./AttackBars.styles"

export function AttackBars({ items }: AttackBarsProps) {
  const max = Math.max(1, ...items.map((i) => i.count))
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label} numberOfLines={1}>
            {item.label}
          </Text>
          <View style={styles.track}>
            <View style={styles.fill((item.count / max) * 100)} />
          </View>
          <Text style={styles.count}>{item.count}</Text>
        </View>
      ))}
    </View>
  )
}
