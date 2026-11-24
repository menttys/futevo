import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { MomentumChart } from "@/components/MomentumChart"
import { StatTile } from "@/components/StatTile"
import { useLanguage } from "@/i18n"
import { ChevronRight } from "@/lib/icons"
import { biggestLead, currentStreak, topAttack } from "@/utils/matchStatus"

import type { MatchStatusCardProps } from "./MatchStatusCard.d"
import { styles } from "./MatchStatusCard.styles"

// Quick read of how the match is going; tapping opens the full status screen.
export function MatchStatusCard({ match, homeName, awayName, onPress }: MatchStatusCardProps) {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const streak = currentStreak(match.points)
  const attack = topAttack(match.points)
  const streakTeam = streak ? (streak.team === "A" ? homeName : awayName) : undefined

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("match.fullStats")}
      onPress={onPress}
      style={({ pressed }) => styles.card(pressed)}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{t("match.status")}</Text>
        <View style={styles.more}>
          <Text style={styles.moreLabel}>{t("match.fullStats")}</Text>
          <ChevronRight size={14} color={theme.colors.textMuted} />
        </View>
      </View>

      {match.points.length > 0 ? (
        <>
          <View style={styles.tiles}>
            <StatTile value={streak ? String(streak.count) : "–"} label={t("match.streak")} style={styles.tile} />
            <StatTile value={String(biggestLead(match.points))} label={t("match.biggestLead")} style={styles.tile} />
            <StatTile value={attack ? t(`attackTypes.${attack}`) : "–"} label={t("match.topAttack")} style={styles.tile} />
          </View>
          {streakTeam ? (
            <Text style={styles.streakNote} numberOfLines={1}>
              {t("match.streakNote", { team: streakTeam })}
            </Text>
          ) : null}
          <MomentumChart points={match.points} height={44} />
        </>
      ) : (
        <Text style={styles.empty}>{t("match.noPoints")}</Text>
      )}
    </Pressable>
  )
}
