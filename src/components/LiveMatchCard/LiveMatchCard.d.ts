export type LiveMatchCardProps = {
  homeName: string
  awayName: string
  scoreA: number
  scoreB: number
  liveLabel: string
  // "full": dashboard card with meta line and an action button. "compact": list row.
  variant?: "full" | "compact"
  meta?: string
  actionLabel?: string
  onPress?: () => void
}
