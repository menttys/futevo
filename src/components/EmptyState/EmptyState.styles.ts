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
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Figtree_400Regular",
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
}))
