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
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useLanguage } from "@/i18n"

import { styles } from "./SplashScreen.styles"

// The mark is the star; its 72° turn (five-fold symmetry, so 0° and 72° match) is the loader.
const TURN = 72
const DOTS = [1, 0.5, 0.25]

export function SplashScreen() {
  const { t } = useLanguage()
  const turn = useSharedValue(0)
  // Desktop web: a larger lockup with the dots right under the tagline.
  const wide = useSideTabBar()

  useEffect(() => {
    turn.value = withRepeat(
      withTiming(TURN, { duration: 900, easing: Easing.inOut(Easing.cubic) }),
      -1,
      false
    )
  }, [turn])

  const spin = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.value}deg` }] }))

  return (
    <View style={styles.root}>
      <View style={styles.center} accessibilityRole="progressbar">
        <Animated.View style={spin}>
          <FutevoMark size={wide ? 128 : 92} />
        </Animated.View>
        <Text style={[styles.wordmark, wide && styles.wordmarkWide]}>{t("app.name")}</Text>
        <Text style={[styles.tagline, wide && styles.taglineWide]}>{t("splash.tagline")}</Text>
        {wide ? (
          <View style={[styles.dots, styles.dotsWide]}>
            {DOTS.map((opacity) => (
              <View key={opacity} style={styles.dot(opacity)} />
            ))}
          </View>
        ) : null}
      </View>
      {wide ? null : (
        <View style={styles.dots}>
          {DOTS.map((opacity) => (
            <View key={opacity} style={styles.dot(opacity)} />
          ))}
        </View>
      )}
    </View>
  )
}
