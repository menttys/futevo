import { StyleSheet } from "react-native-unistyles"

import { WEB_CONTENT } from "@/constants/Platform"

export const styles = StyleSheet.create((theme, rt) => ({
  root: {
    flex: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  savePill: (enabled: boolean) => ({
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    opacity: enabled ? 1 : 0.4,
  }),
  saveLabel: {
    fontFamily: theme.fonts.bold,
    fontSize: 13,
    color: theme.colors.text,
  },
  content: {
    ...WEB_CONTENT,
    paddingHorizontal: theme.gutter,
    gap: 14,
  },
  contentWide: {
    paddingHorizontal: 44,
  },
  columns: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  leftCard: {
    width: 380,
    gap: 14,
    padding: 18,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
    overflow: "hidden",
  },
  rightColumn: {
    flex: 1,
    gap: 14,
  },
  pairRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 14,
  },
  pairCard: {
    flex: 1,
  },
  cardLabelSpaced: {
    marginTop: 18,
  },
  partners: {
    gap: 12,
  },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  partnerName: {
    flex: 1,
    fontFamily: theme.fonts.semibold,
    fontSize: 14,
    color: theme.colors.text,
  },
  partnerMeta: {
    fontFamily: theme.fonts.regular,
    fontSize: 12.5,
    color: theme.colors.textMuted,
  },
  zonesCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  zonesGrid: {
    width: 280,
  },
  insight: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.text,
  },
  // Large avatar with a faint mark behind it.
  hero: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  heroMark: {
    position: "absolute",
    alignSelf: "center",
    top: -20,
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  link: {
    fontFamily: theme.fonts.semibold,
    fontSize: 13,
    color: theme.colors.text,
    textDecorationLine: "underline",
  },
  label: {
    marginBottom: 6,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  input: {
    borderRadius: theme.radius.full,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: theme.colors.wash,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
    color: theme.colors.text,
  },
  countries: {
    flexDirection: "row",
    gap: 10,
  },
  country: {
    flex: 1,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    padding: 18,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.card,
    boxShadow: theme.shadows.card,
  },
  cardLabel: {
    marginBottom: 10,
    fontFamily: theme.fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    color: theme.colors.text,
  },
  form: {
    flexDirection: "row",
    gap: 8,
  },
  empty: {
    fontFamily: theme.fonts.regular,
    fontSize: 13,
    color: theme.colors.textMuted,
  },
}))
