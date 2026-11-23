import React from "react"
import { Pressable, Text, View } from "react-native"

import type { SegmentedControlProps } from "./SegmentedControl.d"
import { styles } from "./SegmentedControl.styles"

// Wash track with a brand-yellow pill on the chosen option.
export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  style,
}: SegmentedControlProps<T>) {
  return (
    <View style={[styles.track, style]} accessibilityRole="tablist">
      {options.map((option) => {
        const selected = option.value === value
        return (
          <Pressable
            key={String(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={styles.option(selected)}
          >
            <Text style={styles.label} numberOfLines={1}>
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
