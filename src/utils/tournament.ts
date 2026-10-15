import type { Match, Player, TeamSide, Tournament } from "@/@types/futevo"

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
