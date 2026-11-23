import type { StyleProp, ViewStyle } from "react-native"

export type CourtNetProps = {
  // Position and size; the net fills whatever box it is given.
  style?: StyleProp<ViewStyle>
  accessibilityLabel?: string
}
