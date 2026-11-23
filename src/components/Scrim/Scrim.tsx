import React from "react"
import { Animated } from "react-native"

import type { ScrimProps } from "./Scrim.d"
import { styles } from "./Scrim.styles"

// Full-screen dimmer behind a sheet. Pass the navigator's overlay style so it fades
// independently of the sheet, which slides.
export function Scrim({ style }: ScrimProps) {
  return <Animated.View style={[styles.scrim, style]} />
}
