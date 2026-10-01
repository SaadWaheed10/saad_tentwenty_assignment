import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  screenIndicatorWrap: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  // A simple curved "cinema screen" indicator — trapezoid via border
  // widths, same CSS-trick approach already used elsewhere in this app
  // for flat vector shapes (no SVG dependency).
  screenIndicator: {
    width: '80%',
    height: 0,
    borderBottomWidth: 18,
    borderBottomColor: colors.surfaceMuted,
    borderLeftWidth: 24,
    borderLeftColor: 'transparent',
    borderRightWidth: 24,
    borderRightColor: 'transparent',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  screenLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.sm,
    letterSpacing: 2,
  },
  grid: {
    width: '100%',
    alignItems: 'center',
  },
  tierLabel: {
    ...typography.label,
    color: colors.textMuted,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textMuted,
    width: 20,
    textAlign: 'center',
  },
  seatsInRow: {
    flexDirection: 'row',
    gap: 6,
  },
  seat: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  seatPremium: {
    borderColor: colors.secondaryGold,
  },
  seatSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  seatUnavailable: {
    backgroundColor: colors.surfaceMuted,
    borderColor: colors.surfaceMuted,
  },
  seatLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
  },
  seatLabelSelected: {
    color: colors.white,
    fontWeight: '700' as const,
  },
  seatLabelUnavailable: {
    color: colors.grayMid,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.xl,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSwatch: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  legendLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  summaryCount: {
    ...typography.h3,
    color: colors.text,
  },
  summaryLabels: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    maxWidth: 220,
  },
  bookButton: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
  },
  bookButtonDisabled: {
    opacity: 0.4,
  },
});
