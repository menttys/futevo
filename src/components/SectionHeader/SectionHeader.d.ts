import type { StyleProp, ViewStyle } from "react-native"

export type SectionHeaderProps = {
  title: string
  actionLabel?: string
  onAction?: () => void
  style?: StyleProp<ViewStyle>
}

export type SectionLabelProps = {
  title: string
  style?: StyleProp<ViewStyle>
}
