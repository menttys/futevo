import React, { useCallback, useMemo, useState } from "react"
import { Pressable, ScrollView, Share, Text, TextInput, View } from "react-native"
import type { StyleProp, TextStyle } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useUnistyles } from "react-native-unistyles"

import type { TournamentEntry } from "@/@types/futevo"
import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { LiveMatchCard } from "@/components/LiveMatchCard"
import { MatchRow } from "@/components/MatchRow"
import { MeshBackground } from "@/components/MeshBackground"
import { ScreenHeader } from "@/components/ScreenHeader"
import { SectionHeader } from "@/components/SectionHeader"
import { SegmentedControl } from "@/components/SegmentedControl"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useTournaments } from "@/hooks/useTournaments"
import { useLanguage } from "@/i18n"
import { Share as ShareIcon } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { firstName, sideLabel } from "@/utils/matchLabels"
import { computeStandings, duplaKey } from "@/utils/tournament"

import { styles } from "./TournamentDetailScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "TournamentDetail">
type TournamentRouteProp = RouteProp<MatchesStackParamList, "TournamentDetail">
type Tab = "standings" | "matches"

// A yellow banner with one oversized, cropped mark; standings underneath.
export function TournamentDetailScreen() {
  const { theme } = useUnistyles()
  const { t, currentLanguage } = useLanguage()
  const tabBarInset = useTabBarInset()
  const wide = useSideTabBar()
  const navigation = useNavigation<NavigationProp>()
  const { tournamentId } = useRoute<TournamentRouteProp>().params
  const tournament = useTournamentStore((s) => s.tournaments?.find((tr) => tr.id === tournamentId))
  const matches = useMatchStore((s) => s.matches)
  const players = usePlayerStore((s) => s.players)
  const { setEntryClub } = useTournaments()
  const [tab, setTab] = useState<Tab>("standings")
  // Tap a row to edit its club; the draft is written once on blur.
  const [editingKey, setEditingKey] = useState<string | undefined>()
  const [draft, setDraft] = useState("")

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer"),
    [players, t]
  )
  const duplaName = useCallback(
    (ids: [string, string]) =>
      `${firstName(playerName(ids[0]))} / ${firstName(playerName(ids[1]))}`,
    [playerName]
  )

  const tournamentMatches = useMemo(
    () =>
      (matches ?? [])
        .filter((m) => m.tournamentId === tournamentId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [matches, tournamentId]
  )

  const standings = useMemo(
    () => (tournament ? computeStandings(tournament, tournamentMatches) : []),
    [tournament, tournamentMatches]
  )

  if (!tournament) return null

  const startEditing = (entry: TournamentEntry) => {
    setEditingKey(duplaKey(entry.players))
    setDraft(entry.club ?? "")
  }

  const commitClub = (entry: TournamentEntry) => {
    setEditingKey(undefined)
    if (draft.trim() === (entry.club ?? "")) return
    setEntryClub(tournament.id, entry.players, draft)
  }

  const date = tournament.date
    ? new Date(`${tournament.date}T12:00:00`).toLocaleDateString(currentLanguage, {
        day: "numeric",
        month: "short",
      })
    : undefined
  const meta = [
    tournament.location,
    date,
    t("tournament.duplasCount", { count: tournament.entries.length }),
  ]
    .filter(Boolean)
    .join(" · ")
  const live = tournamentMatches.some((m) => m.status === "in_progress")
  const leader = standings[0]
  const liveMatches = tournamentMatches.filter((m) => m.status === "in_progress")
  const latest = tournamentMatches.find((m) => m.status === "completed")

  const onShareStandings = () => {
    const lines = standings.map(
      (row, i) =>
        `${i + 1}. ${duplaName(row.entry.players)}${row.entry.club ? ` (${row.entry.club})` : ""} ${row.wins}–${row.losses}`
    )
    Share.share({ message: [tournament.name, ...lines].join("\n") }).catch(() => undefined)
  }

  const renderMatch = (match: (typeof tournamentMatches)[number]) =>
    match.status === "in_progress" ? (
      <LiveMatchCard
        key={match.id}
        variant="compact"
        homeName={sideLabel(match, tournament, "A", playerName)}
        awayName={sideLabel(match, tournament, "B", playerName)}
        scoreA={match.scoreA}
        scoreB={match.scoreB}
        liveLabel={t("common.live")}
        onPress={() => navigation.navigate("LiveMatch", { matchId: match.id })}
      />
    ) : (
      <MatchRow
        key={match.id}
        homeName={sideLabel(match, tournament, "A", playerName)}
        awayName={sideLabel(match, tournament, "B", playerName)}
        scoreA={match.scoreA}
        scoreB={match.scoreB}
        subtitle={match.round}
        winLabel={t("common.win")}
        lossLabel={t("common.loss")}
        onPress={() => navigation.navigate("MatchDetail", { matchId: match.id })}
      />
    )

  const renderClub = (entry: TournamentEntry, editing: boolean, style: StyleProp<TextStyle>) =>
    editing ? (
      <TextInput
        style={styles.clubInput}
        value={draft}
        onChangeText={setDraft}
        onBlur={() => commitClub(entry)}
        onSubmitEditing={() => commitClub(entry)}
        placeholder={t("tournament.clubPlaceholder")}
        placeholderTextColor={theme.colors.textMuted}
        autoFocus
        returnKeyType="done"
      />
    ) : (
      <Text style={style} numberOfLines={1}>
        {entry.club ?? t("tournament.addClub")}
      </Text>
    )

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("screens.tournament")}
        onBack={() => navigation.goBack()}
        backLabel={t("common.back")}
        right={
          wide && standings.length > 0 ? (
            <AppButton
              label={t("tournament.shareStandings")}
              variant="wash"
              labelStyle="body"
              icon={<ShareIcon size={18} color={theme.colors.text} />}
              onPress={onShareStandings}
              style={styles.headerButton}
            />
          ) : undefined
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          wide && styles.contentWide,
          { paddingBottom: tabBarInset + 16 },
        ]}
      >
        <View style={[styles.banner, wide && styles.bannerWide]}>
          <FutevoMark size={300} color={theme.colors.washStrong} style={styles.bannerMark} />
          <View style={[styles.bannerBody, wide && styles.bannerBodyWide]}>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>
                {live
                  ? t("common.live")
                  : t("tournament.matchesCount", { count: tournamentMatches.length })}
              </Text>
            </View>
            <Text style={[styles.name, wide && styles.nameWide]}>{tournament.name}</Text>
            {meta ? <Text style={styles.meta}>{meta}</Text> : null}
          </View>
          {wide && leader && leader.wins + leader.losses > 0 ? (
            <View style={styles.leaderTile}>
              <Text style={styles.leaderValue}>{t("tournament.leader")}</Text>
              <Text style={styles.leaderLabel} numberOfLines={1}>
                {duplaName(leader.entry.players)}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={wide ? styles.tabsWide : undefined}>
          <SegmentedControl
            options={[
              { value: "standings", label: t("tournament.standings") },
              { value: "matches", label: t("tournament.matches") },
            ]}
            value={tab}
            onChange={setTab}
          />
        </View>

        {wide ? (
          <View style={styles.bodyWide}>
            <View style={styles.mainWide}>
              {tab === "standings" ? (
                standings.length === 0 ? (
                  <Text style={styles.hint}>{t("tournament.duplasEmpty")}</Text>
                ) : (
                  <>
                    <View style={styles.tableHeadWide}>
                      <Text style={[styles.headLabel, styles.wRank]}>#</Text>
                      <Text style={[styles.headLabel, styles.wDupla]}>{t("tournament.dupla")}</Text>
                      <Text style={[styles.headLabel, styles.wClub]}>{t("tournament.club")}</Text>
                      <Text style={[styles.headLabel, styles.wNum]}>{t("tournament.record")}</Text>
                      <Text style={[styles.headLabel, styles.wNum]}>{t("tournament.diff")}</Text>
                      <Text style={[styles.headLabel, styles.wPts]}>{t("tournament.points")}</Text>
                    </View>
                    <View style={styles.table}>
                      {standings.map((row, index) => {
                        const key = duplaKey(row.entry.players)
                        return (
                          <Pressable
                            key={key}
                            accessibilityRole="button"
                            accessibilityHint={t("tournament.editClub")}
                            onPress={() => startEditing(row.entry)}
                            style={[styles.standing(index === 0), styles.standingWide]}
                          >
                            <Text style={[styles.rank, styles.wRank]}>{index + 1}</Text>
                            <Text style={[styles.duplaName, styles.wDupla]} numberOfLines={1}>
                              {duplaName(row.entry.players)}
                            </Text>
                            <View style={styles.wClub}>
                              {renderClub(row.entry, editingKey === key, styles.clubWide)}
                            </View>
                            <Text
                              style={[styles.record, styles.wNum]}
                            >{`${row.wins}–${row.losses}`}</Text>
                            <Text style={[styles.diff, styles.wNum]}>
                              {row.diff > 0 ? `+${row.diff}` : String(row.diff)}
                            </Text>
                            <Text style={[styles.points, styles.wPts]}>{row.wins * 3}</Text>
                          </Pressable>
                        )
                      })}
                    </View>
                  </>
                )
              ) : tournamentMatches.length === 0 ? (
                <Text style={styles.hint}>{t("tournament.noMatches")}</Text>
              ) : (
                <View style={styles.table}>{tournamentMatches.map(renderMatch)}</View>
              )}
            </View>
            <View style={styles.sideWide}>
              {liveMatches.length > 0 ? (
                <View>
                  <SectionHeader title={t("tournament.nextUp")} />
                  <View style={styles.table}>{liveMatches.map(renderMatch)}</View>
                </View>
              ) : null}
              {latest ? (
                <View>
                  <SectionHeader title={t("tournament.latest")} />
                  {renderMatch(latest)}
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <>
            {tab === "standings" ? (
              standings.length === 0 ? (
                <Text style={styles.hint}>{t("tournament.duplasEmpty")}</Text>
              ) : (
                <>
                  <View style={styles.tableHead}>
                    <Text style={[styles.headLabel, styles.headDupla]}>
                      {t("tournament.duplaClub")}
                    </Text>
                    <Text style={[styles.headLabel, styles.colRecord]}>
                      {t("tournament.record")}
                    </Text>
                    <Text style={[styles.headLabel, styles.colDiff]}>{t("tournament.diff")}</Text>
                  </View>
                  <View style={styles.table}>
                    {standings.map((row, index) => {
                      const key = duplaKey(row.entry.players)
                      const editing = editingKey === key
                      return (
                        <Pressable
                          key={key}
                          accessibilityRole="button"
                          accessibilityHint={t("tournament.editClub")}
                          onPress={() => startEditing(row.entry)}
                          style={styles.standing(index === 0)}
                        >
                          <Text style={styles.rank}>{index + 1}</Text>
                          <View style={styles.dupla}>
                            <Text style={styles.duplaName} numberOfLines={1}>
                              {duplaName(row.entry.players)}
                            </Text>
                            {editing ? (
                              <TextInput
                                style={styles.clubInput}
                                value={draft}
                                onChangeText={setDraft}
                                onBlur={() => commitClub(row.entry)}
                                onSubmitEditing={() => commitClub(row.entry)}
                                placeholder={t("tournament.clubPlaceholder")}
                                placeholderTextColor={theme.colors.textMuted}
                                autoFocus
                                returnKeyType="done"
                              />
                            ) : (
                              <Text style={styles.club} numberOfLines={1}>
                                {row.entry.club ?? t("tournament.addClub")}
                              </Text>
                            )}
                          </View>
                          <Text style={styles.record}>{`${row.wins}–${row.losses}`}</Text>
                          <Text style={styles.diff}>
                            {row.diff > 0 ? `+${row.diff}` : String(row.diff)}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </>
              )
            ) : tournamentMatches.length === 0 ? (
              <Text style={styles.hint}>{t("tournament.noMatches")}</Text>
            ) : (
              <View style={styles.table}>
                {tournamentMatches.map((match) =>
                  match.status === "in_progress" ? (
                    <LiveMatchCard
                      key={match.id}
                      variant="compact"
                      homeName={sideLabel(match, tournament, "A", playerName)}
                      awayName={sideLabel(match, tournament, "B", playerName)}
                      scoreA={match.scoreA}
                      scoreB={match.scoreB}
                      liveLabel={t("common.live")}
                      onPress={() => navigation.navigate("LiveMatch", { matchId: match.id })}
                    />
                  ) : (
                    <MatchRow
                      key={match.id}
                      homeName={sideLabel(match, tournament, "A", playerName)}
                      awayName={sideLabel(match, tournament, "B", playerName)}
                      scoreA={match.scoreA}
                      scoreB={match.scoreB}
                      subtitle={match.round}
                      winLabel={t("common.win")}
                      lossLabel={t("common.loss")}
                      onPress={() => navigation.navigate("MatchDetail", { matchId: match.id })}
                    />
                  )
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  )
}
