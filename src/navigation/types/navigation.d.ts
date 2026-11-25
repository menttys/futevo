import { NavigatorScreenParams } from "@react-navigation/native"

import type { TeamSide } from "@/@types/futevo"

export type MatchesStackParamList = {
  NewMatch: undefined
  LiveMatch: { matchId: string }
  MatchStatus: { matchId: string }
  PointEntry: { matchId: string; team: TeamSide }
  PlayerPicker: { side: TeamSide; index: number }
  GamifiedMatch: { matchId: string }
  MatchDetail: { matchId: string; from?: "Matches" | "Dashboard" }
  TournamentDetail: { tournamentId: string }
}

export type PlayersStackParamList = {
  PlayersHome: undefined
  PlayerProfile: { playerId: string }
  AddPlayer: undefined
}

export type SettingsStackParamList = {
  SettingsHome: undefined
}

export type TabParamList = {
  MatchFlow: NavigatorScreenParams<MatchesStackParamList>
  Matches: undefined
  Dashboard: undefined
  Players: NavigatorScreenParams<PlayersStackParamList>
  Settings: NavigatorScreenParams<SettingsStackParamList>
}

export type RootStackParamList = {
  Login: undefined
  Terms: undefined
  Privacy: undefined
  Main: NavigatorScreenParams<TabParamList>
}
