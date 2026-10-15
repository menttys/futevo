import React from "react"
import { Text, View } from "react-native"

import { styles } from "./SplashScreen.styles"

import { useLanguage } from "@/i18n"

export function SplashScreen() {
  const { t } = useLanguage()
  return (
    <View style={styles.root}>
      <Text style={styles.wordmark}>FUTEVO</Text>
      <Text style={styles.tagline}>{t("splash.tagline")}</Text>
    </View>
  )
}
