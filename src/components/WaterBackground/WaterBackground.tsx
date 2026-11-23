import React from "react"
import { View } from "react-native"

import Svg, { Path, Stop, LinearGradient, Defs } from "react-native-svg"

import type { WaterBackgroundProps } from "./WaterBackground.d"
import { styles } from "./WaterBackground.styles"

const VIEW_WIDTH = 400
const VIEW_HEIGHT = 100
const WAVELENGTH = 100

// Builds a closed wave band: a smooth sine-like top edge at `baseY`, filled down to the bottom.
function wavePath(baseY: number, amplitude: number, phase: number) {
  const half = WAVELENGTH / 2
  const start = -phase
  let d = `M ${start} ${baseY}`
  for (let x = start, up = true; x < VIEW_WIDTH; x += half, up = !up) {
    const cy = baseY + (up ? -amplitude : amplitude) * 2
    d += ` Q ${x + half / 2} ${cy} ${x + half} ${baseY}`
  }
  d += ` L ${VIEW_WIDTH} ${VIEW_HEIGHT} L 0 ${VIEW_HEIGHT} Z`
  return d
}

const LAYERS = [
  { d: wavePath(28, 6, 0), id: "waterA", from: "rgb(190,232,208)", to: "rgb(190,222,244)", opacity: 0.55 },
  { d: wavePath(48, 7, 25), id: "waterB", from: "rgb(255,226,130)", to: "rgb(190,232,208)", opacity: 0.45 },
  { d: wavePath(68, 6, 50), id: "waterC", from: "rgb(190,222,244)", to: "rgb(190,232,208)", opacity: 0.7 },
] as const

// Layered water-style waves used as a footer background band.
export function WaterBackground({ height = 56, style }: WaterBackgroundProps) {
  return (
    <View pointerEvents="none" style={[styles.container(height), style]}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="none">
        <Defs>
          {LAYERS.map((l) => (
            <LinearGradient key={l.id} id={l.id} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={l.from} stopOpacity={l.opacity} />
              <Stop offset="1" stopColor={l.to} stopOpacity={l.opacity} />
            </LinearGradient>
          ))}
        </Defs>
        {LAYERS.map((l) => (
          <Path key={l.id} d={l.d} fill={`url(#${l.id})`} />
        ))}
      </Svg>
    </View>
  )
}
