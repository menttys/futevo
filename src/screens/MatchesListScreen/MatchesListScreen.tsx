import React, { useCallback, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import type { Match } from "@/@types/futevo"
import { EmptyState } from "@/components/EmptyState"
import { House } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import type { TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useLanguage } from "@/i18n"

import { styles } from "./MatchesListScreen.styles"

type NavigationProp = BottomTabNavigationProp<TabParamList, "Matches">

const EMPTY_MATCHES: Match[] = []

export function MatchesListScreen() {
  const insets = useSafeAreaInsets()
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )

  const sortedMatches = useMemo(
    () => [...matches].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [matches]
  )

  const openMatch = useCallback(
    (match: Match) => {
      const screen =
        match.status === "in_progress" ? MatchesRoutes.LIVE_MATCH : MatchesRoutes.MATCH_DETAIL
      navigation.navigate(TabRoutes.DASHBOARD, { screen, params: { matchId: match.id } })
    },
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Match }) => (
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => openMatch(item)}>
        <Text style={styles.cardTeams} numberOfLines={1}>
          {playerName(item.teamA[0])} & {playerName(item.teamA[1])} vs {playerName(item.teamB[0])} &{" "}
          {playerName(item.teamB[1])}
        </Text>
        <Text style={styles.cardScore}>
          {item.scoreA} — {item.scoreB}
          {item.status === "in_progress" ? ` · ${t("matches.inProgress")}` : ""}
        </Text>
        <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </TouchableOpacity>
    ),
    [openMatch, playerName]
  )

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("matches.title")}</Text>
      </View>

      <FlashList
        data={sortedMatches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <EmptyState
            icon={House}
            title={t("matches.emptyTitle")}
            subtitle={t("matches.emptySubtitle")}
          />
        }
      />
    </View>
  )
}
