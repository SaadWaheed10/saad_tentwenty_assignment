import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Custom header (Figma 06/07) — replaces the default stack header.
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: colors.text,
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 40, // optical balance against the back button
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.primary,
    marginTop: 2,
    textAlign: 'center',
  },
  mapArea: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: radii.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  mapScrollContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  screenIndicatorWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    width: '100%',
  },
  screenIndicator: {
    width: 220,
    height: 0,
    marginTop: spacing.xs,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    borderLeftWidth: 40,
    borderLeftColor: 'transparent',
    borderRightWidth: 40,
    borderRightColor: 'transparent',
    opacity: 0.7,
    transform: [{ scaleY: -1 }],
  },
  screenLabel: {
    ...typography.label,
    color: colors.textMuted,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textMuted,
    width: 18,
    textAlign: 'center',
    marginRight: 6,
  },
  seatsInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aisleGap: {
    width: 14,
  },
  seatHit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  mapOuterScroll: {
    paddingBottom: 16,
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
  zoomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonText: {
    ...typography.h2,
    color: colors.text,
    lineHeight: 22,
  },
  belowMap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '47%',
    marginBottom: spacing.sm,
  },
  legendSwatch: {
    width: 20,
    height: 14,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  legendLabel: {
    ...typography.caption,
    color: colors.text,
  },
  selectionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    marginTop: spacing.sm,
    gap: 8,
  },
  selectionChipText: {
    ...typography.body,
    color: colors.text,
  },
  selectionChipClear: {
    ...typography.body,
    color: colors.textMuted,
    paddingHorizontal: 4,
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
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
});
