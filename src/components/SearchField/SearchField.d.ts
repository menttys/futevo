import type { StyleProp, ViewStyle } from "react-native"

export type SearchFieldProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  clearLabel?: string
  style?: StyleProp<ViewStyle>
}
