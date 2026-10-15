import type { LinkingOptions } from "@react-navigation/native"

import { MatchesRoutes, PlayersRoutes, RootRoutes, SettingsRoutes, TabRoutes } from "./routes"
import type { RootStackParamList } from "./types/navigation"

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["futevo://"],
  config: {
    screens: {
      [RootRoutes.LOGIN]: "login",
      [RootRoutes.MAIN]: {
        path: "",
        screens: {
          [TabRoutes.DASHBOARD]: {
            path: "",
            screens: {
              [MatchesRoutes.MATCHES_HOME]: "",
              [MatchesRoutes.NEW_MATCH]: "new",
              [MatchesRoutes.LIVE_MATCH]: "live/:matchId",
              [MatchesRoutes.POINT_ENTRY]: "live/:matchId/point/:team",
              [MatchesRoutes.MATCH_DETAIL]: "match/:matchId",
              [MatchesRoutes.TOURNAMENT_DETAIL]: "tournament/:tournamentId",
            },
          },
          [TabRoutes.MATCHES]: "matches",
          [TabRoutes.PLAYERS]: {
            path: "players",
            screens: { [PlayersRoutes.PLAYERS_HOME]: "" },
          },
          [TabRoutes.SETTINGS]: {
            path: "settings",
            screens: { [SettingsRoutes.SETTINGS_HOME]: "" },
          },
        },
      },
    },
  },
}
