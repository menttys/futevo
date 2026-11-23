import React from "react"
import { View } from "react-native"

import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"

import type { GradientFillProps } from "./GradientFill.d"
import { styles } from "./GradientFill.styles"

// Fills its parent with a top-left to bottom-right linear gradient.
export function GradientFill({ from, to }: GradientFillProps) {
  return (
    <View pointerEvents="none" style={styles.fill}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="gradientFill" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradientFill)" />
      </Svg>
    </View>
  )
}
