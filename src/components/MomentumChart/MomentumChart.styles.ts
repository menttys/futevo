import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  chart: (height: number) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height,
  }),
  column: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  half: {
    flex: 1,
  },
  halfTop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // Home leads above the line in blue-black, Away below it in deep purple.
  up: (pct: number) => ({
    height: `${pct}%`,
    backgroundColor: theme.colors.text,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  }),
  down: (pct: number) => ({
    height: `${pct}%`,
    backgroundColor: theme.colors.purple,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  }),
}))
