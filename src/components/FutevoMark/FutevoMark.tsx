import React from "react"
import { View } from "react-native"

import Svg, { Path } from "react-native-svg"
import { useUnistyles } from "react-native-unistyles"

import type { FutevoMarkProps } from "./FutevoMark.d"
import { MARK_RATIO, styles } from "./FutevoMark.styles"

// The Futevo mark: five blades. Used as logo, ball, selection marker and watermark.
const MARK_PATH =
  "M 26.028 76.919 C 29.877 78.557 46.19 70.73 52.972 61.264 C 43.624 53.436 34.459 49.978 24.928 47.611 C 22.729 57.987 21.812 75.098 26.028 76.919 Z M 24.928 47.611 C 27.128 39.238 27.861 27.588 26.944 17.758 C 16.863 20.124 0 29.044 0 32.685 C 0 37.053 13.93 44.881 24.928 47.611 Z M 70.935 70.001 C 76.251 68.545 75.884 48.522 71.302 40.876 C 63.603 46.701 57.555 52.344 52.972 61.264 C 57.555 65.451 67.636 70.912 70.935 70.001 Z M 26.944 17.758 C 34.459 15.756 45.64 14.117 55.905 13.571 C 52.056 7.018 34.459 -0.991 31.343 0.101 C 28.044 1.193 26.394 11.205 26.944 17.758 Z M 71.302 40.876 C 75.884 34.687 79 23.583 79 19.032 C 79 15.209 61.037 13.207 55.905 13.571 C 61.404 20.852 66.353 29.044 71.302 40.876 Z"

export function FutevoMark({ size = 30, color, rotate = 0, style }: FutevoMarkProps) {
  const { theme } = useUnistyles()
  return (
    <View pointerEvents="none" style={[styles.mark(size, rotate), style]}>
      <Svg width={size} height={size * MARK_RATIO} viewBox="-1 -1 81 79.137">
        <Path d={MARK_PATH} fill={color ?? theme.colors.dark} fillRule="evenodd" />
      </Svg>
    </View>
  )
}
