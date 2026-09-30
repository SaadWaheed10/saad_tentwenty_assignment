import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

const POSTER_WIDTH = 80;
const POSTER_HEIGHT = 120;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  posterPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  posterPlaceholderText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  meta: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  ratingStar: {
    color: colors.warning,
    marginRight: spacing.xs / 2,
  },
  ratingValue: {
    ...typography.label,
    color: colors.text,
  },
});
