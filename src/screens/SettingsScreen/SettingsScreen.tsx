import React from "react"
import { ScrollView, Text, View } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useUnistyles } from "react-native-unistyles"

import { AppButton } from "@/components/AppButton"
import { FutevoMark } from "@/components/FutevoMark"
import { GradientFill } from "@/components/GradientFill"
import { MeshBackground } from "@/components/MeshBackground"
import { PlayerAvatar } from "@/components/PlayerAvatar"
import { ScreenHeader } from "@/components/ScreenHeader"
import { SegmentedControl } from "@/components/SegmentedControl"
import { WaterBackground } from "@/components/WaterBackground"
import { signout } from "@/hooks/useFirebase"
import { useNetworkState } from "@/hooks/useNetworkState"
import { useTabBarInset } from "@/hooks/useTabBarInset"
import { useLanguage } from "@/i18n"
import type { LanguageCode } from "@/i18n/i18n"
import { Check, LogOut, WifiSlash } from "@/lib/icons"
import { useUserStore } from "@/store/userState"

import { styles } from "./SettingsScreen.styles"

const LANGUAGE_ORDER: LanguageCode[] = ["en", "es", "pt"]
// Profile, language and sync status.
export function SettingsScreen() {
  const { theme } = useUnistyles()
  const { t, currentLanguage, changeLanguage, languages } = useLanguage()
  const user = useUserStore((s) => s.user)
  const { isOffline, hasPendingWrites } = useNetworkState()
  const insets = useSafeAreaInsets()
  const tabBarInset = useTabBarInset()

  const syncTitle = isOffline ? t("settings.syncOffline") : hasPendingWrites ? t("settings.syncing") : t("settings.synced")

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <MeshBackground />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: tabBarInset + 16 }]}>
        <ScreenHeader variant="large" title={t("screens.settings")} style={styles.title} />

        {user ? (
          <View style={styles.profile}>
            <GradientFill from={theme.colors.softYellow} to={theme.colors.butter} />
            <FutevoMark size={120} rotate={16} color={theme.colors.primary} style={styles.profileMark} />
            <PlayerAvatar
              name={user.displayName ?? t("settings.defaultYou")}
              photoUri={user.photoURL ?? undefined}
              size={56}
              tone="yellow"
            />
            <View style={styles.profileText}>
              <Text style={styles.name} numberOfLines={1}>
                {user.displayName ?? t("settings.defaultName")}
              </Text>
              {user.email ? (
                <Text style={styles.email} numberOfLines={1}>
                  {t("settings.signedInWith", { email: user.email })}
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}

        <View>
          <Text style={styles.label}>{t("settings.language")}</Text>
          <SegmentedControl
            options={LANGUAGE_ORDER.map((code) => ({ value: code, label: languages[code].nativeName }))}
            value={currentLanguage}
            onChange={changeLanguage}
          />
        </View>

        <View>
          <Text style={styles.label}>{t("settings.data")}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{syncTitle}</Text>
                <Text style={styles.rowSubtitle}>{t("settings.syncSubtitle")}</Text>
              </View>
              {isOffline ? (
                <WifiSlash size={20} color={theme.colors.text} />
              ) : (
                <Check size={20} color={theme.colors.text} />
              )}
            </View>
          </View>
        </View>

        <AppButton
          label={t("settings.signOut")}
          variant="outline"
          labelStyle="body"
          onPress={() => signout().catch(console.error)}
          icon={<LogOut size={18} color={theme.colors.text} />}
          style={styles.signOut}
        />

        <WaterBackground style={styles.water} />
      </ScrollView>
    </View>
  )
}
