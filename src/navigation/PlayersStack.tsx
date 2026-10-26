import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { AddPlayerScreen } from "@/screens/AddPlayerScreen"
import { PlayerProfileScreen } from "@/screens/PlayerProfileScreen"
import { PlayersScreen } from "@/screens/PlayersScreen"
import { theme } from "@/styles/theme"

import { PlayersRoutes } from "./routes"
import { PlayersStackParamList } from "./types/navigation"

const Stack = createStackNavigator<PlayersStackParamList>()

const HEADER_OPTS = ({ route }: { route: { name: string } }) => {
  const isRoot = route.name === PlayersRoutes.PLAYERS_HOME
  return {
    // The players list is the root: no header at all, the search bar sits at the top.
    headerShown: !isRoot,
    headerLeft: isRoot ? () => null : undefined,
    headerStyle: IS_WEB
      ? { backgroundColor: theme.colors.background, borderBottomWidth: 0, shadowOpacity: 0 }
      : { backgroundColor: theme.colors.primary },
    headerTitle: IS_WEB ? "" : undefined,
    headerTintColor: theme.colors.dark,
    headerTitleStyle: { color: theme.colors.dark },
    cardStyle: { backgroundColor: theme.colors.background },
  }
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
          presentation: "modal",
          headerShown: true,
          headerTitle: t("screens.addPlayer"),
        }}
      />
    </Stack.Navigator>
  )
}
