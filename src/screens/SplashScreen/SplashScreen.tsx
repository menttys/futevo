import React, { useEffect } from "react"
import { Text, View } from "react-native"

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import { FutevoMark } from "@/components/FutevoMark"
import { useLanguage } from "@/i18n"

import { styles } from "./SplashScreen.styles"

// The mark is the star; its 72° turn (five-fold symmetry, so 0° and 72° match) is the loader.
const TURN = 72
const DOTS = [1, 0.5, 0.25]

export function SplashScreen() {
  const { t } = useLanguage()
  const turn = useSharedValue(0)

  useEffect(() => {
    turn.value = withRepeat(withTiming(TURN, { duration: 900, easing: Easing.inOut(Easing.cubic) }), -1, false)
  }, [turn])

  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.value}deg` }] }))

  return (
    <View style={styles.root}>
      <View style={styles.center} accessibilityRole="progressbar">
        <Animated.View style={spin}>
          <FutevoMark size={92} />
        </Animated.View>
        <Text style={styles.wordmark}>{t("app.name")}</Text>
        <Text style={styles.tagline}>{t("splash.tagline")}</Text>
      </View>
      <View style={styles.dots}>
        {DOTS.map((opacity) => (
          <View key={opacity} style={styles.dot(opacity)} />
        ))}
      </View>
    </View>
  )
}
