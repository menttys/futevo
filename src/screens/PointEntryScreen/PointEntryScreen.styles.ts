import { StyleSheet } from "react-native-unistyles"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // Tapping the empty area above the sheet dismisses it. The dimming is the card overlay.
  dismissArea: {
    flex: 1,
  },
  // The sheet slides up over the live score.
  sheet: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    maxHeight: "94%",
    marginTop: rt.insets.top + 8,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "rgba(10,17,31,0.28)",
  },
  content: {
    paddingHorizontal: theme.gutter,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: theme.fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: theme.colors.textMuted,
  },
  team: {
    marginTop: 8,
    fontFamily: theme.fonts.display,
    fontSize: 19,
    letterSpacing: -0.4,
    color: theme.colors.text,
  },
  preview: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  previewText: {
    fontFamily: theme.fonts.display,
    fontSize: 17.8,
    letterSpacing: -0.35,
    color: theme.colors.text,
    fontVariant: ["tabular-nums"],
  },
  step: {
    marginBottom: 8,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  note: {
    marginTop: 7,
    fontFamily: theme.fonts.regular,
    fontSize: 11.5,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  ballOut: (selected: boolean) => ({
    marginTop: 8,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    backgroundColor: selected ? theme.colors.dark : theme.colors.wash,
  }),
  ballOutLabel: (selected: boolean) => ({
    fontFamily: theme.fonts.semibold,
    fontSize: 13.5,
    color: selected ? theme.colors.white : theme.colors.text,
  }),
  players: {
    flexDirection: "row",
    gap: 8,
  },
  player: (selected: boolean, pressed: boolean) => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 12,
    borderRadius: theme.radius.full,
    backgroundColor: selected ? theme.colors.dark : theme.colors.card,
    boxShadow: selected ? undefined : theme.shadows.card,
    opacity: pressed ? 0.85 : 1,
  }),
  playerName: (selected: boolean) => ({
    flex: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: selected ? theme.colors.white : theme.colors.text,
  }),
  footer: {
    paddingHorizontal: theme.gutter,
    paddingTop: 8,
    paddingBottom: Math.max(rt.insets.bottom, 12) + 6,
    gap: 4,
  },
  save: {
    minHeight: 52,
  },
  cancel: {
    alignSelf: "center",
    padding: 6,
  },
  cancelLabel: {
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
  },
}))
