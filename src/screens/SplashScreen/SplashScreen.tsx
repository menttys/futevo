import React from "react"
import { Text, View } from "react-native"

import { styles } from "./SplashScreen.styles"

export function SplashScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.wordmark}>FUTEVO</Text>
      <Text style={styles.tagline}>Score. Track. Replay.</Text>
    </View>
  )
}
