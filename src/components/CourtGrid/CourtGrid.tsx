import React from "react"
import { Pressable, Text, View } from "react-native"

import type { CourtZone } from "@/@types/futevo"
import { HEAT_EMPTY_COLOR, heatGradient } from "@/utils/heatMap"
import { useLanguage } from "@/i18n"

import type { CourtGridProps } from "./CourtGrid.d"
import { styles } from "./CourtGrid.styles"

const ROWS: CourtZone[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const NET_BANDS = heatGradient(32)

export function CourtGrid({ side, selectedZone, onSelectZone, style }: CourtGridProps) {
  const { t } = useLanguage()
  // Team B is drawn above the net and Team A below it, so the net sits on
  // the bottom edge of B's half and the top edge of A's half.
  const net = (
    <View style={styles.net} pointerEvents="none">
      {NET_BANDS.map((color, index) => (
        <View key={index} style={styles.netBand(color)} />
      ))}
      <Text style={styles.netLabel}>{t("court.net")}</Text>
    </View>
  )

  return (
    <View style={style}>
      {side === "A" ? net : null}
      <Text style={styles.sideLabel(side)}>{t("common.teamWithSide", { side })}</Text>
      <View style={styles.court}>
        {ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((zone) => (
              <Pressable
                key={zone}
                style={styles.cell(zone === selectedZone, HEAT_EMPTY_COLOR)}
                onPress={() => onSelectZone(zone)}
                accessibilityRole="button"
                accessibilityLabel={t("court.zoneLabel", { side, zone })}
              />
            ))}
          </View>
        ))}
      </View>
      {side === "B" ? net : null}
    </View>
  )
}
