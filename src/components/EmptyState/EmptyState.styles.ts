import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Sora-Regular",
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
}))
