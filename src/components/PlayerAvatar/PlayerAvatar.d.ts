import type { StyleProp, ViewStyle } from "react-native"

export type PlayerAvatarProps = {
  name: string
  photoUri?: string
  size?: number
  selected?: boolean
  style?: StyleProp<ViewStyle>
}
