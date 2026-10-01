import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  screenIndicatorWrap: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  screenIndicator: {
    width: '85%',
    height: 0,
    borderBottomWidth: 14,
    borderBottomColor: colors.primary,
    borderLeftWidth: 28,
    borderLeftColor: 'transparent',
    borderRightWidth: 28,
    borderRightColor: 'transparent',
    opacity: 0.55,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textMuted,
    width: 18,
    textAlign: 'center',
    marginRight: 4,
  },
  seatsInRow: {
    flexDirection: 'row',
    gap: 4,
  },
  seatHit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  seatRegular: {
    backgroundColor: colors.primary,
  },
  seatVip: {
    backgroundColor: colors.secondaryPurple,
  },
  seatSelected: {
    backgroundColor: colors.secondaryGold,
  },
  seatUnavailable: {
    backgroundColor: colors.grayMid,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xl,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: '45%',
  },
  legendSwatch: {
    width: 18,
    height: 12,
    borderRadius: 3,
  },
  legendLabel: {
    ...typography.caption,
    color: colors.text,
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
    gap: spacing.sm,
  },
  pricePill: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: 110,
  },
  priceLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  priceValue: {
    ...typography.h3,
    color: colors.text,
    marginTop: 2,
  },
  bookButton: {
    flex: 1,
    borderRadius: radii.md,
  },
  bookButtonDisabled: {
    opacity: 0.4,
  },
  selectionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginTop: spacing.md,
    gap: 6,
  },
  selectionChipText: {
    ...typography.caption,
    color: colors.text,
  },
  selectionChipClear: {
    ...typography.body,
    color: colors.textMuted,
    paddingHorizontal: 4,
  },
});
