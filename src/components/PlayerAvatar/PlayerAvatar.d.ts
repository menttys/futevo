import type { StyleProp, ViewStyle } from "react-native"

import type { Player } from "@/@types/futevo"

export type PlayerAvatarProps = {
  player: Player
  size?: number
  selected?: boolean
  style?: StyleProp<ViewStyle>
}
