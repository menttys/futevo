import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xxl,
    color: theme.colors.text,
  },
  activeBanner: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeBannerText: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
  activeBannerSub: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.dark + "CC",
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  cardTeams: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  cardScore: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.primary,
  },
  cardDate: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
  },
}))
