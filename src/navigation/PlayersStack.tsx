import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { PlayersScreen } from "@/screens/PlayersScreen"
import { theme } from "@/styles/theme"
import { useLanguage } from "@/i18n"

import { PlayersRoutes } from "./routes"
import { PlayersStackParamList } from "./types/navigation"

const Stack = createStackNavigator<PlayersStackParamList>()

const HEADER_OPTS = {
  headerShown: !IS_WEB,
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTintColor: theme.colors.dark,
  headerTitleStyle: { color: theme.colors.dark },
  cardStyle: { backgroundColor: theme.colors.background },
} as const

export function PlayersStack() {
  const { t } = useLanguage()
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={PlayersRoutes.PLAYERS_HOME}
        component={PlayersScreen}
        options={{ title: t("screens.players") }}
      />
    </Stack.Navigator>
  )
}
