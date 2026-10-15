import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { useUnistyles } from "react-native-unistyles"

import { PlayerAvatar } from "@/components/PlayerAvatar"
import { signout } from "@/hooks/useFirebase"
import { useLanguage } from "@/i18n"
import { LogOut } from "@/lib/icons"
import { useUserStore } from "@/store/userState"

import { styles } from "./SettingsScreen.styles"

export function SettingsScreen() {
  const { theme } = useUnistyles()
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()
  const user = useUserStore((s) => s.user)

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.card}>
          {user ? (
            <View style={styles.profileRow}>
              <PlayerAvatar name={user.displayName ?? t("settings.defaultYou")} size={56} />
              <View>
                <Text style={styles.name}>{user.displayName ?? t("settings.defaultName")}</Text>
                {user.email ? <Text style={styles.email}>{user.email}</Text> : null}
              </View>
            </View>
          ) : null}

          <View>
            <Text style={styles.sectionLabel}>{t("settings.language")}</Text>
            <View style={styles.languageRow}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageChip(language.code === currentLanguage)}
                  onPress={() => changeLanguage(language.code)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityState={{ selected: language.code === currentLanguage }}
                >
                  <Text style={styles.languageLabel(language.code === currentLanguage)}>
                    {language.nativeName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => signout().catch(console.error)}
            activeOpacity={0.85}
          >
            <LogOut size={18} color={theme.colors.danger} />
            <Text style={styles.signOutLabel}>{t("settings.signOut")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
