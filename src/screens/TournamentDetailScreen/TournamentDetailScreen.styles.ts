import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    ...WEB_CONTENT,
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  name: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.xl,
    color: theme.colors.text,
  },
  meta: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  sectionLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  entryRow: {
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  entryNames: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  input: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.grey200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey200,
  },
  matchLabel: {
    flex: 1,
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  matchScore: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  hint: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
}))
