import React, { useMemo, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { ATTACK_TYPES, AttackTypeId, TeamSide } from "@/@types/futevo"
import { COURT_ZONES, computeHeatMap } from "@/utils/heatMap"

import type { CourtHeatMapProps } from "./CourtHeatMap.d"
import { styles } from "./CourtHeatMap.styles"

const ROWS = [COURT_ZONES.slice(0, 3), COURT_ZONES.slice(3, 6), COURT_ZONES.slice(6, 9)]

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
  const [playerId, setPlayerId] = useState<string>()
  const [attackType, setAttackType] = useState<AttackTypeId>()

  const data = useMemo(
    () => computeHeatMap(points, { playerId, attackType }),
    [points, playerId, attackType]
  )

  const renderHalf = (side: TeamSide) =>
    ROWS.map((row, rowIndex) => (
      <View key={`${side}-${rowIndex}`} style={styles.row}>
        {row.map((zone) => {
          const count = data.halves[side][zone]
          return (
            <View key={zone} style={styles.cell}>
              {count > 0 ? (
                <View style={styles.heat(0.2 + 0.8 * (count / data.max))} pointerEvents="none" />
              ) : null}
              <Text style={styles.count}>{count > 0 ? count : ""}</Text>
            </View>
          )
        })}
      </View>
    ))

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Court heat map</Text>

      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Player</Text>
        <View style={styles.chipRow}>
          <Chip label="All" selected={!playerId} onPress={() => setPlayerId(undefined)} />
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
        <Text style={styles.filterLabel}>Point type</Text>
        <View style={styles.chipRow}>
          <Chip label="All" selected={!attackType} onPress={() => setAttackType(undefined)} />
          {ATTACK_TYPES.map((attack) => (
            <Chip
              key={attack.id}
              label={attack.label}
              selected={attackType === attack.id}
              onPress={() => setAttackType(attack.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.courtWrap}>
        <View style={styles.court}>
          {renderHalf("B")}
          <View style={styles.net} pointerEvents="none" />
          {renderHalf("A")}
        </View>
      </View>

      <Text style={styles.summary}>
        {data.total} {data.total === 1 ? "point" : "points"} on court
        {data.ballOut > 0 ? ` · ${data.ballOut} ball out` : ""}
      </Text>
    </View>
  )
}
