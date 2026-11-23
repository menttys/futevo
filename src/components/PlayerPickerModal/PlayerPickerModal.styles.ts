import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(10,17,31,0.5)",
  },
  sheet: {
    height: "80%",
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: theme.gutter,
    paddingTop: 16,
    paddingBottom: Math.max(rt.insets.bottom, 16),
    gap: 12,
  },
  overlayWeb: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,17,31,0.5)",
    padding: theme.spacing.md,
  },
  floating: {
    width: "100%",
    maxWidth: 560,
    height: "80%",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    padding: theme.gutter,
    gap: 12,
    boxShadow: "0 12px 40px rgba(10,17,31,0.35)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.wash,
  },
  title: {
    flex: 1,
    fontFamily: theme.fonts.displayBold,
    fontSize: 15.5,
    letterSpacing: -0.3,
    color: theme.colors.text,
  },
  counter: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  list: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  cell: {
    width: "50%",
    padding: 4,
  },
}))
