import React from "react"
import { Pressable, Text, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"
import { LivePill } from "@/components/LivePill"
import { ChevronRight } from "@/lib/icons"

import type { LiveMatchCardProps } from "./LiveMatchCard.d"
import { styles } from "./LiveMatchCard.styles"

export function LiveMatchCard({
  homeName,
  awayName,
  scoreA,
  scoreB,
  liveLabel,
  variant = "full",
  meta,
  actionLabel,
  homeDetail,
  awayDetail,
  onPress,
}: LiveMatchCardProps) {
  const { theme } = useUnistyles()
  const compact = variant === "compact"

  if (variant === "bar") {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.bar}>
        <FutevoMark size={150} rotate={20} color={theme.colors.dark} style={styles.barWatermark} />
        <View>
          <LivePill label={liveLabel} />
        </View>
        <Text style={styles.barName(false)} numberOfLines={1}>
          {homeName}
        </Text>
        <Text style={styles.barVs}>vs</Text>
        <Text style={styles.barName(true)} numberOfLines={1}>
          {awayName}
        </Text>
        {meta ? (
          <Text style={styles.barMeta} numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
        <View style={styles.barSpacer} />
        <Text style={styles.barScore}>
          {scoreA}
          <Text style={styles.compactScoreAway}>{`–${scoreB}`}</Text>
        </Text>
        <ChevronRight size={18} color={theme.colors.text} />
      </Pressable>
    )
  }

  if (variant === "wide") {
    return (
      <View style={styles.wideCard}>
        <FutevoMark size={300} rotate={14} color={theme.colors.dark} style={styles.wideWatermark} />
        <View style={styles.metaRow}>
          <LivePill label={liveLabel} />
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
        <View style={styles.wideSides}>
          <View style={styles.wideSide}>
            <Text style={styles.wideName(false)} numberOfLines={1}>
              {homeName}
            </Text>
            {homeDetail ? <Text style={styles.wideDetail}>{homeDetail}</Text> : null}
            <Text style={styles.wideScore(false)}>{scoreA}</Text>
          </View>
          <View style={[styles.wideSide, styles.sideRight]}>
            <Text style={styles.wideName(true)} numberOfLines={1}>
              {awayName}
            </Text>
            {awayDetail ? <Text style={styles.wideDetail}>{awayDetail}</Text> : null}
            <Text style={styles.wideScore(true)}>{scoreB}</Text>
          </View>
        </View>
        {actionLabel ? (
          <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [styles.action(pressed), styles.wideAction]}
          >
            <Text style={styles.wideActionLabel}>{actionLabel}</Text>
            <ChevronRight size={16} color={theme.colors.text} />
          </Pressable>
        ) : null}
      </View>
    )
  }

  if (compact) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} style={styles.card(true)}>
        <FutevoMark size={110} rotate={20} color={theme.colors.dark} style={styles.watermark(true)} />
        <View style={styles.compactRow}>
          <View style={styles.compactNames}>
            <LivePill label={liveLabel} />
            <Text style={styles.compactName(false)} numberOfLines={1}>
              {homeName}
            </Text>
            <Text style={styles.compactName(true)} numberOfLines={1}>
              {awayName}
            </Text>
          </View>
          <Text style={styles.compactScore}>
            {scoreA}
            <Text style={styles.compactScoreAway}>{`–${scoreB}`}</Text>
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.card(false)}>
      <FutevoMark size={170} rotate={14} color={theme.colors.dark} style={styles.watermark(false)} />
      <View style={styles.metaRow}>
        <LivePill label={liveLabel} />
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      <View style={styles.sides}>
        <View>
          <Text style={styles.name(false)} numberOfLines={1}>
            {homeName}
          </Text>
          <Text style={styles.bigScore(false)}>{scoreA}</Text>
        </View>
        <View style={styles.sideRight}>
          <Text style={styles.name(true)} numberOfLines={1}>
            {awayName}
          </Text>
          <Text style={styles.bigScore(true)}>{scoreB}</Text>
        </View>
      </View>
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={({ pressed }) => styles.action(pressed)}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
          <ChevronRight size={18} color={theme.colors.text} />
        </Pressable>
      ) : null}
    </View>
  )
}
