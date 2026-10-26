import { StyleSheet } from "react-native-unistyles"

import { IS_WEB, WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  name: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
  },
  email: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  sectionLabel: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  languageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  languageChip: (selected: boolean) => ({
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: selected ? theme.colors.primary : theme.colors.grey300,
    backgroundColor: selected ? theme.colors.primary : "transparent",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  }),
  languageLabel: (selected: boolean) => ({
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: selected ? theme.colors.dark : theme.colors.text,
  }),
  signOutButton: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    paddingVertical: IS_WEB ? theme.spacing.sm : theme.spacing.md,
    paddingHorizontal: IS_WEB ? theme.spacing.md : 0,
    alignSelf: IS_WEB ? "flex-start" : "stretch",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },
  signOutLabel: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.danger,
  },
}))
