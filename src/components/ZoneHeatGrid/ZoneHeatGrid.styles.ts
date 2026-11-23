import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme) => ({
  grid: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  // Heat in brand yellow: alpha grows with the share of points in the zone.
  cell: (alpha: number) => ({
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: alpha > 0 ? `rgba(255,212,0,${alpha})` : theme.colors.wash,
  }),
  count: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 9,
    color: theme.colors.text,
  },
}))
