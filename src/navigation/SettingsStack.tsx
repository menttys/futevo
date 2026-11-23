import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { theme } from "@/styles/theme"

import { SettingsRoutes } from "./routes"
import { SettingsStackParamList } from "./types/navigation"

const Stack = createStackNavigator<SettingsStackParamList>()

// Every screen draws its own design header (back button + Unbounded title).
const HEADER_OPTS = {
  headerShown: false,
  // "float" stops the stack from letting the page body scroll (hidden on web), which froze ScrollViews.
  headerMode: IS_WEB ? ("float" as const) : undefined,
  cardStyle: { backgroundColor: theme.colors.background },
}

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
