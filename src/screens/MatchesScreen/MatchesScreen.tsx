import React, { useCallback, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import type { Match } from "@/@types/futevo"
import { EmptyState } from "@/components/EmptyState"
import { House } from "@/lib/icons"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"

import { styles } from "./MatchesScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "MatchesHome">

const EMPTY_MATCHES: Match[] = []

export function MatchesScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp>()
  const matches = useMatchStore((s) => s.matches) ?? EMPTY_MATCHES
  const players = usePlayerStore((s) => s.players)

  const playerName = useCallback(
    (id: string) => players?.find((p) => p.id === id)?.name ?? "?",
    [players]
  )

  const activeMatch = matches.find((m) => m.status === "in_progress")
  const completedMatches = useMemo(
    () =>
      matches
        .filter((m) => m.status === "completed")
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [matches]
  )

  const renderItem = useCallback(
    ({ item }: { item: Match }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("MatchDetail", { matchId: item.id })}
      >
        <Text style={styles.cardTeams} numberOfLines={1}>
          {playerName(item.teamA[0])} & {playerName(item.teamA[1])} vs {playerName(item.teamB[0])} &{" "}
          {playerName(item.teamB[1])}
        </Text>
        <Text style={styles.cardScore}>
          {item.scoreA} — {item.scoreB}
        </Text>
        <Text style={styles.cardDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </TouchableOpacity>
    ),
    [navigation, playerName]
  )

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Futevo</Text>
      </View>

      {activeMatch ? (
        <TouchableOpacity
          style={styles.activeBanner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("LiveMatch", { matchId: activeMatch.id })}
        >
          <View>
            <Text style={styles.activeBannerText}>Match in progress</Text>
            <Text style={styles.activeBannerSub}>
              {activeMatch.scoreA} — {activeMatch.scoreB} · tap to resume
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      <FlashList
        data={completedMatches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <EmptyState
            icon={House}
            title="No matches yet"
            subtitle="Start a new match to begin tracking scores and court zones."
          />
        }
      />
    </View>
  )
}
