import type { Player } from "@/@types/futevo"

export type PlayerTileProps = {
  player: Player
  onPress: () => void
  selected?: boolean
  badgeLabel?: string
  badgeColor?: string
}
