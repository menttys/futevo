import React, { useMemo } from "react"
import { Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { ATTACK_TYPES, Player, TeamSide } from "@/@types/futevo"
import { User } from "@/lib/icons"
import { computePlayerStats } from "@/utils/playerStats"
import { useLanguage } from "@/i18n"

import type { PlayerStatsListProps } from "./PlayerStatsList.d"
import { styles } from "./PlayerStatsList.styles"

export function PlayerStatsList({ points, teamA, teamB }: PlayerStatsListProps) {
  const { t } = useLanguage()
  const { theme } = useUnistyles()

  const stats = useMemo(() => {
    const byId = new Map(
      computePlayerStats(points, [...teamA, ...teamB].map((p) => p.id)).map((s) => [s.playerId, s])
    )
    return byId
  }, [points, teamA, teamB])

  const renderTeam = (side: TeamSide, players: Player[]) => (
    <View style={styles.team}>
      <Text style={styles.teamTitle}>{t("common.teamWithSide", { side })}</Text>
      {players.map((player, index) => {
        const s = stats.get(player.id)
        return (
          <View key={player.id} style={styles.card(side)}>
            <View style={styles.cardHeader}>
              <User size={18} color={theme.colors.text} />
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={styles.sideTag}>
                <Text style={styles.sideTagText}>
                  {index === 0 ? t("newMatch.left") : t("newMatch.right")}
                </Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>{t("match.stats.pointsScored")}</Text>
              <Text style={styles.statValue}>{s?.points ?? 0}</Text>
            </View>
            {ATTACK_TYPES.map((attack) => (
              <View key={attack.id} style={styles.statRow}>
                <Text style={styles.statLabel}>{t(`attackTypes.${attack.id}`)}</Text>
                <Text style={styles.statValue}>{s?.attacks[attack.id] ?? 0}</Text>
              </View>
            ))}
          </View>
        )
      })}
    </View>
  )

  return (
    <View style={styles.root}>
      {renderTeam("A", teamA)}
      {renderTeam("B", teamB)}
    </View>
  )
}
