export type ScoreBoardProps = {
  homeName: string
  awayName: string
  scoreA: number
  scoreB: number
  // Bottom line, left and right (e.g. "18 points" · "to 18 · win by 2").
  leftNote?: string
  rightNote?: string
}
