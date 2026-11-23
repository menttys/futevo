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
  // Two full-width tap targets: Home in butter, Away in brand yellow.
  pointButton: (away: boolean, pressed: boolean) => ({
    height: 104,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: away ? theme.colors.primary : theme.colors.butter,
    opacity: pressed ? 0.85 : 1,
  }),
  pointHint: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  pointLabel: {
    paddingHorizontal: 16,
    fontFamily: theme.fonts.display,
    fontSize: 18.5,
    letterSpacing: -0.4,
    color: theme.colors.text,
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
    backgroundColor: theme.colors.wash,
    borderWidth: 1,
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
}))
