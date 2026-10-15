import React from "react"

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { LiveMatchScreen } from "@/screens/LiveMatchScreen"
import { MatchDetailScreen } from "@/screens/MatchDetailScreen"
import { MatchesScreen } from "@/screens/MatchesScreen"
import { NewMatchScreen } from "@/screens/NewMatchScreen"
import { PointEntryScreen } from "@/screens/PointEntryScreen"
import { TournamentDetailScreen } from "@/screens/TournamentDetailScreen"
import { theme } from "@/styles/theme"

import { MatchesRoutes } from "./routes"
import { MatchesStackParamList } from "./types/navigation"

const Stack = createStackNavigator<MatchesStackParamList>()

const HEADER_OPTS = {
  headerShown: !IS_WEB,
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTintColor: theme.colors.dark,
  headerTitleStyle: { color: theme.colors.dark },
  cardStyle: { backgroundColor: theme.colors.background },
} as const

export function MatchesStack() {
  return (
    <Stack.Navigator detachInactiveScreens={DETACH_INACTIVE_SCREENS} screenOptions={HEADER_OPTS}>
      <Stack.Screen
        name={MatchesRoutes.MATCHES_HOME}
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={MatchesRoutes.NEW_MATCH}
        component={NewMatchScreen}
        options={{ title: "New match" }}
      />
      <Stack.Screen
        name={MatchesRoutes.LIVE_MATCH}
        component={LiveMatchScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={MatchesRoutes.POINT_ENTRY}
        component={PointEntryScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name={MatchesRoutes.MATCH_DETAIL}
        component={MatchDetailScreen}
        options={{ title: "Match" }}
      />
      <Stack.Screen
        name={MatchesRoutes.TOURNAMENT_DETAIL}
        component={TournamentDetailScreen}
        options={{ title: "Tournament" }}
      />
    </Stack.Navigator>
  )
}
