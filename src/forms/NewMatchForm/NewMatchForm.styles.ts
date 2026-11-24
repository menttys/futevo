import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingBottom: 16,
    gap: 8,
  },
  contentWide: {
    paddingHorizontal: 44,
    gap: 16,
  },
  teams: {
    gap: 8,
  },
  teamsWide: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 16,
  },
  versusWide: {
    flexDirection: "column",
    alignSelf: "center",
    marginVertical: 0,
    gap: 8,
  },
  footerWide: {
    alignItems: "flex-end",
    paddingHorizontal: 44,
  },
  startWide: {
    minHeight: 52,
    minWidth: 260,
  },
  hint: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  // Home is the blue-black card, Away the yellow one.
  teamFlex: {
    flex: 1,
  },
  teamCard: (home: boolean) => ({
    gap: 10,
    padding: 16,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    backgroundColor: home ? theme.colors.dark : theme.colors.primary,
  }),
  watermark: (home: boolean) => ({
    position: "absolute",
    right: -20,
    top: -24,
    opacity: home ? 0.14 : 0.1,
  }),
  teamLabel: (home: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: home ? theme.colors.primary : theme.colors.text,
  }),
  nameField: (home: boolean) => ({
    borderRadius: theme.radius.full,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: home ? theme.colors.onDarkWash : theme.colors.wash,
  }),
  nameInput: (home: boolean) => ({
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: home ? theme.colors.white : theme.colors.text,
  }),
  lockedName: (home: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 15,
    color: home ? theme.colors.white : theme.colors.text,
  }),
  suggestions: {
    gap: 6,
  },
  suggestion: (home: boolean, selected: boolean) => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    backgroundColor: selected
      ? home
        ? theme.colors.primary
        : theme.colors.dark
      : home
        ? theme.colors.onDarkWash
        : theme.colors.washStrong,
  }),
  suggestionLabel: (home: boolean, selected: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: selected
      ? home
        ? theme.colors.text
        : theme.colors.primary
      : home
        ? theme.colors.white
        : theme.colors.text,
  }),
  slots: {
    flexDirection: "row",
    gap: 8,
  },
  slot: (home: boolean, pressed: boolean) => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 7,
    paddingLeft: 7,
    paddingRight: 14,
    borderRadius: theme.radius.full,
    backgroundColor: home ? theme.colors.onDarkWash : theme.colors.washStrong,
    opacity: pressed ? 0.8 : 1,
  }),
  slotEmpty: (home: boolean) => ({
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: home ? theme.colors.primary : theme.colors.dark,
  }),
  slotText: {
    flex: 1,
    minWidth: 0,
  },
  slotSide: (home: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    opacity: 0.85,
    color: home ? theme.colors.white : theme.colors.text,
  }),
  slotName: (home: boolean) => ({
    marginTop: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: home ? theme.colors.white : theme.colors.text,
  }),
  versus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginVertical: -2,
  },
  versusLabel: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 10.4,
    letterSpacing: -0.2,
    color: theme.colors.text,
  },
  rules: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  ruleTarget: {
    flex: 1.5,
  },
  ruleWinBy: {
    flex: 1,
  },
  fieldLabel: {
    marginBottom: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  tournamentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  },
  tournamentText: {
    flex: 1,
  },
  tournamentEyebrow: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
  tournamentValue: {
    marginTop: 3,
    fontFamily: theme.fonts.semibold,
    fontSize: 14.5,
    color: theme.colors.text,
  },
  tournamentBody: {
    gap: 8,
    paddingTop: 4,
  },
  chipRow: {
    gap: 8,
  },
  chip: (selected: boolean) => ({
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.dark : theme.colors.wash,
  }),
  chipLabel: (selected: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: selected ? theme.colors.white : theme.colors.text,
  }),
  input: {
    borderRadius: theme.radius.full,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: theme.colors.wash,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  // Big yellow Start match pinned at the bottom. The floating tab bar overlays this
  // area, so lift the footer above it when the bottom bar is shown (tabBarInset > 0).
  footer: (tabBarInset: number) => ({
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingTop: 8,
    paddingBottom: tabBarInset > 0 ? tabBarInset + 8 : Math.max(rt.insets.bottom, 16) + 8,
  }),
  start: {
    minHeight: 52,
  },
}))
