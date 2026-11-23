import React from "react"
import { View } from "react-native"

import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg"

import { styles } from "./MeshBackground.styles"

// The chosen page background: warm white under a soft mint and butter mesh.
// Each blob mirrors a CSS radial-gradient(rx ry at cx cy) from the colour guide.
const BLOBS = [
  { id: "meshA", cx: "100%", cy: "0%", rx: "80%", ry: "40%", color: "rgb(190,232,208)", opacity: 0.42 },
  { id: "meshB", cx: "0%", cy: "30%", rx: "75%", ry: "38%", color: "rgb(255,226,130)", opacity: 0.4 },
  { id: "meshC", cx: "90%", cy: "70%", rx: "80%", ry: "38%", color: "rgb(190,232,208)", opacity: 0.3 },
  { id: "meshD", cx: "0%", cy: "100%", rx: "80%", ry: "34%", color: "rgb(190,222,244)", opacity: 0.25 },
] as const

export function MeshBackground() {
  return (
    <View pointerEvents="none" style={styles.fill}>
      <Svg width="100%" height="100%" preserveAspectRatio="none">
        <Defs>
          {BLOBS.map((b) => (
            <RadialGradient key={b.id} id={b.id} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fx={b.cx} fy={b.cy}>
              <Stop offset="0" stopColor={b.color} stopOpacity={b.opacity} />
              <Stop offset="1" stopColor={b.color} stopOpacity={0} />
            </RadialGradient>
          ))}
        </Defs>
        {BLOBS.map((b) => (
          <Rect key={b.id} x="0" y="0" width="100%" height="100%" fill={`url(#${b.id})`} />
        ))}
      </Svg>
    </View>
  )
}
