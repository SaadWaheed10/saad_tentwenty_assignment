import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  // Top gap before the first card — matches Figma's 20px card top offset.
  // Bottom padding is computed in the screen (needs safe-area insets) to
  // clear the floating tab bar — see MovieListScreen.tsx.
  listContent: {
    paddingTop: 20,
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
