import React, { useCallback, useMemo, useState } from "react"
import { ScrollView, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import type { Match, Tournament } from "@/@types/futevo"
import { Chip } from "@/components/Chip"
import { EmptyState } from "@/components/EmptyState"
import { LiveMatchCard } from "@/components/LiveMatchCard"
import { MatchRow } from "@/components/MatchRow"
import { MeshBackground } from "@/components/MeshBackground"
import { ScreenHeader } from "@/components/ScreenHeader"
import { SearchField } from "@/components/SearchField"
import { SectionLabel } from "@/components/SectionHeader"
import { TournamentRow } from "@/components/TournamentRow"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { MatchesRoutes, TabRoutes } from "@/navigation/routes"
import type { TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { dayKey, dayLabel, matchMinutes, sideLabel, timeLabel } from "@/utils/matchLabels"

import { styles } from "./MatchesListScreen.styles"

type NavigationProp = BottomTabNavigationProp<TabParamList, "Matches">

type Filter = "all" | "live" | "finished" | "tournaments"

type Row =
  | { type: "day"; key: string; label: string }
  | { type: "match"; key: string; match: Match }
  | { type: "tournament"; key: string; tournament: Tournament }

const FILTERS: Filter[] = ["all", "live", "finished", "tournaments"]
const EMPTY_MATCHES: Match[] = []
const EMPTY_TOURNAMENTS: Tournament[] = []

export function MatchesListScreen() {
  const insets = useSafeAreaInsets()
  const tabBarInset = useTabBarInset()
  const { t, currentLanguage } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)
  const tournaments = useTournamentStore((s) => s.tournaments) ?? EMPTY_TOURNAMENTS

  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )
  const tournamentOf = useCallback(
    (m: Match) => tournaments.find((tr) => tr.id === m.tournamentId),
    [tournaments]
  )

  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase()
    const matchHits = (m: Match) => {
      if (!q) return true
      const tournament = tournamentOf(m)
      const haystack = [
        ...m.teamA.map(playerName),
        ...m.teamB.map(playerName),
        sideLabel(m, tournament, "A", playerName),
        sideLabel(m, tournament, "B", playerName),
        tournament?.name,
        new Date(m.createdAt).toLocaleDateString(),
        m.createdAt.slice(0, 10),
      ]
      return haystack.some((v) => v?.toLowerCase().includes(q))
    }
    const tournamentHits = (tr: Tournament) =>
      !q || [tr.name, tr.location].some((v) => v?.toLowerCase().includes(q))

    type Entry = { at: string; row: Row }
    const entries: Entry[] = []
    if (filter !== "tournaments") {
      for (const m of matches) {
        if (filter === "live" && m.status !== "in_progress") continue
        if (filter === "finished" && m.status !== "completed") continue
        if (!matchHits(m)) continue
        entries.push({ at: m.createdAt, row: { type: "match", key: m.id, match: m } })
      }
    }
    if (filter === "all" || filter === "tournaments") {
      for (const tr of tournaments) {
        if (!tournamentHits(tr)) continue
        entries.push({ at: tr.createdAt, row: { type: "tournament", key: tr.id, tournament: tr } })
      }
    }
    // Live matches pin to the top of the timeline.
    const pinned = (e: Entry) => (e.row.type === "match" && e.row.match.status === "in_progress" ? 1 : 0)
    entries.sort((a, b) => pinned(b) - pinned(a) || b.at.localeCompare(a.at))

    const out: Row[] = []
    let lastDay = ""
    for (const e of entries) {
      const day = pinned(e) ? dayKey(new Date().toISOString()) : dayKey(e.at)
      if (day !== lastDay) {
        lastDay = day
        out.push({
          type: "day",
          key: `day-${day}`,
          label: pinned(e)
            ? t("common.today")
            : dayLabel(e.at, { today: t("common.today"), yesterday: t("common.yesterday") }, currentLanguage),
        })
      }
      out.push(e.row)
    }
    return out
  }, [matches, tournaments, filter, query, playerName, tournamentOf, t, currentLanguage])

  const openMatch = useCallback(
    (match: Match) => {
      const screen = match.status === "in_progress" ? MatchesRoutes.LIVE_MATCH : MatchesRoutes.MATCH_DETAIL
      navigation.navigate(TabRoutes.MATCH_FLOW, {
        screen,
        params: { matchId: match.id, ...(screen === MatchesRoutes.MATCH_DETAIL ? { from: "Matches" as const } : {}) },
      })
    },
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Row }) => {
      if (item.type === "day") return <SectionLabel title={item.label} style={styles.dayLabel} />

      if (item.type === "tournament") {
        const tr = item.tournament
        const count = matches.filter((m) => m.tournamentId === tr.id).length
        return (
          <View style={styles.item}>
            <TournamentRow
              name={tr.name}
              subtitle={t("matches.tournamentSubtitle", { duplas: tr.entries.length, matches: count })}
              onPress={() =>
                navigation.navigate(TabRoutes.MATCH_FLOW, {
                  screen: MatchesRoutes.TOURNAMENT_DETAIL,
                  params: { tournamentId: tr.id },
                })
              }
            />
          </View>
        )
      }

      const m = item.match
      const tournament = tournamentOf(m)
      const homeName = sideLabel(m, tournament, "A", playerName)
      const awayName = sideLabel(m, tournament, "B", playerName)

      if (m.status === "in_progress") {
        return (
          <View style={styles.item}>
            <LiveMatchCard
              variant="compact"
              homeName={homeName}
              awayName={awayName}
              scoreA={m.scoreA}
              scoreB={m.scoreB}
              liveLabel={t("common.live")}
              onPress={() => openMatch(m)}
            />
          </View>
        )
      }

      const minutes = matchMinutes(m)
      const detail = tournament?.name ?? (minutes ? t("matches.minutes", { count: minutes }) : undefined)
      return (
        <View style={styles.item}>
          <MatchRow
            homeName={homeName}
            awayName={awayName}
            scoreA={m.scoreA}
            scoreB={m.scoreB}
            subtitle={[timeLabel(m.createdAt, currentLanguage), detail].filter(Boolean).join(" · ")}
            winLabel={t("common.win")}
            lossLabel={t("common.loss")}
            onPress={() => openMatch(m)}
          />
        </View>
      )
    },
    [matches, navigation, openMatch, playerName, tournamentOf, t, currentLanguage]
  )

  const isSearching = query.trim().length > 0 || filter !== "all"

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <MeshBackground />
      <View style={styles.header}>
        <ScreenHeader variant="large" title={t("matches.title")} style={styles.title} />
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder={t("matches.searchPlaceholder")}
          clearLabel={t("common.clear")}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTERS.map((f) => (
            <Chip key={f} label={t(`matches.filters.${f}`)} selected={filter === f} onPress={() => setFilter(f)} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.listWrapper}>
        <FlashList
          data={rows}
          keyExtractor={(item) => item.key}
          getItemType={(item) => (item.type === "match" && item.match.status === "in_progress" ? "live" : item.type)}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContent, paddingBottom: tabBarInset + 16 }}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <EmptyState
              title={isSearching ? t("matches.noResultsTitle") : t("matches.emptyTitle")}
              subtitle={isSearching ? t("matches.noResultsSubtitle") : t("matches.emptySubtitle")}
              actionLabel={isSearching ? undefined : t("tabs.newMatch")}
              onAction={
                isSearching
                  ? undefined
                  : () => navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
              }
            />
          }
        />
      </View>
    </View>
  )
}
