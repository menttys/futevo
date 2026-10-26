import React, { useCallback, useMemo, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { Match, Tournament } from "@/@types/futevo"
import { EmptyState } from "@/components/EmptyState"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { Search, X } from "@/lib/icons"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import type { TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { clubForSide } from "@/utils/tournament"
import { useLanguage } from "@/i18n"

import { styles } from "./MatchesListScreen.styles"

type NavigationProp = BottomTabNavigationProp<TabParamList, "Matches">

const EMPTY_MATCHES: Match[] = []
const EMPTY_TOURNAMENTS: Tournament[] = []

export function MatchesListScreen() {
  const insets = useSafeAreaInsets()
  const tabBarInset = useTabBarInset()
  const { t } = useLanguage()
  const { theme } = useUnistyles()
  const navigation = useNavigation<NavigationProp>()
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)
  const tournaments = useTournamentStore((s) => s.tournaments) ?? EMPTY_TOURNAMENTS

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )

  const [query, setQuery] = useState("")

  const filteredMatches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sorted = [...matches].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    if (!q) return sorted
    return sorted.filter((m) => {
      const tournament = tournaments.find((tr) => tr.id === m.tournamentId)
      const haystack = [
        ...m.teamA.map(playerName),
        ...m.teamB.map(playerName),
        clubForSide(m, tournament, "A"),
        clubForSide(m, tournament, "B"),
        new Date(m.createdAt).toLocaleDateString(),
        m.createdAt.slice(0, 10),
      ]
      return haystack.some((v) => v?.toLowerCase().includes(q))
    })
  }, [matches, tournaments, playerName, query])

  const openMatch = useCallback(
    (match: Match) => {
      const screen =
        match.status === "in_progress" ? MatchesRoutes.LIVE_MATCH : MatchesRoutes.MATCH_DETAIL
      navigation.navigate(TabRoutes.MATCH_FLOW, {
        screen,
        params: { matchId: match.id, ...(screen === MatchesRoutes.MATCH_DETAIL ? { from: "Matches" as const } : {}) },
      })
    },
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Match }) => (
      <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => openMatch(item)}>
        {(["A", "B"] as const).map((side) => {
          const ids = side === "A" ? item.teamA : item.teamB
          const score = side === "A" ? item.scoreA : item.scoreB
          const club = clubForSide(
            item,
            tournaments.find((tr) => tr.id === item.tournamentId),
            side
          )
          const other = side === "A" ? item.scoreB : item.scoreA
          const result = score > other ? "lead" : score < other ? "trail" : "tie"
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
        <View style={styles.footer}>
          <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          {item.status === "in_progress" ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{t("matches.inProgress")}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    ),
    [openMatch, playerName, tournaments, t]
  )

  const isSearching = query.trim().length > 0

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Search size={18} color={theme.colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder={t("matches.searchPlaceholder")}
            placeholderTextColor={theme.colors.grey300}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery("")} hitSlop={8}>
              <X size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.listWrapper}>
        <FlashList
          data={filteredMatches}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContent, paddingBottom: tabBarInset + 16 }}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <EmptyState
              icon={Search}
              title={isSearching ? t("matches.noResultsTitle") : t("matches.emptyTitle")}
              subtitle={
                isSearching ? t("matches.noResultsSubtitle") : t("matches.emptySubtitle")
              }
            />
          }
        />
      </View>
    </View>
  )
}
