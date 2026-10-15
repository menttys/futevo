import React from "react"
import { Pressable, Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import { signinWithGoogle } from "@/hooks/useFirebase"
import { useLanguage } from "@/i18n"

import { styles } from "./LoginScreen.styles"

export const LoginScreen = () => {
  const { theme } = useUnistyles()
  const { t } = useLanguage()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.lg,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.wordmark}>FUTEVO</Text>
        <Text style={styles.title}>{t("auth.title")}</Text>
        <Text style={styles.subtitle}>{t("auth.subtitle")}</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.googleButton, pressed && styles.googleButtonPressed]}
          onPress={() => signinWithGoogle().catch(console.error)}
        >
          <Text style={styles.googleButtonText}>{t("auth.continueWithGoogle")}</Text>
        </Pressable>
      </View>
    </View>
  )
}
