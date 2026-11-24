import type { Match } from "@/@types/futevo"

export type MatchStatusCardProps = {
  match: Match
  homeName: string
  awayName: string
  onPress: () => void
}
