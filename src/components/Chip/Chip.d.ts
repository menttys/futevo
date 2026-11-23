import type { StyleProp, ViewStyle } from "react-native"

export type ChipProps = {
  label: string
  selected?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}
