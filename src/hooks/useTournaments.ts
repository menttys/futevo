import { useCallback } from "react"

import type { Tournament } from "@/@types/futevo"
import { Collections } from "@/constants/Collections"
import { db } from "@/hooks/useFirebase"
import { doc, setDoc } from "@/lib/firestore"
import { useTournamentStore } from "@/store/tournamentState"
import { useUserStore } from "@/store/userState"
import { generateDocId } from "@/utils/generateDocId"
import { stripUndefined } from "@/utils/stripUndefined"
import { duplaKey, sortDupla } from "@/utils/tournament"

type TournamentDetails = Pick<Tournament, "name" | "location" | "date">

export const useTournaments = () => {
  const userId = useUserStore((s) => s.user?.id)

  // Writes patch the store first and never block on the network — the native SDK
  // queues them offline and the useFirebase() listener reconciles once they land.
  const persistTournament = useCallback((tournament: Tournament): void => {
    useTournamentStore.getState().upsertTournament(tournament)
    setDoc(doc(db, Collections.TOURNAMENT, tournament.id), stripUndefined(tournament)).catch(
      console.error
    )
  }, [])

  const createTournament = useCallback(
    (details: TournamentDetails): Tournament => {
      const tournament: Tournament = {
        id: generateDocId(Collections.TOURNAMENT),
        userId: userId ?? "",
        ...details,
        entries: [],
        createdAt: new Date().toISOString(),
      }
      persistTournament(tournament)
      return tournament
    },
    [userId, persistTournament]
  )

  const updateTournament = useCallback(
    (tournamentId: string, details: TournamentDetails): void => {
      const tournament = useTournamentStore
        .getState()
        .tournaments?.find((t) => t.id === tournamentId)
      if (!tournament) return
      persistTournament({ ...tournament, ...details })
    },
    [persistTournament]
  )

  // Registers the dupla on first use and edits its club afterwards. Because
  // matches derive their club from the entry, this updates every match at once.
  const setEntryClub = useCallback(
    (tournamentId: string, players: [string, string], club?: string): void => {
      const tournament = useTournamentStore
        .getState()
        .tournaments?.find((t) => t.id === tournamentId)
      if (!tournament) return

      const sorted = sortDupla(players)
      const key = duplaKey(sorted)
      const trimmed = club?.trim() || undefined
      const exists = tournament.entries.some((e) => duplaKey(e.players) === key)
      const entries = exists
        ? tournament.entries.map((e) => (duplaKey(e.players) === key ? { ...e, club: trimmed } : e))
        : [...tournament.entries, { players: sorted, club: trimmed }]

      persistTournament({ ...tournament, entries })
    },
    [persistTournament]
  )

  return { createTournament, updateTournament, setEntryClub }
}
