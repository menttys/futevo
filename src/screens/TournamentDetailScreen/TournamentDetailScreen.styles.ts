import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    gap: 12,
  },
  contentWide: {
    paddingHorizontal: 44,
    gap: 20,
  },
  nameWide: {
    fontSize: 32,
    lineHeight: 36,
  },
  tabsWide: {
    width: 360,
  },
  headerButton: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bannerWide: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 28,
  },
  bannerBodyWide: {
    flex: 1,
    paddingTop: 0,
  },
  leaderTile: {
    minWidth: 120,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.card,
  },
  leaderValue: {
    fontFamily: theme.fonts.display,
    fontSize: 20,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  leaderLabel: {
    marginTop: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  bodyWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 24,
  },
  mainWide: {
    flex: 1,
    minWidth: 0,
    gap: 10,
  },
  sideWide: {
    width: 340,
    gap: 18,
  },
  tableHeadWide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
  },
  standingWide: {
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  wRank: {
    width: 22,
  },
  wDupla: {
    flex: 1.2,
    paddingLeft: 0,
  },
  wClub: {
    flex: 1,
  },
  wNum: {
    width: 56,
    textAlign: "center",
  },
  wPts: {
    width: 40,
    textAlign: "right",
  },
  clubWide: {
    fontFamily: theme.fonts.regular,
    fontSize: 13.5,
    color: theme.colors.textMuted,
  },
  points: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 12.6,
    color: theme.colors.text,
  },
  banner: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    overflow: "hidden",
  },
  bannerMark: {
    position: "absolute",
    right: -96,
    top: -84,
  },
  bannerBody: {
    paddingTop: 56,
    alignItems: "flex-start",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.onYellow,
  },
  pillLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  name: {
    marginTop: 14,
    fontFamily: theme.fonts.display,
    fontSize: 23.7,
    lineHeight: 26,
    letterSpacing: -0.5,
    color: theme.colors.text,
  },
  meta: {
    marginTop: 10,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.text,
  },
  hint: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  tableHead: {
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  headLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
  headDupla: {
    flex: 1,
    paddingLeft: 34,
  },
  colRecord: {
    width: 40,
    textAlign: "center",
  },
  colDiff: {
    width: 40,
    textAlign: "right",
  },
  table: {
    gap: 7,
  },
  // The leader sits on butter; everyone else on cream.
  standing: (leader: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: theme.radius.md,
    backgroundColor: leader ? theme.colors.butter : theme.colors.card,
    boxShadow: leader ? undefined : theme.shadows.card,
  }),
  rank: {
    width: 22,
    fontFamily: theme.fonts.displayBold,
    fontSize: 12.6,
    color: theme.colors.text,
  },
  dupla: {
    flex: 1,
    minWidth: 0,
  },
  duplaName: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    color: theme.colors.text,
  },
  club: {
    marginTop: 2,
    fontFamily: theme.fonts.regular,
    fontSize: 11.5,
    color: theme.colors.textMuted,
  },
  clubInput: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.wash,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.text,
  },
  record: {
    width: 40,
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.text,
    textAlign: "center",
  },
  diff: {
    width: 40,
    fontFamily: theme.fonts.bold,
    fontSize: 13,
    color: theme.colors.text,
    textAlign: "right",
  },
}))
