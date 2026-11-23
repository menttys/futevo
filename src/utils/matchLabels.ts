import type { Match, TeamSide, Tournament } from "@/@types/futevo"
import { clubForSide } from "@/utils/tournament"

// How a side reads on cards: its club (or friendly team name), else the dupla "Rafa / Bel".
export function sideLabel(
  match: Match,
  tournament: Tournament | undefined,
  side: TeamSide,
  playerName: (id: string) => string
): string {
  const club = clubForSide(match, tournament, side)
  if (club) return club
  const ids = side === "A" ? match.teamA : match.teamB
  return `${firstName(playerName(ids[0]))} / ${firstName(playerName(ids[1]))}`
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name
}

// Local calendar day, "YYYY-MM-DD", used to group a timeline.
export function dayKey(iso: string): string {
  const d = new Date(iso)
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${month}-${day}`
}

// "Today", "Yesterday", a weekday within the last week, else a short date.
export function dayLabel(
  iso: string,
  labels: { today: string; yesterday: string },
  locale?: string,
  now: Date = new Date()
): string {
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const days = Math.round((startOf(now) - startOf(new Date(iso))) / 86_400_000)
  if (days <= 0) return labels.today
  if (days === 1) return labels.yesterday
  if (days < 7) return new Date(iso).toLocaleDateString(locale, { weekday: "short" })
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short" })
}

export function timeLabel(iso: string, locale?: string): string {
  return new Date(iso).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
}

// Whole minutes from the first point to the end (or the last point while live).
export function matchMinutes(match: Match): number | undefined {
  const first = match.points[0]?.createdAt
  const last = match.completedAt ?? match.points[match.points.length - 1]?.createdAt
  if (!first || !last) return undefined
  return Math.max(1, Math.round((new Date(last).getTime() - new Date(first).getTime()) / 60_000))
}

// "13–11 · Rafa · Pingo": the running score after a point, then who and how.
export function pointSummary(
  point: { scoreAAfter: number; scoreBAfter: number },
  parts: (string | undefined)[]
): string {
  return [`${point.scoreAAfter}–${point.scoreBAfter}`, ...parts].filter(Boolean).join(" · ")
}
