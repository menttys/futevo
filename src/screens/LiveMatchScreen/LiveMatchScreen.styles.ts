import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top,
  },
  courtMode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.wash,
  },
  courtModeLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 12.5,
    color: theme.colors.text,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingBottom: Math.max(rt.insets.bottom, 16) + 12,
    gap: 12,
  },
  // Two full-width tap targets: Home in blue-black (cream text), Away in brand yellow.
  pointButton: (away: boolean, pressed: boolean) => ({
    height: 104,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: away ? theme.colors.primary : theme.colors.teamA,
    opacity: pressed ? 0.85 : 1,
  }),
  pointHint: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  pointHintOnDark: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.white,
  },
  pointLabel: {
    paddingHorizontal: 16,
    fontFamily: theme.fonts.display,
    fontSize: 18.5,
    letterSpacing: -0.4,
    color: theme.colors.text,
    textAlign: "center",
  },
  pointLabelOnDark: {
    paddingHorizontal: 16,
    fontFamily: theme.fonts.display,
    fontSize: 18.5,
    letterSpacing: -0.4,
    color: theme.colors.white,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  action: {
    flex: 1,
  },
  finish: {
    flex: 1,
  },
  chips: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.wash,
  },
  chipLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 12,
    color: theme.colors.text,
  },
  contentWide: {
    paddingHorizontal: 44,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  colMain: {
    flex: 1,
    gap: 12,
  },
  colSide: {
    width: 380,
    flexShrink: 0,
    gap: 12,
  },
  pointRow: {
    flexDirection: "row",
    gap: 12,
  },
  pointButtonWide: {
    flex: 1,
    height: 132,
    gap: 6,
  },
  hint: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  headerButton: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  undoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  lastCard: {
    gap: 12,
    padding: 18,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  },
  lastLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  lastRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  lastDot: (away: boolean) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: away ? theme.colors.purple : theme.colors.dark,
  }),
  lastScore: {
    width: 48,
    fontFamily: theme.fonts.displayBold,
    fontSize: 11,
    color: theme.colors.text,
    fontVariant: ["tabular-nums"],
  },
  lastPlayer: {
    width: 70,
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
  },
  lastDetail: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
}))
