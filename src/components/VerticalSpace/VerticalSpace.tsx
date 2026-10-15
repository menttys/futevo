import React from "react"
import { View } from "react-native"

import type { VerticalSpaceProps } from "./VerticalSpace.d"
import { styles } from "./VerticalSpace.styles"

export const VerticalSpace = ({ size = 8 }: VerticalSpaceProps) => {
  return <View style={styles.space(size)} />
}
