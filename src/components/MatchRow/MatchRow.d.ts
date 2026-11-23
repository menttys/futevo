export type MatchRowProps = {
  // Top line is the Home team (A); the badge reads from its point of view.
  homeName: string
  awayName: string
  scoreA: number
  scoreB: number
  subtitle?: string
  winLabel: string
  lossLabel: string
  onPress?: () => void
}
