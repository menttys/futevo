import { StyleSheet } from "react-native-unistyles"

import type { CourtRect } from "@/utils/courtGesture"

export const TOKEN_SIZE = 44
export const COURT_MARGIN = 36
const CELL_GAP = 3

// Court mode: the court is the interface. Cream zones, a blue-black net, the ball's flight as a dotted trail.
export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.gutter,
    paddingTop: 6,
    paddingBottom: theme.spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.wash,
  },
  // Floating score pill: Home blue-black, Away deep purple.
  scorePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.butter,
  },
  scoreText: (team: "A" | "B") => ({
    fontFamily: theme.fonts.display,
    fontSize: 15,
    color: team === "A" ? theme.colors.text : theme.colors.purple,
    fontVariant: ["tabular-nums"],
  }),
  scoreDivider: {
    fontFamily: theme.fonts.display,
    fontSize: 15,
    color: theme.colors.text,
  },
  hint: {
    textAlign: "center",
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    // Reserve two lines so a longer hint never shifts the court under the user's finger.
    lineHeight: 18,
    minHeight: 18 * 2 + theme.spacing.sm,
  },
  hintError: {
    color: theme.colors.danger,
  },
  arena: {
    flex: 1,
  },
  // One cream tile per zone; the gap between tiles reads as the court lines.
  cell: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x + CELL_GAP,
    top: rect.y + CELL_GAP,
    width: rect.width - CELL_GAP * 2,
    height: rect.height - CELL_GAP * 2,
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  }),
  net: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x - 4,
    width: rect.width + 8,
    top: rect.y + rect.height / 2 - 3,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.dark,
  }),
  // The landing zone turns brand yellow.
  zoneHighlight: (rect: CourtRect) => ({
    position: "absolute",
    left: rect.x + CELL_GAP,
    top: rect.y + CELL_GAP,
    width: rect.width - CELL_GAP * 2,
    height: rect.height - CELL_GAP * 2,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    borderWidth: 1.5,
    borderColor: theme.colors.dark,
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
    fontFamily: selected ? theme.fonts.bold : theme.fonts.semibold,
    fontSize: theme.typography.size.xs,
    color: theme.colors.text,
  }),
  // Always reserved, so the sheet (absolute) opening never resizes the arena.
  bottomSpacer: {
    height: rt.insets.bottom,
  },
  // Docks on whichever edge is farther from where the ball landed, so the landing spot stays visible.
  sheet: (anchor: "top" | "bottom") => ({
    position: "absolute",
    left: 0,
    right: 0,
    ...(anchor === "bottom"
      ? {
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: rt.insets.bottom + theme.spacing.lg,
        }
      : {
          top: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: rt.insets.top + theme.spacing.md,
        }),
    backgroundColor: theme.colors.background,
    boxShadow: theme.shadows.bar,
    paddingHorizontal: theme.gutter,
    paddingVertical: theme.spacing.lg,
    gap: 10,
  }),
  sheetTitle: {
    fontFamily: theme.fonts.display,
    fontSize: 19,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  sheetSubtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  sheetLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  sheetActions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 2,
  },
}))
