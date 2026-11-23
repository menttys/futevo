import type { StyleProp, ViewStyle } from "react-native"

export type PlayerAvatarTone = "neutral" | "yellow" | "dark" | "butter"

export type PlayerAvatarProps = {
  name: string
  photoUri?: string
  size?: number
  selected?: boolean
  // Disc colour behind the initial: yellow on dark cards, blue-black on yellow ones.
  tone?: PlayerAvatarTone
  style?: StyleProp<ViewStyle>
}
