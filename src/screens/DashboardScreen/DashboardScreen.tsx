import React, { useCallback, useMemo } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import type { Match, Tournament } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { LiveMatchCard } from "@/components/LiveMatchCard"
import { MatchRow } from "@/components/MatchRow"
import { MeshBackground } from "@/components/MeshBackground"
import { SectionHeader } from "@/components/SectionHeader"
import { StatTile } from "@/components/StatTile"
import { TournamentRow } from "@/components/TournamentRow"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { MatchesRoutes, SettingsRoutes, TabRoutes } from "@/navigation/routes"
import type { TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { useUserStore } from "@/store/userState"
import { dayLabel, firstName, sideLabel } from "@/utils/matchLabels"

import { styles } from "./DashboardScreen.styles"

type NavigationProp = BottomTabNavigationProp<TabParamList, "Dashboard">

const EMPTY_MATCHES: Match[] = []
const EMPTY_TOURNAMENTS: Tournament[] = []
const RECENT_COUNT = 3
const RECENT_COUNT_WIDE = 6

function greetingKey(hour: number) {
  if (hour < 12) return "dashboard.greetingMorning"
  if (hour < 18) return "dashboard.greetingAfternoon"
  return "dashboard.greetingEvening"
}

export function DashboardScreen() {
  const insets = useSafeAreaInsets()
  const tabBarInset = useTabBarInset()
  const wide = useSideTabBar()
  const { theme } = useUnistyles()
  const { t, currentLanguage } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const user = useUserStore((s) => s.user)
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)
  const tournaments = useTournamentStore((s) => s.tournaments) ?? EMPTY_TOURNAMENTS

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )
  const tournamentOf = useCallback(
    (m: Match) => tournaments.find((tr) => tr.id === m.tournamentId),
    [tournaments]
  )

  const liveMatch = useMemo(
    () =>
      matches
        .filter((m) => m.status === "in_progress")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0],
    [matches]
  )

  const completed = useMemo(
    () =>
      matches
        .filter((m) => m.status === "completed")
        .sort((a, b) => (b.completedAt ?? b.createdAt).localeCompare(a.completedAt ?? a.createdAt)),
    [matches]
  )

  const pointsLogged = useMemo(
    () => matches.reduce((sum, m) => sum + m.points.length, 0),
    [matches]
  )

  const latestTournament = useMemo(
    () => [...tournaments].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0],
    [tournaments]
  )

  const openMatch = useCallback(
    (match: Match) => {
      if (match.status === "in_progress") {
        navigation.navigate(TabRoutes.MATCH_FLOW, {
          screen: MatchesRoutes.LIVE_MATCH,
          params: { matchId: match.id },
        })
        return
      }
      navigation.navigate(TabRoutes.MATCH_FLOW, {
        screen: MatchesRoutes.MATCH_DETAIL,
        params: { matchId: match.id, from: "Dashboard" as const },
      })
    },
    [navigation]
  )

  const name = firstName(user?.displayName ?? t("settings.defaultYou"))
  const today = new Date().toLocaleDateString(currentLanguage, {
    weekday: "long",
    day: "numeric",
    month: "short",
  })

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 4, paddingBottom: tabBarInset + 16 },
        ]}
      >
        {wide ? null : (
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <FutevoMark size={30} />
              <Text style={styles.wordmark}>{t("app.name")}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("dashboard.profile")}
              onPress={() =>
                navigation.navigate(TabRoutes.SETTINGS, { screen: SettingsRoutes.SETTINGS_HOME })
              }
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
            </Pressable>
          </View>
        )}

        {wide ? (
          <View style={styles.headerWide}>
            <View>
              <Text style={styles.date}>{today}</Text>
              <Text style={styles.greeting}>{t(greetingKey(new Date().getHours()), { name })}</Text>
            </View>

            <AppButton
              label={t("tabs.newMatch")}
              onPress={() =>
                navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
              }
            />
          </View>
        ) : (
          <View>
            <Text style={styles.date}>{today}</Text>
            <Text style={styles.greeting}>{t(greetingKey(new Date().getHours()), { name })}</Text>
          </View>
        )}

        {wide ? (
          <View style={styles.row}>
            <View style={styles.colMain}>
              {liveMatch ? (
                <LiveMatchCard
                  homeName={sideLabel(liveMatch, tournamentOf(liveMatch), "A", playerName)}
                  awayName={sideLabel(liveMatch, tournamentOf(liveMatch), "B", playerName)}
                  scoreA={liveMatch.scoreA}
                  scoreB={liveMatch.scoreB}
                  liveLabel={t("common.live")}
                  meta={t("dashboard.liveMeta", {
                    target: liveMatch.targetScore,
                    winBy: liveMatch.winBy,
                  })}
                  actionLabel={t("dashboard.resume")}
                  onPress={() => openMatch(liveMatch)}
                />
              ) : (
                <View style={styles.startCard}>
                  <FutevoMark
                    size={170}
                    rotate={14}
                    color={theme.colors.dark}
                    style={styles.startWatermark}
                  />
                  <Text style={styles.startTitle}>{t("dashboard.startTitle")}</Text>
                  <Text style={styles.startSubtitle}>{t("dashboard.startSubtitle")}</Text>
                  <AppButton
                    label={t("dashboard.startMatch")}
                    variant="cream"
                    labelStyle="body"
                    onPress={() =>
                      navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
                    }
                  />
                </View>
              )}
            </View>
            <View style={styles.colSide}>
              <View style={styles.stats}>
                <StatTile value={String(matches.length)} label={t("dashboard.statMatches")} />
                <StatTile value={String(pointsLogged)} label={t("dashboard.statPoints")} />
                <StatTile
                  value={String(tournaments.length)}
                  label={t("dashboard.statTournaments")}
                />
              </View>

              {latestTournament ? (
                <View>
                  <SectionHeader
                    title={t("dashboard.tournaments")}
                    actionLabel={t("dashboard.seeAll")}
                    onAction={() => navigation.navigate(TabRoutes.MATCHES)}
                  />
                  <TournamentRow
                    variant="yellow"
                    name={latestTournament.name}
                    subtitle={t("dashboard.tournamentSubtitle", {
                      duplas: latestTournament.entries.length,
                      matches: matches.filter((m) => m.tournamentId === latestTournament.id).length,
                    })}
                    onPress={() =>
                      navigation.navigate(TabRoutes.MATCH_FLOW, {
                        screen: MatchesRoutes.TOURNAMENT_DETAIL,
                        params: { tournamentId: latestTournament.id },
                      })
                    }
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <>
            {liveMatch ? (
              <LiveMatchCard
                homeName={sideLabel(liveMatch, tournamentOf(liveMatch), "A", playerName)}
                awayName={sideLabel(liveMatch, tournamentOf(liveMatch), "B", playerName)}
                scoreA={liveMatch.scoreA}
                scoreB={liveMatch.scoreB}
                liveLabel={t("common.live")}
                meta={t("dashboard.liveMeta", {
                  target: liveMatch.targetScore,
                  winBy: liveMatch.winBy,
                })}
                actionLabel={t("dashboard.resume")}
                onPress={() => openMatch(liveMatch)}
              />
            ) : (
              <View style={styles.startCard}>
                <FutevoMark
                  size={170}
                  rotate={14}
                  color={theme.colors.dark}
                  style={styles.startWatermark}
                />
                <Text style={styles.startTitle}>{t("dashboard.startTitle")}</Text>
                <Text style={styles.startSubtitle}>{t("dashboard.startSubtitle")}</Text>
                <AppButton
                  label={t("dashboard.startMatch")}
                  variant="cream"
                  labelStyle="body"
                  onPress={() =>
                    navigation.navigate(TabRoutes.MATCH_FLOW, { screen: MatchesRoutes.NEW_MATCH })
                  }
                />
              </View>
            )}

            <View style={styles.stats}>
              <StatTile value={String(matches.length)} label={t("dashboard.statMatches")} />
              <StatTile value={String(pointsLogged)} label={t("dashboard.statPoints")} />
              <StatTile value={String(tournaments.length)} label={t("dashboard.statTournaments")} />
            </View>

            {latestTournament ? (
              <View>
                <SectionHeader
                  title={t("dashboard.tournaments")}
                  actionLabel={t("dashboard.seeAll")}
                  onAction={() => navigation.navigate(TabRoutes.MATCHES)}
                />
                <TournamentRow
                  variant="yellow"
                  name={latestTournament.name}
                  subtitle={t("dashboard.tournamentSubtitle", {
                    duplas: latestTournament.entries.length,
                    matches: matches.filter((m) => m.tournamentId === latestTournament.id).length,
                  })}
                  onPress={() =>
                    navigation.navigate(TabRoutes.MATCH_FLOW, {
                      screen: MatchesRoutes.TOURNAMENT_DETAIL,
                      params: { tournamentId: latestTournament.id },
                    })
                  }
                />
              </View>
            ) : null}
          </>
        )}

        <View>
          <SectionHeader title={t("dashboard.recentMatches")} />
          {completed.length === 0 ? (
            <Text style={styles.empty}>{t("dashboard.noMatches")}</Text>
          ) : (
            <View style={wide ? styles.listWide : styles.list}>
              {completed.slice(0, wide ? RECENT_COUNT_WIDE : RECENT_COUNT).map((match) => (
                <View key={match.id} style={wide ? styles.cell : undefined}>
                  <MatchRow
                    homeName={sideLabel(match, tournamentOf(match), "A", playerName)}
                    awayName={sideLabel(match, tournamentOf(match), "B", playerName)}
                    scoreA={match.scoreA}
                    scoreB={match.scoreB}
                    subtitle={dayLabel(
                      match.completedAt ?? match.createdAt,
                      { today: t("common.today"), yesterday: t("common.yesterday") },
                      currentLanguage
                    )}
                    winLabel={t("common.win")}
                    lossLabel={t("common.loss")}
                    onPress={() => openMatch(match)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
