import type { StyleProp, ViewStyle } from "react-native"

import type { CourtZone, TeamSide } from "@/@types/futevo"

export type CourtGridProps = {
  // The court half to display (the team that conceded the point).
  side: TeamSide
  selectedZone?: CourtZone
  onSelectZone: (zone: CourtZone) => void
  style?: StyleProp<ViewStyle>
}
