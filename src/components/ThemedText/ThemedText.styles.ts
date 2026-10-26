import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  default: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.md,
    lineHeight: 24,
  },
  small: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    lineHeight: 18,
  },
  xSmall: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.xs,
    lineHeight: 16,
  },
  xSmallBold: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.xs,
    lineHeight: 16,
  },
  defaultSemiBold: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.md,
    lineHeight: 24,
  },
  title: {
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontSize: theme.typography.size.xxl,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontSize: theme.typography.size.lg,
  },
  link: {
    fontFamily: "Figtree_400Regular",
    lineHeight: 30,
    fontSize: theme.typography.size.md,
    color: theme.colors.primary,
  },
}))
