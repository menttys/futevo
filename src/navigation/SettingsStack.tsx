import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { theme } from "@/styles/theme"

import { SettingsRoutes } from "./routes"
import { SettingsStackParamList } from "./types/navigation"

const Stack = createStackNavigator<SettingsStackParamList>()

const HEADER_OPTS = {
  headerShown: !IS_WEB,
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTintColor: theme.colors.dark,
  headerTitleStyle: { color: theme.colors.dark },
  cardStyle: { backgroundColor: theme.colors.background },
} as const

export function SettingsStack() {
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={SettingsRoutes.SETTINGS_HOME}
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  )
}
