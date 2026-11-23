import type { Animated, StyleProp, ViewStyle } from "react-native"

export type ScrimProps = {
  // Animated opacity supplied by the navigator's card overlay.
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>
}
