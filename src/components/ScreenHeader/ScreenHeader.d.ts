import type { ReactNode } from "react"
import type { StyleProp, ViewStyle } from "react-native"

export type ScreenHeaderProps = {
  title: string
  // "large": tab-root title (Matches, Players, Settings). "back": stack screen with a back button.
  variant?: "large" | "back"
  onBack?: () => void
  backLabel?: string
  right?: ReactNode
  style?: StyleProp<ViewStyle>
}
