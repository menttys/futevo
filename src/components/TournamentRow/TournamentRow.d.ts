export type TournamentRowProps = {
  name: string
  subtitle?: string
  // "yellow": dashboard card with trophy disc. "butter": inline row in the matches timeline.
  variant?: "yellow" | "butter"
  onPress?: () => void
}
