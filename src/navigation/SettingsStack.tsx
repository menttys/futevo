import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { theme } from "@/styles/theme"
import { useLanguage } from "@/i18n"

import { SettingsRoutes } from "./routes"
import { SettingsStackParamList } from "./types/navigation"

const Stack = createStackNavigator<SettingsStackParamList>()

const HEADER_OPTS = ({ navigation }: { navigation: { canGoBack: () => boolean } }) => ({
  // On web the root screen has no header; nested screens get one with a back button.
  headerShown: !IS_WEB || navigation.canGoBack(),
  headerStyle: IS_WEB
    ? { backgroundColor: theme.colors.background, borderBottomWidth: 0, shadowOpacity: 0 }
    : { backgroundColor: theme.colors.primary },
  headerTitle: IS_WEB ? "" : undefined,
  headerTintColor: theme.colors.dark,
  headerTitleStyle: { color: theme.colors.dark },
  cardStyle: { backgroundColor: theme.colors.background },
})

export function SettingsStack() {
  const { t } = useLanguage()
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={SettingsRoutes.SETTINGS_HOME}
        component={SettingsScreen}
        options={{ title: t("screens.settings") }}
      />
    </Stack.Navigator>
  )
}
