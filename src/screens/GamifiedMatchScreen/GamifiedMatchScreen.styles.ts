import { StyleSheet } from "react-native-unistyles"

import type { CourtRect, Point2D } from "@/utils/courtGesture"

export const TOKEN_SIZE = 44
export const LIFTED_SIZE = 52
export const LANDING_MARK_SIZE = 18
// Room around the court: the side margins are where a token is dragged to cancel.
export const COURT_FIT = { margin: { side: 44, end: 16 }, maxCell: 100 }

// Half the gap between two squares; squares next to the net get extra room for it.
const CELL_INSET = 4
const NET_CLEARANCE = 7
const NET_HEIGHT = 8
const HALO = 14
const TOKEN_BOX = LIFTED_SIZE + HALO * 2

export type NetEdge = "top" | "bottom" | null
export type CellTint = "none" | "landing" | "move"
export type TokenVariant = "rest" | "lifted" | "ghost" | "off"

// A square's drawn box: the zone rect minus the court lines, `grow` px bigger when lifted.
function box(rect: CourtRect, edge: NetEdge, grow = 0) {
  const top = CELL_INSET + (edge === "top" ? NET_CLEARANCE : 0) - grow
  const bottom = CELL_INSET + (edge === "bottom" ? NET_CLEARANCE : 0) - grow
  const side = CELL_INSET - grow
  return {
    position: "absolute" as const,
    left: rect.x + side,
    top: rect.y + top,
    width: rect.width - side * 2,
    height: rect.height - top - bottom,
  }
}

// Court mode: the court is the interface. Cream squares, a pastel gradient net, tokens you
// pick up and drop on the other side, and the ball's flight as a dotted curve.
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
    paddingBottom: theme.spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    paddingVertical: 7,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.butter,
  },
  scoreText: (team: "A" | "B") => ({
    fontFamily: theme.fonts.display,
    fontSize: 17,
    color: team === "A" ? theme.colors.text : theme.colors.purple,
    fontVariant: ["tabular-nums"],
  }),
  scoreDivider: {
    fontFamily: theme.fonts.display,
    fontSize: 17,
    color: theme.colors.text,
  },
  chipRow: {
    paddingHorizontal: theme.gutter,
    paddingBottom: theme.spacing.sm,
  },
  arena: {
    flex: 1,
  },
  cell: (rect: CourtRect, edge: NetEdge, tint: CellTint) => ({
    ...box(rect, edge),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    // The square a player is being moved to (where the attack will start) is just highlighted.
    backgroundColor:
      tint === "move"
        ? theme.colors.softYellow
        : tint === "landing"
          ? theme.colors.landingTint
          : theme.colors.card,
    boxShadow: theme.shadows.card,
  }),
  zoneNumber: {
    fontFamily: theme.fonts.displayBold,
    fontSize: 10,
    color: theme.colors.iconMuted,
  },
  net: (court: CourtRect) => ({
    position: "absolute",
    left: court.x - 6,
    width: court.width + 12,
    top: court.y + court.height / 2 - NET_HEIGHT / 2,
    height: NET_HEIGHT,
  }),
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Dragging over a valid square: it lifts, turns yellow and carries the token.
  liftedZone: (rect: CourtRect, edge: NetEdge) => ({
    ...box(rect, edge, 5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    boxShadow: "0px 14px 30px rgba(10,17,31,0.28)",
  }),
  liftedTag: {
    position: "absolute",
    bottom: 6,
    fontFamily: theme.fonts.displayBold,
    fontSize: 8.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  // After release the square stays yellow, a little lower than while lifted.
  placedZone: (rect: CourtRect, edge: NetEdge) => ({
    ...box(rect, edge, 1),
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    boxShadow: "0px 6px 16px rgba(10,17,31,0.18)",
  }),
  // Centred on the exact landing point.
  landingMark: (point: Point2D) => ({
    position: "absolute",
    left: point.x - LANDING_MARK_SIZE / 2,
    top: point.y - LANDING_MARK_SIZE / 2,
    width: LANDING_MARK_SIZE,
    height: LANDING_MARK_SIZE,
    alignItems: "center",
    justifyContent: "center",
  }),
  // Sits on the edge of the square away from the landing mark, so they never overlap.
  placedTag: (atTop: boolean) => ({
    position: "absolute",
    ...(atTop ? { top: 6 } : { bottom: 6 }),
    fontFamily: theme.fonts.displayBold,
    fontSize: 8.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: theme.colors.text,
  }),
  // One box size for every token state, so the halo can grow without moving the centre.
  token: (center: Point2D, variant: TokenVariant) => ({
    position: "absolute",
    left: center.x - TOKEN_BOX / 2,
    top: center.y - TOKEN_BOX / 2,
    width: TOKEN_BOX,
    height: TOKEN_BOX,
    alignItems: "center",
    justifyContent: "center",
    opacity: variant === "ghost" ? 0.28 : variant === "off" ? 0.8 : 1,
  }),
  halo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: TOKEN_BOX / 2,
    backgroundColor: "rgba(10,17,31,0.10)",
    boxShadow: "0px 10px 24px rgba(10,17,31,0.22)",
  },
  // Always two lines tall: a longer hint must never resize the arena (and so move the court)
  // while a finger is dragging over it.
  hint: {
    textAlign: "center",
    fontFamily: theme.fonts.semibold,
    fontSize: 12.5,
    lineHeight: 17,
    minHeight: 17 * 2 + theme.spacing.xs + theme.spacing.sm,
    color: theme.colors.textMuted,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: theme.gutter,
    paddingBottom: rt.insets.bottom + theme.spacing.sm,
  },
  footerButton: {
    flex: 1,
  },
  // Points sheet: docks on whichever edge is farther from where the ball landed.
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
