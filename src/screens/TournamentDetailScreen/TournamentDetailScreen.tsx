import React, { useCallback, useMemo, useState } from "react"
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import type { TournamentEntry } from "@/@types/futevo"
import { useTournaments } from "@/hooks/useTournaments"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { duplaKey } from "@/utils/tournament"
import { useLanguage } from "@/i18n"

import { styles } from "./TournamentDetailScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "TournamentDetail">
type TournamentRouteProp = RouteProp<MatchesStackParamList, "TournamentDetail">

export function TournamentDetailScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { tournamentId } = useRoute<TournamentRouteProp>().params
  const tournament = useTournamentStore((s) => s.tournaments?.find((t) => t.id === tournamentId))
  const matches = useMatchStore((s) => s.matches)
  const players = usePlayerStore((s) => s.players)
  const { setEntryClub } = useTournaments()
  // Local drafts keep typing smooth; the club is written once on blur.
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )
  const duplaName = useCallback(
    (ids: [string, string]) => `${playerName(ids[0])} & ${playerName(ids[1])}`,
    [playerName]
  )

  const tournamentMatches = useMemo(
    () =>
      (matches ?? [])
        .filter((m) => m.tournamentId === tournamentId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [matches, tournamentId]
  )

  if (!tournament) return null

  const commitClub = (entry: TournamentEntry) => {
    const key = duplaKey(entry.players)
    const draft = drafts[key]
    if (draft === undefined || draft.trim() === (entry.club ?? "")) return
    setEntryClub(tournament.id, entry.players, draft)
  }

  const meta = [tournament.location, tournament.date].filter(Boolean).join(" · ")

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>{tournament.name}</Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t("tournament.duplasAndClubs")}</Text>
        {tournament.entries.length === 0 ? (
          <Text style={styles.hint}>{t("tournament.duplasEmpty")}</Text>
        ) : (
          tournament.entries.map((entry) => {
            const key = duplaKey(entry.players)
            return (
              <View key={key} style={styles.entryRow}>
                <Text style={styles.entryNames}>{duplaName(entry.players)}</Text>
                <TextInput
                  style={styles.input}
                  value={drafts[key] ?? entry.club ?? ""}
                  onChangeText={(value) => setDrafts((d) => ({ ...d, [key]: value }))}
                  onBlur={() => commitClub(entry)}
                  placeholder={t("tournament.clubPlaceholder")}
                  placeholderTextColor={theme.colors.textMuted}
                />
              </View>
            )
          })
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t("tournament.matches")}</Text>
        {tournamentMatches.length === 0 ? (
          <Text style={styles.hint}>{t("tournament.noMatches")}</Text>
        ) : (
          tournamentMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchRow}
              onPress={() => navigation.navigate("MatchDetail", { matchId: match.id })}
            >
              <Text style={styles.matchLabel} numberOfLines={2}>
                {match.round ? `${match.round} · ` : ""}
                {duplaName(match.teamA)} {t("common.vs")} {duplaName(match.teamB)}
              </Text>
              <Text style={styles.matchScore}>
                {match.scoreA}—{match.scoreB}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  )
}
