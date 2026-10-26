import React, { useCallback, useMemo } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import type { Match, Tournament } from "@/@types/futevo"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import type { TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { clubForSide } from "@/utils/tournament"

import { styles } from "./DashboardScreen.styles"

type NavigationProp = BottomTabNavigationProp<TabParamList, "Dashboard">

const EMPTY_MATCHES: Match[] = []
const EMPTY_TOURNAMENTS: Tournament[] = []
const RECENT_COUNT = 2

export function DashboardScreen() {
  const insets = useSafeAreaInsets()
  const tabBarInset = useTabBarInset()
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)
  const tournaments = useTournamentStore((s) => s.tournaments) ?? EMPTY_TOURNAMENTS

  const recentMatches = useMemo(
    () =>
      matches
        .filter((m) => m.status === "completed")
        .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt))
        .slice(0, RECENT_COUNT),
    [matches]
  )

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )

  const openMatch = useCallback(
    (match: Match) => {
      navigation.navigate(TabRoutes.MATCH_FLOW, {
        screen: MatchesRoutes.MATCH_DETAIL,
        params: { matchId: match.id, from: "Dashboard" as const },
      })
    },
    [navigation]
  )

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: tabBarInset + 16 }]}
    >
      <Text style={styles.sectionTitle}>{t("dashboard.recentMatches")}</Text>
      {recentMatches.length === 0 ? (
        <Text style={styles.empty}>{t("dashboard.noMatches")}</Text>
      ) : (
        recentMatches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => openMatch(match)}
          >
            {(["A", "B"] as const).map((side) => {
              const ids = side === "A" ? match.teamA : match.teamB
              const score = side === "A" ? match.scoreA : match.scoreB
              const other = side === "A" ? match.scoreB : match.scoreA
              const result = score > other ? "lead" : score < other ? "trail" : "tie"
              const club = clubForSide(
                match,
                tournaments.find((tr) => tr.id === match.tournamentId),
                side
              )
              return (
                <View key={side} style={styles.teamRow}>
                  <View style={styles.teamInfo}>
                    {club ? (
                      <Text style={styles.club} numberOfLines={1}>
                        {club}
                      </Text>
                    ) : null}
                    <Text style={styles.players(result)} numberOfLines={1}>
                      {`${playerName(ids[0])} & ${playerName(ids[1])}`}
                    </Text>
                  </View>
                  <Text style={styles.score(result)}>{score}</Text>
                </View>
              )
            })}
            <Text style={styles.date}>
              {new Date(match.completedAt ?? match.createdAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  )
}
