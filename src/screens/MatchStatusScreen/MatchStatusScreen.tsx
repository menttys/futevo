import React, { useEffect, useMemo } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import type { TeamSide } from "@/@types/futevo"
import { ATTACK_TYPES } from "@/@types/futevo"
import { AttackBars } from "@/components/AttackBars"
import { MeshBackground } from "@/components/MeshBackground"
import { MomentumChart } from "@/components/MomentumChart"
import { ScoreBoard } from "@/components/ScoreBoard"
import { ScreenHeader } from "@/components/ScreenHeader"
import { ZoneHeatGrid } from "@/components/ZoneHeatGrid"
import { useLanguage } from "@/i18n"
import { MatchesStackParamList } from "@/navigation/types"
import { useMatchStore } from "@/store/matchState"
import { usePlayerStore } from "@/store/playerState"
import { useTournamentStore } from "@/store/tournamentState"
import { sideLabel } from "@/utils/matchLabels"
import { attackTally } from "@/utils/matchStatus"

import { styles } from "./MatchStatusScreen.styles"

type NavigationProp = StackNavigationProp<MatchesStackParamList, "MatchStatus">
type MatchStatusRouteProp = RouteProp<MatchesStackParamList, "MatchStatus">

// The live match's full status — same summary as a finished match — with the Point buttons
// kept at the bottom so scoring never needs a trip back.
export function MatchStatusScreen() {
  const { t } = useLanguage()
  const navigation = useNavigation<NavigationProp>()
  const { matchId } = useRoute<MatchStatusRouteProp>().params
  const players = usePlayerStore((s) => s.players)
  const match = useMatchStore((s) => s.matches?.find((m) => m.id === matchId))
  const tournament = useTournamentStore((s) => s.tournaments?.find((tr) => tr.id === match?.tournamentId))

  useEffect(() => {
    if (match?.status === "completed") {
      navigation.replace("MatchDetail", { matchId })
    }
  }, [match?.status, matchId, navigation])

  const tally = useMemo(() => {
    const counts = attackTally(match?.points ?? [])
    return ATTACK_TYPES.map((attack) => ({
      label: t(`attackTypes.${attack.id}`),
      count: counts.get(attack.id) ?? 0,
    }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [match?.points, t])

  if (!match) return null

  const playerName = (id: string) => players?.find((p) => p.id === id)?.name ?? t("common.unknownPlayer")
  const homeName = sideLabel(match, tournament, "A", playerName)
  const awayName = sideLabel(match, tournament, "B", playerName)
  const scorePoint = (team: TeamSide) => navigation.navigate("PointEntry", { matchId: match.id, team })

  return (
    <View style={styles.root}>
      <MeshBackground />
      <ScreenHeader
        title={t("match.status")}
        onBack={() => navigation.goBack()}
        backLabel={t("common.back")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <ScoreBoard
          homeName={homeName}
          awayName={awayName}
          scoreA={match.scoreA}
          scoreB={match.scoreB}
          leftNote={t("match.pointsPlayed", { count: match.points.length })}
          rightNote={t("match.firstTo", { target: match.targetScore, winBy: match.winBy })}
        />

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
            {tally.length > 0 ? <AttackBars items={tally} /> : <Text style={styles.empty}>{t("match.noPoints")}</Text>}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {(["A", "B"] as const).map((side) => (
          <Pressable
            key={side}
            accessibilityRole="button"
            onPress={() => scorePoint(side)}
            style={({ pressed }) => styles.pointButton(side === "B", pressed)}
          >
            <Text style={side === "A" ? styles.hintOnDark : styles.hint}>{t("match.tapToScore")}</Text>
            <Text style={side === "A" ? styles.labelOnDark : styles.label} numberOfLines={1}>
              {t("match.pointFor", { team: side === "A" ? homeName : awayName })}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}
