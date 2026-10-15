import React, { useLayoutEffect, useMemo, useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { ATTACK_TYPES, Player } from "@/@types/futevo"
import { CourtHeatMap } from "@/components/CourtHeatMap"
import { PlayerStatsList } from "@/components/PlayerStatsList"
import { PointLog } from "@/components/PointLog"
import { IS_WEB } from "@/constants/Platform"
import { useMatches } from "@/hooks/useMatches"
import { ChevronLeft, Trash2, Trophy } from "@/lib/icons"
import { TabRoutes } from "@/navigation/routes"
import { MatchesStackParamList, TabParamList } from "@/navigation/types"
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
  const { matchId, from } = useRoute<MatchDetailRouteProp>().params
  const players = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) =>
    s.tournaments?.find((t) => t.id === match?.tournamentId)
  )
  const { deleteMatch } = useMatches()
  const [tab, setTab] = useState<"players" | "log">("players")

  useLayoutEffect(() => {
    const goBack = () => {
      if (from === "Matches" || !navigation.canGoBack()) {
        // Opened from the Matches tab: return there instead of the match-flow stack.
        navigation.getParent<BottomTabNavigationProp<TabParamList>>()?.navigate(TabRoutes.MATCHES)
      } else {
        navigation.goBack()
      }
    }
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={goBack}
          hitSlop={theme.hitSlop.md}
          accessibilityRole="button"
          style={styles.backButton}
        >
          <ChevronLeft size={26} color={theme.colors.dark} />
        </TouchableOpacity>
      ),
    })
    if (IS_WEB) return
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
  }, [navigation, deleteMatch, matchId, from, theme, t])

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

      <View style={styles.resultCard}>
        <View style={styles.teamColumn}>
          {clubA ? (
            <Text style={styles.clubName(theme.colors.teamA)} numberOfLines={2}>
              {clubA}
            </Text>
          ) : null}
          <Text style={styles.teamNames(theme.colors.teamA, !!clubA)} numberOfLines={2}>
            {teamNames(teamAPlayers, teamFallback)}
          </Text>
          <Text style={styles.teamScore(theme.colors.teamA)}>{match.scoreA}</Text>
        </View>
        <Trophy size={28} color={theme.colors.primary} />
        <View style={styles.teamColumn}>
          {clubB ? (
            <Text style={styles.clubName(theme.colors.purple)} numberOfLines={2}>
              {clubB}
            </Text>
          ) : null}
          <Text style={styles.teamNames(theme.colors.purple, !!clubB)} numberOfLines={2}>
            {teamNames(teamBPlayers, teamFallback)}
          </Text>
          <Text style={styles.teamScore(theme.colors.purple)}>{match.scoreB}</Text>
        </View>
      </View>

      <CourtHeatMap points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />

      <View style={styles.tabBar}>
        {(["players", "log"] as const).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.tab(tab === key)}
            onPress={() => setTab(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === key }}
          >
            <Text style={styles.tabLabel(tab === key)}>
              {key === "players" ? t("match.tabs.players") : t("match.tabs.pointLog")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "players" ? (
        <View style={{ gap: theme.spacing.lg }}>
          <View style={styles.tallyRow}>
            {tally.map((item) => (
              <View key={item.label} style={styles.tallyChip}>
                <Text style={styles.tallyText}>
                  {item.label}: {item.count}
                </Text>
              </View>
            ))}
          </View>
          <PlayerStatsList points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
        </View>
      ) : (
        <PointLog points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
      )}
    </ScrollView>
  )
}
