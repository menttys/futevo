import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  name: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xl,
    color: theme.colors.text,
  },
  meta: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  sectionLabel: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  entryRow: {
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey700,
  },
  entryNames: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  input: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.grey600,
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
    borderBottomColor: theme.colors.grey700,
  },
  matchLabel: {
    flex: 1,
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text,
  },
  matchScore: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  hint: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
}))
