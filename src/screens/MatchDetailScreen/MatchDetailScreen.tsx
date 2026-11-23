import React, { useMemo, useState } from "react"
import { Pressable, ScrollView, Share, Text, View } from "react-native"

import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import { ATTACK_TYPES, Player } from "@/@types/futevo"
import { AttackBars } from "@/components/AttackBars"
import { CourtHeatMap } from "@/components/CourtHeatMap"
import { FutevoMark } from "@/components/FutevoMark"
import { LivePill } from "@/components/LivePill"
import { MeshBackground } from "@/components/MeshBackground"
import { MomentumChart } from "@/components/MomentumChart"
import { PlayerStatsList } from "@/components/PlayerStatsList"
import { PointLog } from "@/components/PointLog"
import { ScreenHeader } from "@/components/ScreenHeader"
import { SegmentedControl } from "@/components/SegmentedControl"
import { TournamentRow } from "@/components/TournamentRow"
import { ZoneHeatGrid } from "@/components/ZoneHeatGrid"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import { Share as ShareIcon, Trophy } from "@/lib/icons"
import { TabRoutes } from "@/navigation/routes"
import { MatchesStackParamList, TabParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { firstName, matchMinutes, sideLabel } from "@/utils/matchLabels"
import { clubForSide } from "@/utils/tournament"

import { styles } from "./MatchDetailScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "MatchDetail">
type MatchDetailRouteProp = RouteProp<MatchesStackParamList, "MatchDetail">
type Tab = "summary" | "players" | "log"

function playersById(players: Player[], ids: string[]): Player[] {
  return ids.map((id) => players.find((p) => p.id === id)).filter((p): p is Player => !!p)
}

// The result first, then the story of the match.
export function MatchDetailScreen() {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const tabBarInset = useTabBarInset()
  const navigation = useNavigation<NavigationProp>()
  const { matchId, from } = useRoute<MatchDetailRouteProp>().params
  const players = usePlayerStore((s) => s.players) ?? []
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) => s.tournaments?.find((tr) => tr.id === match?.tournamentId))
  const [tab, setTab] = useState<Tab>("summary")

  const tally = useMemo(() => {
    if (!match) return []
    const counts = new Map<string, number>()
    match.points.forEach((point) => {
      if (point.attackType) counts.set(point.attackType, (counts.get(point.attackType) ?? 0) + 1)
    })
    return ATTACK_TYPES.map((attack) => ({
      label: t(`attackTypes.${attack.id}`),
      count: counts.get(attack.id) ?? 0,
    }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [match, t])

  if (!match) return null

  const goBack = () => {
    if (from === "Matches" || !navigation.canGoBack()) {
      // Opened from the Matches tab: return there instead of the match-flow stack.
      navigation.getParent<BottomTabNavigationProp<TabParamList>>()?.navigate(TabRoutes.MATCHES)
    } else {
      navigation.goBack()
    }
  }

  const teamAPlayers = playersById(players, match.teamA)
  const teamBPlayers = playersById(players, match.teamB)
  const playerName = (id: string) => players.find((p) => p.id === id)?.name ?? t("common.unknownPlayer")
  const homeName = sideLabel(match, tournament, "A", playerName)
  const awayName = sideLabel(match, tournament, "B", playerName)
  // When a side is shown by its club, the dupla goes on the line underneath.
  const hasClubs = (side: "A" | "B") => !!clubForSide(match, tournament, side)
  const dupla = (list: Player[]) => list.map((p) => firstName(p.name)).join(" · ")
  const minutes = matchMinutes(match)
  const meta = [tournament?.name, match.round, minutes ? t("matches.minutes", { count: minutes }) : undefined]
    .filter(Boolean)
    .join(" · ")

  const onShare = () => {
    Share.share({ message: `${homeName} ${match.scoreA}–${match.scoreB} ${awayName} · ${t("app.name")}` }).catch(
      () => undefined
    )
  }

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("screens.match")}
        onBack={goBack}
        backLabel={t("common.back")}
        right={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("match.share")}
            onPress={onShare}
            style={styles.iconButton}
          >
            <ShareIcon size={18} color={theme.colors.text} />
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: tabBarInset + 16 }]}>
        <View style={styles.result}>
          <FutevoMark size={170} rotate={14} color={theme.colors.dark} style={styles.watermark} />
          <View style={styles.metaRow}>
            {match.status === "completed" ? (
              <View style={styles.finalPill}>
                <Text style={styles.finalLabel}>{t("match.final")}</Text>
              </View>
            ) : (
              <LivePill label={t("common.live")} />
            )}
            {meta ? (
              <Text style={styles.meta} numberOfLines={1}>
                {meta}
              </Text>
            ) : null}
          </View>

          <View style={styles.sides}>
            <View style={styles.side}>
              <View style={styles.nameRow}>
                {match.winner === "A" ? <Trophy size={15} color={theme.colors.text} /> : null}
                <Text style={styles.name(false)} numberOfLines={1}>
                  {homeName}
                </Text>
              </View>
              {hasClubs("A") ? <Text style={styles.dupla}>{dupla(teamAPlayers)}</Text> : null}
            </View>
            <View style={[styles.side, styles.sideRight]}>
              <View style={styles.nameRow}>
                {match.winner === "B" ? <Trophy size={15} color={theme.colors.purple} /> : null}
                <Text style={styles.name(true)} numberOfLines={1}>
                  {awayName}
                </Text>
              </View>
              {hasClubs("B") ? <Text style={styles.dupla}>{dupla(teamBPlayers)}</Text> : null}
            </View>
          </View>

          <View style={styles.scores}>
            <Text style={styles.score(false)}>{match.scoreA}</Text>
            <Text style={styles.score(true)}>{match.scoreB}</Text>
          </View>
        </View>

        {tournament ? (
          <TournamentRow
            name={tournament.name}
            subtitle={match.round}
            onPress={() => navigation.navigate("TournamentDetail", { tournamentId: tournament.id })}
          />
        ) : null}

        <SegmentedControl
          options={[
            { value: "summary", label: t("match.tabs.summary") },
            { value: "players", label: t("match.tabs.players") },
            { value: "log", label: t("match.tabs.pointLog") },
          ]}
          value={tab}
          onChange={setTab}
        />

        {tab === "summary" ? (
          <>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>{t("match.momentum")}</Text>
              {match.points.length > 0 ? (
                <MomentumChart points={match.points} />
              ) : (
                <Text style={styles.empty}>{t("match.noPoints")}</Text>
              )}
            </View>
            <View style={styles.pair}>
              <View style={[styles.card, styles.half]}>
                <Text style={styles.cardLabel}>{t("match.landingZones")}</Text>
                <ZoneHeatGrid points={match.points} />
              </View>
              <View style={[styles.card, styles.half]}>
                <Text style={styles.cardLabel}>{t("match.attackTypes")}</Text>
                {tally.length > 0 ? (
                  <AttackBars items={tally} />
                ) : (
                  <Text style={styles.empty}>{t("match.noPoints")}</Text>
                )}
              </View>
            </View>
          </>
        ) : null}

        {tab === "players" ? (
          <>
            <PlayerStatsList points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
            <CourtHeatMap points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
          </>
        ) : null}

        {tab === "log" ? (
          match.points.length > 0 ? (
            <PointLog points={match.points} teamA={teamAPlayers} teamB={teamBPlayers} />
          ) : (
            <Text style={styles.empty}>{t("match.noPoints")}</Text>
          )
        ) : null}
      </ScrollView>
    </View>
  )
}

