import React from "react"
import { Text, View } from "react-native"

import { useLanguage } from "@/i18n"

import type { PointLogProps } from "./PointLog.d"
import { styles } from "./PointLog.styles"

export function PointLog({ points, teamA, teamB }: PointLogProps) {
  const { t } = useLanguage()

  return (
    <View style={styles.root}>
      {[...points].reverse().map((point, index) => {
        const teamPlayers = point.team === "A" ? teamA : teamB
        const scorer = point.ballOut
          ? undefined
          : teamPlayers.find((p) => p.id === point.scoringPlayerId)
        const attackLabel = point.attackType
          ? t(`attackTypes.${point.attackType}`)
          : point.ballOut
            ? undefined
            : t("match.defaultAttack")
        return (
          <View key={point.id} style={styles.row}>
            <View style={styles.dot(point.team)} />
            <Text style={styles.label}>
              {t("match.pointLogEntry", {
                number: points.length - index,
                side: point.team,
                where: point.ballOut ? t("match.ballOut") : t("match.zone", { zone: point.zone }),
              })}
              {attackLabel ? ` · ${attackLabel}` : ""}
              {scorer ? ` · ${scorer.name}` : ""}
            </Text>
            <Text style={styles.score}>
              {point.scoreAAfter}-{point.scoreBAfter}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
