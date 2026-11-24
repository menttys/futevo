export type LiveMatchCardProps = {
  homeName: string
  awayName: string
  scoreA: number
  scoreB: number
  liveLabel: string
  // "full": dashboard card with meta line and an action button. "compact": list row.
  // "wide": desktop dashboard card. "bar": desktop one-line row in the matches list.
  variant?: "full" | "compact" | "wide" | "bar"
  // Line under each team name (the dupla when a side is shown by its club).
  homeDetail?: string
  awayDetail?: string
  meta?: string
  actionLabel?: string
  onPress?: () => void
}
