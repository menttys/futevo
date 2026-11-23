import type { Match, Player, TeamSide, Tournament, TournamentEntry } from "@/@types/futevo"

// Order-independent identity of a dupla.
export function sortDupla(players: [Player["id"], Player["id"]]): [string, string] {
  return players[0] <= players[1] ? [players[0], players[1]] : [players[1], players[0]]
}

export function duplaKey(players: [Player["id"], Player["id"]]): string {
  return sortDupla(players).join("|")
}

export function findEntry(tournament: Tournament | undefined, players: [string, string]) {
  const key = duplaKey(players)
  return tournament?.entries.find((e) => duplaKey(e.players) === key)
}

// A match's club for one side is looked up from the tournament, so editing it
// in one place updates every match of that dupla. Friendly matches fall back to
// the team name typed when the match was created.
export function clubForSide(
  match: Pick<Match, "teamA" | "teamB"> & Partial<Pick<Match, "teamNameA" | "teamNameB">>,
  tournament: Tournament | undefined,
  side: TeamSide
): string | undefined {
  const club = findEntry(tournament, side === "A" ? match.teamA : match.teamB)?.club
  return club ?? (side === "A" ? match.teamNameA : match.teamNameB)
}

export type Standing = {
  entry: TournamentEntry
  wins: number
  losses: number
  // Points scored minus points conceded, completed matches only.
  diff: number
}

// Table for a tournament: wins first, then point difference. Only completed matches count.
export function computeStandings(tournament: Tournament, matches: Match[]): Standing[] {
  const rows = new Map<string, Standing>(
    tournament.entries.map((entry) => [duplaKey(entry.players), { entry, wins: 0, losses: 0, diff: 0 }])
  )
  for (const m of matches) {
    if (m.tournamentId !== tournament.id || m.status !== "completed") continue
    const a = rows.get(duplaKey(m.teamA))
    const b = rows.get(duplaKey(m.teamB))
    const aWon = m.winner ? m.winner === "A" : m.scoreA > m.scoreB
    if (a) {
      a.diff += m.scoreA - m.scoreB
      if (aWon) a.wins += 1
      else a.losses += 1
    }
    if (b) {
      b.diff += m.scoreB - m.scoreA
      if (aWon) b.losses += 1
      else b.wins += 1
    }
  }
  return [...rows.values()].sort((x, y) => y.wins - x.wins || y.diff - x.diff || x.losses - y.losses)
}
