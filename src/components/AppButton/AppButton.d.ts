import type { ReactNode } from "react"
import type { StyleProp, ViewStyle } from "react-native"

export type AppButtonVariant = "primary" | "cream" | "outline" | "dark" | "wash" | "danger" | "away" | "magenta"

export type AppButtonProps = {
  label: string
  onPress?: () => void
  variant?: AppButtonVariant
  // "display": Unbounded label (Start match, Save point). "body": Figtree label (Undo, Finish).
  labelStyle?: "display" | "body"
  icon?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  accessibilityLabel?: string
}
