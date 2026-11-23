import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // Tapping the empty area above the sheet dismisses it.
  dismissArea: {
    flex: 1,
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
  // No negative margin: the ScrollView clips anything outside its bounds, which
  // was cutting off the outer edge of the left-column pills.
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: "50%",
    padding: 4,
  },
}))
