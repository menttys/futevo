import React from "react"
import { Pressable, Text, View } from "react-native"

import Constants from "expo-constants"
import { useUnistyles } from "react-native-unistyles"

import { FutevoMark } from "@/components/FutevoMark"
import { signinWithGoogle } from "@/hooks/useFirebase"
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

  return (
    <View style={styles.root}>
      <FutevoMark size={420} rotate={14} style={styles.supergraphic} />

      <View style={styles.top}>
        <FutevoMark size={60} />
        <Text style={styles.wordmark}>{t("app.name")}</Text>
        <Text style={styles.tagline}>{t("auth.tagline")}</Text>
      </View>

      <View style={styles.bottom}>
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

        <View style={styles.footer}>
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
          <Text style={styles.version}>{t("auth.version", { version: VERSION })}</Text>
        </View>
      </View>
    </View>
  )
}
