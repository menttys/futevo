import type { Match } from "@/@types/futevo"

export type MatchStatusCardProps = {
  match: Match
  homeName: string
  awayName: string
  onPress: () => void
  // Desktop: adds the landing-zone grid and attack bars under the momentum chart.
  detailed?: boolean
}
