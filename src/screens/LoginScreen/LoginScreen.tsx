import React from "react"
import { Pressable, Text, View } from "react-native"

import Constants from "expo-constants"
import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"
import { signinWithGoogle } from "@/hooks/useFirebase"
import { useSideTabBar } from "@/hooks/useSideTabBar"
import { useLanguage } from "@/i18n"
import type { LanguageCode } from "@/i18n/i18n"
import { ChevronRight, GoogleLogo } from "@/lib/icons"

import { styles } from "./LoginScreen.styles"

const VERSION = Constants.expoConfig?.version ?? "1.0"
const LOGIN_LANGUAGES: LanguageCode[] = ["en", "es", "pt"]

// Yellow is the brand, one outlined button is the action.
export const LoginScreen = () => {
  const { theme } = useUnistyles()
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()
  const wide = useSideTabBar()

  const googleButton = (
    <Pressable
      accessibilityRole="button"
      onPress={() => signinWithGoogle().catch(console.error)}
      style={({ pressed }) => styles.google(pressed)}
    >
      <View style={styles.googleDisc}>
        <GoogleLogo size={16} weight="bold" color={theme.colors.white} />
      </View>
      <Text style={styles.googleLabel}>{t("auth.continueWithGoogle")}</Text>
      <ChevronRight size={18} color={theme.colors.text} />
    </Pressable>
  )

  const languageSwitch = (
    <View style={styles.languages}>
      {LOGIN_LANGUAGES.map((code) => (
        <Pressable
          key={code}
          accessibilityRole="button"
          accessibilityLabel={languages[code].nativeName}
          accessibilityState={{ selected: code === currentLanguage }}
          onPress={() => changeLanguage(code)}
          style={styles.language(code === currentLanguage)}
        >
          <Text style={styles.languageLabel}>{code.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  )

  // Desktop web: brand on the left, the sign-in column on the right, inside the 1120px column.
  if (wide) {
    return (
      <View style={styles.root}>
        <View style={styles.wideGrid}>
          <View style={styles.wideBrand}>
            <FutevoMark size={80} />
            <Text style={styles.wideWordmark}>{t("app.name")}</Text>
            <Text style={styles.wideTagline}>{t("auth.tagline")}</Text>
            <View style={styles.wideLanguages}>{languageSwitch}</View>
          </View>
          <View style={styles.wideForm}>
            <Text style={styles.wideTitle}>{t("auth.signIn")}</Text>
            {googleButton}
            <Text style={styles.version}>{t("auth.version", { version: VERSION })}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <FutevoMark size={420} rotate={14} style={styles.supergraphic} />

      <View style={styles.top}>
        <FutevoMark size={60} />
        <Text style={styles.wordmark}>{t("app.name")}</Text>
        <Text style={styles.tagline}>{t("auth.tagline")}</Text>
      </View>

      <View style={styles.bottom}>
        {googleButton}

        <View style={styles.footer}>
          {languageSwitch}
          <Text style={styles.version}>{t("auth.version", { version: VERSION })}</Text>
        </View>
      </View>
    </View>
  )
}
