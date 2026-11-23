import React, { useEffect } from "react"
import { View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import type { TeamSide } from "@/@types/futevo"
import { MeshBackground } from "@/components/MeshBackground"
import { ScreenHeader } from "@/components/ScreenHeader"
import { NewMatchForm } from "@/forms/NewMatchForm"
import type { NewMatchFormSubmit } from "@/forms/NewMatchForm/NewMatchForm.d"
import { useMatches } from "@/hooks/useMatches"
import { useTournaments } from "@/hooks/useTournaments"
import { useLanguage } from "@/i18n"
import { MatchesStackParamList } from "@/navigation/types"
import { useNewMatchStore } from "@/store/newMatchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { findEntry } from "@/utils/tournament"

import { styles } from "./NewMatchScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "NewMatch">

export function NewMatchScreen() {
  const navigation = useNavigation<NavigationProp>()
  const { t } = useLanguage()
  const players = usePlayerStore((s) => s.players) ?? []
  const tournaments = useTournamentStore((s) => s.tournaments) ?? []
  const { startMatch } = useMatches()
  const { createTournament, setEntryClub } = useTournaments()
  const resetDraft = useNewMatchStore((s) => s.reset)

  // Clear the slot draft when leaving this screen (back, or replaced by the live match).
  useEffect(() => () => resetDraft(), [resetDraft])

  const handlePickSlot = (side: TeamSide, index: number) =>
    navigation.navigate("PlayerPicker", { side, index })

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
        .tournaments?.find((tr) => tr.id === tournamentId)
      if (!findEntry(tournament, params.teamA)) setEntryClub(tournamentId, params.teamA, clubA)
      if (!findEntry(tournament, params.teamB)) setEntryClub(tournamentId, params.teamB, clubB)
    }

    const match = startMatch({ ...params, tournamentId })
    navigation.replace("LiveMatch", { matchId: match.id })
  }

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("screens.newMatch")}
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        backLabel={t("common.back")}
      />
      <NewMatchForm
        players={players}
        tournaments={tournaments}
        onSubmit={handleSubmit}
        onPickSlot={handlePickSlot}
      />
    </View>
  )
}
