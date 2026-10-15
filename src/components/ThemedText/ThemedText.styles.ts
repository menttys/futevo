import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  default: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.md,
    lineHeight: 24,
  },
  small: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.sm,
    lineHeight: 18,
  },
  xSmall: {
    fontFamily: "Sora-Regular",
    fontSize: theme.typography.size.xs,
    lineHeight: 16,
  },
  xSmallBold: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xs,
    lineHeight: 16,
  },
  defaultSemiBold: {
    fontFamily: "Sora-SemiBold",
    fontSize: theme.typography.size.md,
    lineHeight: 24,
  },
  title: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.xxl,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.lg,
  },
  link: {
    fontFamily: "Sora-Regular",
    lineHeight: 30,
    fontSize: theme.typography.size.md,
    color: theme.colors.primary,
  },
}))
