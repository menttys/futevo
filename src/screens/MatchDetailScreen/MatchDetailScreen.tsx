import React, { useLayoutEffect, useMemo } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { ATTACK_TYPES, Player } from "@/@types/futevo"
import { CourtHeatMap } from "@/components/CourtHeatMap"
import { useMatches } from "@/hooks/useMatches"
import { Trash2, Trophy } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { confirmAction } from "@/utils/confirmAction"
import { clubForSide } from "@/utils/tournament"
import { useLanguage } from "@/i18n"

import { styles } from "./MatchDetailScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "MatchDetail">
type MatchDetailRouteProp = RouteProp<MatchesStackParamList, "MatchDetail">

function playersById(players: Player[], ids: string[]): Player[] {
  return ids.map((id) => players.find((p) => p.id === id)).filter((p): p is Player => !!p)
}

function teamNames(players: Player[], fallback: string): string {
  return players.map((p) => p.name).join(" & ") || fallback
}

export function MatchDetailScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<MatchDetailRouteProp>().params
  const players = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) =>
    s.tournaments?.find((t) => t.id === match?.tournamentId)
  )
  const { deleteMatch } = useMatches()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            confirmAction({
              title: t("match.deleteTitle"),
              message: t("match.deleteMessage"),
              confirmLabel: t("match.deleteConfirm"),
              onConfirm: () => {
                deleteMatch(matchId)
                navigation.goBack()
              },
            })
          }}
          hitSlop={theme.hitSlop.md}
        >
          <Trash2 size={20} color={theme.colors.danger} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, deleteMatch, matchId, theme, t])

  const tally = useMemo(() => {
    if (!match) return []
    const counts = new Map<string, number>()
    match.points.forEach((point) => {
      if (!point.attackType) return
      counts.set(point.attackType, (counts.get(point.attackType) ?? 0) + 1)
    })
    return ATTACK_TYPES.map((attack) => ({
      label: t(`attackTypes.${attack.id}`),
      count: counts.get(attack.id) ?? 0,
    }))
  }, [match, t])

  if (!match) return null

  const teamAPlayers = playersById(players, match.teamA)
  const teamBPlayers = playersById(players, match.teamB)
  const teamFallback = t("common.teamFallback")
  const clubA = clubForSide(match, tournament, "A")
  const clubB = clubForSide(match, tournament, "B")

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {match.winner ? (
        <View style={styles.winnerBanner}>
          <Trophy size={18} color={theme.colors.dark} />
          <Text style={styles.winnerText}>
            {t("match.won", { team: match.winner === "A" ? teamNames(teamAPlayers, teamFallback) : teamNames(teamBPlayers, teamFallback) })}
          </Text>
        </View>
      ) : null}

      {tournament ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("TournamentDetail", { tournamentId: tournament.id })}
        >
          <Text style={styles.sectionLabel}>
            {tournament.name}
            {match.round ? ` · ${match.round}` : ""} ›
          </Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.scoreRow}>
        <View style={styles.teamColumn}>
          <Text style={styles.teamNames}>{teamNames(teamAPlayers, teamFallback)}</Text>
          {clubA ? <Text style={styles.sectionLabel}>{clubA}</Text> : null}
          <Text style={styles.teamScore(theme.colors.teamA)}>{match.scoreA}</Text>
        </View>
        <View style={styles.teamColumn}>
          <Text style={styles.teamNames}>{teamNames(teamBPlayers, teamFallback)}</Text>
          {clubB ? <Text style={styles.sectionLabel}>{clubB}</Text> : null}
          <Text style={styles.teamScore(theme.colors.teamB)}>{match.scoreB}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.sectionLabel}>{t("match.attackTypes")}</Text>
        <View style={[styles.tallyRow, { marginTop: theme.spacing.sm }]}>
          {tally.map((t) => (
            <View key={t.label} style={styles.tallyChip}>
              <Text style={styles.tallyText}>
                {t.label}: {t.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <CourtHeatMap points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />

      <View>
        <Text style={styles.sectionLabel}>{t("match.pointLog")}</Text>
        {[...match.points].reverse().map((point, index) => {
          const teamPlayers = point.team === "A" ? teamAPlayers : teamBPlayers
          const scorer = teamPlayers.find((p) => p.id === point.scoringPlayerId)
          const attackLabel = point.attackType ? t(`attackTypes.${point.attackType}`) : undefined
          return (
            <View key={point.id} style={styles.pointRow}>
              <Text style={styles.pointLabel}>
                {t("match.pointLogEntry", {
                  number: match.points.length - index,
                  side: point.team,
                  where: point.ballOut ? t("match.ballOut") : t("match.zone", { zone: point.zone }),
                })}
                {attackLabel ? ` · ${attackLabel}` : ""}
                {scorer ? ` · ${scorer.name}` : ""}
              </Text>
              <Text style={styles.pointScore}>
                {point.scoreAAfter}-{point.scoreBAfter}
              </Text>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
