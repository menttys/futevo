import React from "react"

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { AddPlayerScreen } from "@/screens/AddPlayerScreen"
import { PlayerProfileScreen } from "@/screens/PlayerProfileScreen"
import { PlayersScreen } from "@/screens/PlayersScreen"
import { theme } from "@/styles/theme"

import { PlayersRoutes } from "./routes"
import { PlayersStackParamList } from "./types/navigation"

const Stack = createStackNavigator<PlayersStackParamList>()

// Every screen draws its own design header (back button + Unbounded title).
const HEADER_OPTS = {
  headerShown: false,
  // "float" stops the stack from letting the page body scroll (hidden on web), which froze ScrollViews.
  headerMode: IS_WEB ? ("float" as const) : undefined,
  cardStyle: { backgroundColor: theme.colors.background },
}

export function PlayersStack() {
  const { t } = useLanguage()
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={PlayersRoutes.PLAYERS_HOME}
        component={PlayersScreen}
        options={{ title: t("screens.players") }}
      />
      <Stack.Screen
        name={PlayersRoutes.PLAYER_PROFILE}
        component={PlayerProfileScreen}
        options={{ title: t("screens.playerProfile") }}
      />
      <Stack.Screen
        name={PlayersRoutes.ADD_PLAYER}
        component={AddPlayerScreen}
        options={{
          title: t("screens.addPlayer"),
          // A short sheet over the players list.
          presentation: "transparentModal",
          cardStyle: { backgroundColor: "transparent" },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  )
}
