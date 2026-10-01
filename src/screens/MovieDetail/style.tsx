import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

const BACKDROP_HEIGHT = 580;
const SCRIM_HEIGHT = 320;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  backdropWrap: {
    height: BACKDROP_HEIGHT,
    backgroundColor: colors.black,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdropPlaceholder: {
    backgroundColor: colors.surfaceMuted,
  },
  // Dark gradient-like scrim behind the title/buttons so they stay
  // readable over any backdrop image — approximated as a flat
  // semi-transparent overlay rather than a true gradient (same
  // documented simplification as the Movie List card scrim).
  backdropScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCRIM_HEIGHT,
    backgroundColor: colors.overlayDark,
  },
  backdropContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  movieTitle: {
    ...typography.h1,
    color: colors.secondaryGold,
    textAlign: 'center',
  },
  titleDivider: {
    height: 1,
    backgroundColor: colors.secondaryGold,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    opacity: 0.6,
  },
  releaseLabel: {
    ...typography.body,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ticketsButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ticketsButtonText: {
    ...typography.h3,
    color: colors.white,
    fontWeight: '700',
  },
  trailerButton: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailerButtonDisabled: {
    opacity: 0.5,
  },
  trailerPlayIcon: {
    width: 0,
    height: 0,
    marginRight: spacing.sm,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 11,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.white,
  },
  trailerButtonText: {
    ...typography.h3,
    color: colors.white,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  genreChip: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  genreChipText: {
    ...typography.label,
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
  },
  overviewText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
});
