import React from "react"
import { View } from "react-native"

import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"

import { NET_GRADIENT } from "@/styles/theme"

import type { CourtNetProps } from "./CourtNet.d"
import { styles } from "./CourtNet.styles"

// The court-mode net: one smooth left-to-right gradient through the net colours.
export function CourtNet({ style, accessibilityLabel }: CourtNetProps) {
  return (
    <View style={[styles.net, style]} pointerEvents="none" accessibilityLabel={accessibilityLabel}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="courtNet" x1="0" y1="0" x2="1" y2="0">
            {NET_GRADIENT.map((color, index) => (
              <Stop key={color} offset={index / (NET_GRADIENT.length - 1)} stopColor={color} />
            ))}
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#courtNet)" />
      </Svg>
    </View>
  )
}
