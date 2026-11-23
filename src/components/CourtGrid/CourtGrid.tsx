import React from "react"
import { Pressable, Text, View } from "react-native"

import type { CourtZone } from "@/@types/futevo"
import { FutevoMark } from "@/components/FutevoMark"
import { useLanguage } from "@/i18n"

import type { CourtGridProps } from "./CourtGrid.d"
import { styles } from "./CourtGrid.styles"

const ROWS: CourtZone[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// The opponent's half, net at the top; the selected zone gets the mark.
export function CourtGrid({ side, selectedZone, onSelectZone, style }: CourtGridProps) {
  const { t } = useLanguage()

  return (
    <View style={[styles.grid, style]}>
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((zone) => {
            const selected = zone === selectedZone
            return (
              <Pressable
                key={zone}
                style={({ pressed }) => styles.cell(selected, pressed)}
                onPress={() => onSelectZone(zone)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={t("court.zoneLabel", { side, zone })}
              >
                {selected ? <FutevoMark size={34} rotate={18} /> : <Text style={styles.number}>{zone}</Text>}
              </Pressable>
            )
          })}
        </View>
      ))}
    </View>
  )
}
