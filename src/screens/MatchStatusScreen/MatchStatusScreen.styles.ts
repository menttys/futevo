import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: rt.insets.top,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    paddingBottom: 16,
    gap: 12,
  },
  card: {
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    borderRadius: theme.radius.card,
    padding: 14,
  },
  cardLabel: {
    marginBottom: 8,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  pair: {
    flexDirection: "row",
    gap: 10,
  },
  half: {
    flex: 1,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  footer: {
    ...WEB_CONTENT,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: theme.gutter,
    paddingTop: 10,
    paddingBottom: Math.max(rt.insets.bottom, 16),
  },
  // Compact twins of the Live screen's Point buttons: Home blue-black, Away brand yellow.
  pointButton: (away: boolean, pressed: boolean) => ({
    flex: 1,
    height: 68,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 8,
    backgroundColor: away ? theme.colors.primary : theme.colors.teamA,
    opacity: pressed ? 0.85 : 1,
  }),
  hint: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  hintOnDark: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: theme.colors.white,
  },
  label: {
    fontFamily: theme.fonts.display,
    fontSize: 14,
    letterSpacing: -0.3,
    color: theme.colors.text,
    textAlign: "center",
  },
  labelOnDark: {
    fontFamily: theme.fonts.display,
    fontSize: 14,
    letterSpacing: -0.3,
    color: theme.colors.white,
    textAlign: "center",
  },
}))
