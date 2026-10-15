import React from "react"
import { Pressable, Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import { signinWithGoogle } from "@/hooks/useFirebase"

import { styles } from "./LoginScreen.styles"

export const LoginScreen = () => {
  const { theme } = useUnistyles()
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
        <Text style={styles.title}>Track every point</Text>
        <Text style={styles.subtitle}>Live score, court zones, and attack types — in one tap.</Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.googleButton, pressed && styles.googleButtonPressed]}
          onPress={() => signinWithGoogle().catch(console.error)}
        >
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  )
}
