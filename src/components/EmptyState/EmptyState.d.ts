import type { StyleProp, ViewStyle } from "react-native"

export type EmptyStateProps = {
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
  style?: StyleProp<ViewStyle>
}
