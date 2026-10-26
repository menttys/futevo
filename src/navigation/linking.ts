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
          [TabRoutes.MATCH_FLOW]: {
            path: "",
            screens: {
              [MatchesRoutes.NEW_MATCH]: "new",
              [MatchesRoutes.LIVE_MATCH]: "live/:matchId",
              [MatchesRoutes.POINT_ENTRY]: "live/:matchId/point/:team",
              [MatchesRoutes.GAMIFIED_MATCH]: "live/:matchId/court",
              [MatchesRoutes.MATCH_DETAIL]: "match/:matchId",
              [MatchesRoutes.TOURNAMENT_DETAIL]: "tournament/:tournamentId",
            },
          },
          [TabRoutes.MATCHES]: "matches",
          [TabRoutes.DASHBOARD]: "dashboard",
          [TabRoutes.PLAYERS]: {
            path: "players",
            screens: {
              [PlayersRoutes.PLAYERS_HOME]: "",
              [PlayersRoutes.ADD_PLAYER]: "new",
              [PlayersRoutes.PLAYER_PROFILE]: ":playerId",
            },
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
