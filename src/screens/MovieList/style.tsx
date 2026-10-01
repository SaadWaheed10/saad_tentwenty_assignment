import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  // Top gap before the first card — matches Figma's 20px card top offset.
  // Bottom padding (beyond the real tab bar, which the bottom-tabs
  // navigator already reserves space for) just gives the last card some
  // breathing room — matches the top gap for visual symmetry.
  listContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  staleBanner: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: 8,
    padding: spacing.sm,
  },
  staleBannerText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
