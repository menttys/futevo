import { StyleSheet } from "react-native-unistyles"

import type { CourtRect } from "@/utils/courtGesture"

export const TOKEN_SIZE = 48
export const COURT_MARGIN = 36
const CELL_GAP = 1.5

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scorePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  scoreText: (team: "A" | "B") => ({
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.xl,
    color: team === "A" ? theme.colors.white : theme.colors.primary,
  }),
  scoreDivider: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.grey400,
  },
  hint: {
    textAlign: "center",
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey300,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    // Reserve two lines so a longer hint never shifts the court under the user's finger.
    lineHeight: 20,
    minHeight: 20 * 2 + theme.spacing.sm,
  },
  hintError: {
    color: theme.colors.secondary,
  },
  arena: {
    flex: 1,
  },
  // One slightly rounded square per zone; the inset leaves a thin gap that reads as the court lines.
  cell: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x + CELL_GAP,
    top: rect.y + CELL_GAP,
    width: rect.width - CELL_GAP * 2,
    height: rect.height - CELL_GAP * 2,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.grey800,
  }),
  net: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x,
    width: rect.width,
    top: rect.y + rect.height / 2 - 11,
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }),
  netBand: (color: string) => ({
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: color,
  }),
  netLabel: {
    position: "absolute",
    fontFamily: "Figtree_700Bold",
    fontSize: 10,
    letterSpacing: 2,
    color: theme.colors.dark,
  },
  zoneHighlight: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x + CELL_GAP,
    top: rect.y + CELL_GAP,
    width: rect.width - CELL_GAP * 2,
    height: rect.height - CELL_GAP * 2,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    opacity: 0.4,
  }),
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  token: (x: number, y: number) => ({
    position: "absolute",
    left: x - TOKEN_SIZE,
    top: y - TOKEN_SIZE / 2,
    width: TOKEN_SIZE * 2,
    alignItems: "center",
  }),
  tokenName: (selected: boolean) => ({
    marginTop: 2,
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.xs,
    color: selected ? theme.colors.primary : theme.colors.white,
  }),
  // Docks on whichever edge is farther from where the ball landed, so the landing spot stays visible.
  sheet: (anchor: "top" | "bottom") => ({
    position: "absolute",
    left: 0,
    right: 0,
    ...(anchor === "bottom"
      ? {
          bottom: 0,
          borderTopLeftRadius: theme.radius.xl,
          borderTopRightRadius: theme.radius.xl,
        }
      : {
          top: 0,
          borderBottomLeftRadius: theme.radius.xl,
          borderBottomRightRadius: theme.radius.xl,
        }),
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  }),
  sheetTitle: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.lg,
    color: theme.colors.text,
  },
  sheetSubtitle: {
    fontFamily: "Figtree_400Regular",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  sheetLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },
  sheetActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.grey600,
  },
  cancelLabel: {
    fontFamily: "Figtree_600SemiBold",
    fontSize: theme.typography.size.md,
    color: theme.colors.text,
  },
  confirmButton: {
    flex: 2,
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
  },
  confirmLabel: {
    fontFamily: "Figtree_700Bold",
    fontSize: theme.typography.size.md,
    color: theme.colors.dark,
  },
}))
