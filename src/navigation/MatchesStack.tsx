import React from "react"

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"

import { DETACH_INACTIVE_SCREENS, IS_WEB } from "@/constants/Platform"
import { GamifiedMatchScreen } from "@/screens/GamifiedMatchScreen"
import { LiveMatchScreen } from "@/screens/LiveMatchScreen"
import { MatchDetailScreen } from "@/screens/MatchDetailScreen"
import { NewMatchScreen } from "@/screens/NewMatchScreen"
import { PointEntryScreen } from "@/screens/PointEntryScreen"
import { TournamentDetailScreen } from "@/screens/TournamentDetailScreen"
import { theme } from "@/styles/theme"
import { useLanguage } from "@/i18n"

import { MatchesRoutes } from "./routes"
import { MatchesStackParamList } from "./types/navigation"

const Stack = createStackNavigator<MatchesStackParamList>()

const HEADER_OPTS = ({ navigation }: { navigation: { canGoBack: () => boolean } }) => ({
  // On web the root screen has no header; nested screens get one with a back button.
  headerShown: !IS_WEB || navigation.canGoBack(),
  // On web the header is just a bare back arrow: no title, no yellow bar.
  headerStyle: IS_WEB
    ? { backgroundColor: theme.colors.background, borderBottomWidth: 0, shadowOpacity: 0 }
    : { backgroundColor: theme.colors.primary },
  headerTitle: IS_WEB ? "" : undefined,
  headerTintColor: theme.colors.dark,
  headerTitleStyle: { color: theme.colors.dark },
  cardStyle: { backgroundColor: theme.colors.background },
})

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
        name={MatchesRoutes.POINT_ENTRY}
        component={PointEntryScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
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
        options={{
          title: "",
          headerShown: true,
          headerTransparent: false,
          headerStyle: { backgroundColor: theme.colors.background, borderBottomWidth: 0, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name={MatchesRoutes.TOURNAMENT_DETAIL}
        component={TournamentDetailScreen}
        options={{ title: t("screens.tournament") }}
      />
    </Stack.Navigator>
  )
}
