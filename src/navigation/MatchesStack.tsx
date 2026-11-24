import React from "react"

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { useLanguage } from "@/i18n"
import { GamifiedMatchScreen } from "@/screens/GamifiedMatchScreen"
import { LiveMatchScreen } from "@/screens/LiveMatchScreen"
import { MatchDetailScreen } from "@/screens/MatchDetailScreen"
import { MatchStatusScreen } from "@/screens/MatchStatusScreen"
import { NewMatchScreen } from "@/screens/NewMatchScreen"
import { PlayerPickerScreen } from "@/screens/PlayerPickerScreen"
import { PointEntryScreen } from "@/screens/PointEntryScreen"
import { TournamentDetailScreen } from "@/screens/TournamentDetailScreen"
import { theme } from "@/styles/theme"

import { MatchesRoutes } from "./routes"
import { SHEET_OPTIONS } from "./sheetOptions"
import { MatchesStackParamList } from "./types/navigation"

const Stack = createStackNavigator<MatchesStackParamList>()

// Every screen draws its own design header (back button + Unbounded title).
const HEADER_OPTS = {
  headerShown: false,
  // "float" stops the stack from letting the page body scroll (hidden on web), which froze ScrollViews.
  headerMode: IS_WEB ? ("float" as const) : undefined,
  cardStyle: { backgroundColor: theme.colors.background },
}

export function MatchesStack() {
  const { t } = useLanguage()
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={MatchesRoutes.NEW_MATCH}
        component={NewMatchScreen}
        options={{ title: t("screens.newMatch") }}
      />
      <Stack.Screen
        name={MatchesRoutes.LIVE_MATCH}
        component={LiveMatchScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={MatchesRoutes.MATCH_STATUS}
        component={MatchStatusScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MatchesRoutes.POINT_ENTRY}
        component={PointEntryScreen}
        options={{
          ...SHEET_OPTIONS,
          // A sheet over the live score: the screen below stays visible behind the scrim.
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={MatchesRoutes.PLAYER_PICKER}
        component={PlayerPickerScreen}
        // A sheet over the New match form.
        options={SHEET_OPTIONS}
      />
      <Stack.Screen
        name={MatchesRoutes.GAMIFIED_MATCH}
        component={GamifiedMatchScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={MatchesRoutes.MATCH_DETAIL}
        component={MatchDetailScreen}
        options={{ title: t("screens.match") }}
      />
      <Stack.Screen
        name={MatchesRoutes.TOURNAMENT_DETAIL}
        component={TournamentDetailScreen}
        options={{ title: t("screens.tournament") }}
      />
    </Stack.Navigator>
  )
}
