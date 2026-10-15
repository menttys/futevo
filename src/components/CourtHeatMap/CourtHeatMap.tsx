import React, { useMemo, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { ATTACK_TYPES, AttackTypeId, TeamSide } from "@/@types/futevo"
import {
  COURT_ZONES,
  HEAT_EMPTY_COLOR,
  HEAT_STOPS,
  computeHeatMap,
  heatColor,
} from "@/utils/heatMap"
import { useLanguage } from "@/i18n"

import type { CourtHeatMapProps } from "./CourtHeatMap.d"
import { styles } from "./CourtHeatMap.styles"

const ROWS = [COURT_ZONES.slice(0, 3), COURT_ZONES.slice(3, 6), COURT_ZONES.slice(6, 9)]
const LEGEND_KEYS = ["zero", "low", "medium", "high", "max"] as const
const LEGEND_COLORS = [HEAT_EMPTY_COLOR, ...HEAT_STOPS]
const NET_BANDS = Array.from({ length: 32 }, (_, i) => heatColor(i / 31))

type ChipProps = {
  label: string
  selected: boolean
  onPress: () => void
}

function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      style={styles.chip(selected)}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={styles.chipLabel(selected)}>{label}</Text>
    </TouchableOpacity>
  )
}

export function CourtHeatMap({ points, teamA, teamB }: CourtHeatMapProps) {
  const { t } = useLanguage()
  const [playerId, setPlayerId] = useState<string>()
  const [attackType, setAttackType] = useState<AttackTypeId>()

  const data = useMemo(
    () => computeHeatMap(points, { playerId, attackType }),
    [points, playerId, attackType]
  )

  const totals = useMemo(() => {
    const sum = (side: TeamSide) =>
      COURT_ZONES.reduce((acc, zone) => acc + data.halves[side][zone], 0)
    return { A: sum("A"), B: sum("B") }
  }, [data])

  const renderCourt = (side: TeamSide) => (
    <View style={styles.court}>
      {ROWS.map((row, rowIndex) => (
        <View key={`${side}-${rowIndex}`} style={styles.row}>
          {row.map((zone) => {
            const count = data.halves[side][zone]
            const color = count > 0 ? heatColor(count / data.max) : HEAT_EMPTY_COLOR
            return (
              <View key={zone} style={styles.cell(color)}>
                <Text style={styles.count(count > 0)}>{count}</Text>
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )

  const renderSide = (side: TeamSide, players: CourtHeatMapProps["teamA"]) => (
    <View style={styles.side}>
      <Text style={styles.sideTitle(side)} numberOfLines={1}>
        {players.map((p) => p.name).join(" & ") || t("common.teamWithSide", { side })}
      </Text>
      {renderCourt(side)}
      <Text style={styles.total}>{t("heatMap.total", { count: totals[side] })}</Text>
    </View>
  )

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>{t("heatMap.title")}</Text>
        <Text style={styles.subtitle}>{t("heatMap.subtitle")}</Text>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>{t("heatMap.player")}</Text>
        <View style={styles.chipRow}>
          <Chip label={t("common.all")} selected={!playerId} onPress={() => setPlayerId(undefined)} />
          {[...teamA, ...teamB].map((player) => (
            <Chip
              key={player.id}
              label={player.name}
              selected={playerId === player.id}
              onPress={() => setPlayerId(player.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>{t("heatMap.pointType")}</Text>
        <View style={styles.chipRow}>
          <Chip label={t("common.all")} selected={!attackType} onPress={() => setAttackType(undefined)} />
          {ATTACK_TYPES.map((attack) => (
            <Chip
              key={attack.id}
              label={t(`attackTypes.${attack.id}`)}
              selected={attackType === attack.id}
              onPress={() => setAttackType(attack.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.courts}>
        {renderSide("A", teamA)}
        <View style={styles.net}>
          {NET_BANDS.map((color, index) => (
            <View key={index} style={styles.netBand(color)} />
          ))}
          <Text style={styles.netLabel}>{t("court.net")}</Text>
        </View>
        {renderSide("B", teamB)}
      </View>

      {data.ballOut > 0 ? (
        <Text style={styles.summary}>{t("heatMap.ballOut", { count: data.ballOut })}</Text>
      ) : null}

      <View style={styles.legend}>
        {LEGEND_COLORS.map((color, index) => (
          <View key={LEGEND_KEYS[index]} style={styles.legendItem}>
            <View style={styles.legendSwatch(color)} />
            <Text style={styles.legendLabel}>{t(`heatMap.legend.${LEGEND_KEYS[index]}`)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
