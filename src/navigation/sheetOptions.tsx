import React from "react"
import { Easing } from "react-native"

import { CardStyleInterpolators, type StackNavigationOptions } from "@react-navigation/stack"

import { Scrim } from "@/components/Scrim"

// Options for a bottom sheet pushed over the screen below. The scrim is the navigator's
// card overlay, so it fades on its own while only the sheet slides up. Quicker than the
// stack's default spring so the sheet opens without a lag.
export const SHEET_OPTIONS: StackNavigationOptions = {
  headerShown: false,
  presentation: "transparentModal",
  cardStyle: { backgroundColor: "transparent" },
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  cardOverlayEnabled: true,
  cardOverlay: ({ style }) => <Scrim style={style} />,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 450, easing: Easing.out(Easing.cubic) } },
    close: { animation: "timing", config: { duration: 180, easing: Easing.in(Easing.cubic) } },
  },
}
