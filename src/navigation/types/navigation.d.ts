import { NavigatorScreenParams } from "@react-navigation/native"

import type { TeamSide } from "@/@types/futevo"

export type MatchesStackParamList = {
  MatchesHome: undefined
  NewMatch: undefined
  LiveMatch: { matchId: string }
  PointEntry: { matchId: string; team: TeamSide }
  MatchDetail: { matchId: string }
  TournamentDetail: { tournamentId: string }
}

export type PlayersStackParamList = {
  PlayersHome: undefined
}

export type SettingsStackParamList = {
  SettingsHome: undefined
}

export type TabParamList = {
  Matches: NavigatorScreenParams<MatchesStackParamList>
  Players: NavigatorScreenParams<PlayersStackParamList>
  Settings: NavigatorScreenParams<SettingsStackParamList>
}

export type RootStackParamList = {
  Login: undefined
  Main: NavigatorScreenParams<TabParamList>
}
