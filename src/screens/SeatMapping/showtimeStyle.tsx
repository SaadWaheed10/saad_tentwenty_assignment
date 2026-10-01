import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

export const showtimeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
    paddingRight: 40,
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
  content: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionLabel: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  dateRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  dateChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    minWidth: 64,
    alignItems: 'center',
  },
  dateChipSelected: {
    backgroundColor: colors.primary,
  },
  dateChipText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  dateChipTextSelected: {
    color: colors.white,
  },
  showtimeRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  showtimeCard: {
    width: 220,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  showtimeCardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  showtimeTime: {
    ...typography.h3,
    color: colors.text,
  },
  showtimeHall: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  miniMap: {
    marginTop: spacing.md,
    height: 72,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  miniMapScreen: {
    width: '55%',
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    opacity: 0.5,
    marginBottom: 8,
  },
  miniMapRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 3,
  },
  miniSeat: {
    width: 8,
    height: 6,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  miniSeatGrey: {
    backgroundColor: colors.grayMid,
  },
  miniSeatVip: {
    backgroundColor: colors.secondaryPurple,
  },
  priceLine: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  priceStrong: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectButton: {
    borderRadius: radii.md,
  },
});
