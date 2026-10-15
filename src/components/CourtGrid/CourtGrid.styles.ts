import { StyleSheet } from "react-native-unistyles"

import { HEAT_STOPS } from "@/utils/heatMap"

export const styles = StyleSheet.create((theme) => ({
  court: {
    aspectRatio: 1.4,
    borderWidth: 2,
    borderColor: theme.colors.grey200,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xs,
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.card,
  },
  net: {
    height: 22,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  netBand: (color: string) => ({
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: color,
  }),
  netLabel: {
    position: "absolute",
    fontFamily: "Sora-Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: theme.colors.dark,
  },
  sideLabel: (side: "A" | "B") => ({
    fontFamily: "Sora-Bold",
    fontSize: theme.typography.size.sm,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: theme.spacing.sm,
    color: side === "A" ? theme.colors.teamA : theme.colors.purple,
  }),
  row: {
    flex: 1,
    flexDirection: "row",
    gap: theme.spacing.xs,
  },
  cell: (selected: boolean, emptyColor: string) => ({
    flex: 1,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: selected ? HEAT_STOPS[0] : emptyColor,
    borderWidth: selected ? 2 : 0,
    borderColor: theme.colors.grey200,
  }),
}))
