import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  closeRow: {
    ...WEB_CONTENT,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  content: {
    ...WEB_CONTENT,
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    padding: theme.spacing.lg,
  },
  title: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  courtWrapper: {
    maxWidth: 320,
    alignSelf: "center",
    width: "100%",
    flexShrink: 1,
  },
  courtRow: (wide: boolean) => ({
    flexDirection: wide ? "row" : "column",
    alignItems: wide ? "stretch" : "center",
    justifyContent: "center",
    gap: theme.spacing.md,
  }),
  // Mirrors a court cell, but sits outside the court boundary.
  outCell: (active: boolean, wide: boolean) => ({
    width: wide ? 110 : "100%",
    maxWidth: wide ? undefined : 320,
    minHeight: 56,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: active ? theme.colors.dark : theme.colors.grey400,
    backgroundColor: active ? theme.colors.primary : "transparent",
    alignItems: "center",
    justifyContent: "center",
  }),
  ballOutLabel: (active: boolean) => ({
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.md,
    color: active ? theme.colors.dark : theme.colors.text,
  }),
  sectionSpacer: {
    height: theme.spacing.lg,
  },
  playersRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  playerOption: {
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  playerName: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
  },
  confirmButton: (enabled: boolean) => ({
    backgroundColor: enabled ? theme.colors.primary : theme.colors.grey600,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: IS_WEB ? theme.spacing.xl : 0,
    alignSelf: IS_WEB ? "flex-start" : "stretch",
    alignItems: "center",
  }),
  confirmLabel: (enabled: boolean) => ({
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: enabled ? theme.colors.dark : theme.colors.textMuted,
  }),
}))
