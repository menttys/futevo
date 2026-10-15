import { View } from "react-native"

import type { BoxProps } from "./Box.d"
import { styles } from "./Box.styles"

export function Box({ style, ...otherProps }: BoxProps) {
  return <View style={[styles.base, style]} {...otherProps} />
}
