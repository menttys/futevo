import React from "react"
import { Image, View } from "react-native"

import { styles } from "./SplashScreen.styles"

const LOGO = require("@/assets/images/splash.png")

export function SplashScreen() {
  return (
    <View style={styles.root}>
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />
    </View>
  )
}
