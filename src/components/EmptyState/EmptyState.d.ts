import type { StyleProp, ViewStyle } from "react-native"

import type { LucideIcon } from "@/lib/icons"

export type EmptyStateProps = {
  icon: LucideIcon
  title: string
  subtitle?: string
  style?: StyleProp<ViewStyle>
}
