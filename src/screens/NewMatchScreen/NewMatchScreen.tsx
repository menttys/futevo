import React from "react"
import { ScrollView, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { NewMatchForm } from "@/forms/NewMatchForm"
import type { NewMatchFormSubmit } from "@/forms/NewMatchForm/NewMatchForm.d"
import { useMatches } from "@/hooks/useMatches"
import { useTournaments } from "@/hooks/useTournaments"
import { MatchesStackParamList } from "@/navigation/types"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { findEntry } from "@/utils/tournament"

import { styles } from "./NewMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "NewMatch">

export function NewMatchScreen() {
  const navigation = useNavigation<NavigationProp>()
  const players = usePlayerStore((s) => s.players) ?? []
  const tournaments = useTournamentStore((s) => s.tournaments) ?? []
  const { startMatch } = useMatches()
  const { createTournament, setEntryClub } = useTournaments()

  const handleSubmit = ({
    newTournament,
    clubA,
    clubB,
    tournamentId: selectedId,
    ...params
  }: NewMatchFormSubmit) => {
    const tournamentId = newTournament ? createTournament(newTournament).id : selectedId

    if (tournamentId) {
      // Register each dupla on first appearance; existing entries stay locked.
      const tournament = useTournamentStore
        .getState()
        .tournaments?.find((t) => t.id === tournamentId)
      if (!findEntry(tournament, params.teamA)) setEntryClub(tournamentId, params.teamA, clubA)
      if (!findEntry(tournament, params.teamB)) setEntryClub(tournamentId, params.teamB, clubB)
    }

    const match = startMatch({ ...params, tournamentId })
    navigation.replace("LiveMatch", { matchId: match.id })
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <NewMatchForm players={players} tournaments={tournaments} onSubmit={handleSubmit} />
      </View>
    </ScrollView>
  )
}
