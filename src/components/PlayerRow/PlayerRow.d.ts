import type { Player } from "@/@types/futevo"
import type { PlayerAvatarTone } from "@/components/PlayerAvatar/PlayerAvatar.d"

export type PlayerRowProps = {
  player: Player
  // "BR · PT"
  countries?: string
  // "14 matches · 71% wins"
  record?: string
  tone?: PlayerAvatarTone
  onPress: () => void
}
