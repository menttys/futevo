import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  row: {
    ...WEB_CONTENT,
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  panel: (color: string) => ({
    flex: 1,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderColor: color,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  }),
  names: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
    textAlign: "center",
    paddingHorizontal: theme.spacing.sm,
  },
  club: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
    textAlign: "center",
    paddingHorizontal: theme.spacing.sm,
  },
  namesSmall: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    textAlign: "center",
    paddingHorizontal: theme.spacing.sm,
  },
  score: (color: string) => ({
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontVariant: ["tabular-nums"],
    fontSize: 72,
    color,
  }),
  hint: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
}))
