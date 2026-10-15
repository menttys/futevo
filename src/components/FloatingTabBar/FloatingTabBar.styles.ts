import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: Math.max(rt.insets.bottom, 12),
    backgroundColor: "transparent",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    maxWidth: 420,
    padding: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.dark,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  wrapperWeb: {
    justifyContent: "flex-start",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  barWeb: {
    flexDirection: "column",
    alignSelf: "center",
    maxWidth: undefined,
    gap: 16,
    borderRadius: 32,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  group: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupWeb: {
    flex: 0,
    flexDirection: "column",
    gap: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  circleNew: {
    backgroundColor: theme.colors.white,
  },
  circleActive: {
    backgroundColor: theme.colors.primary,
  },
}))
