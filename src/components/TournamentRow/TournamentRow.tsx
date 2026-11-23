import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { ChevronRight, Trophy } from "@/lib/icons"

import type { TournamentRowProps } from "./TournamentRow.d"
import { styles } from "./TournamentRow.styles"

export function TournamentRow({ name, subtitle, variant = "butter", onPress }: TournamentRowProps) {
  const { theme } = useUnistyles()
  const yellow = variant === "yellow"

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => styles.row(yellow, pressed)}>
      {yellow ? (
        <View style={styles.disc}>
          <Trophy size={22} color={theme.colors.text} />
        </View>
      ) : (
        <Trophy size={22} color={theme.colors.text} />
      )}
      <View style={styles.text}>
        <Text style={styles.name(yellow)} numberOfLines={1}>
          {name}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle(yellow)} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <ChevronRight size={18} color={theme.colors.text} />
    </Pressable>
  )
}
