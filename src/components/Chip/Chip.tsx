import React from "react"
import { Pressable, Text } from "react-native"

import type { ChipProps } from "./Chip.d"
import { styles } from "./Chip.styles"

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip(selected), style]}
    >
      <Text style={styles.label(selected)}>{label}</Text>
    </Pressable>
  )
}
