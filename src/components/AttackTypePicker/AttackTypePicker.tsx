import React from "react"
import { Pressable, Text, View } from "react-native"

import { ATTACK_TYPES } from "@/@types/futevo"
import { useLanguage } from "@/i18n"

import type { AttackTypePickerProps } from "./AttackTypePicker.d"
import { styles } from "./AttackTypePicker.styles"

export function AttackTypePicker({ selected, onSelect }: AttackTypePickerProps) {
  const { t } = useLanguage()
  return (
    <View style={styles.grid}>
      {ATTACK_TYPES.map((attack) => {
        const isSelected = attack.id === selected
        return (
          <Pressable
            key={attack.id}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => styles.tile(isSelected, pressed)}
            onPress={() => onSelect(attack.id)}
          >
            <Text style={styles.label(isSelected)} numberOfLines={1}>
              {t(`attackTypes.${attack.id}`)}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
