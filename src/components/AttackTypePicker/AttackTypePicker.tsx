import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { ATTACK_TYPES } from "@/@types/futevo"

import type { AttackTypePickerProps } from "./AttackTypePicker.d"
import { styles } from "./AttackTypePicker.styles"

export function AttackTypePicker({ selected, onSelect }: AttackTypePickerProps) {
  return (
    <View style={styles.row}>
      {ATTACK_TYPES.map((attack) => {
        const isSelected = attack.id === selected
        return (
          <TouchableOpacity
            key={attack.id}
            style={styles.chip(isSelected)}
            onPress={() => onSelect(attack.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.chipLabel(isSelected)}>{attack.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
