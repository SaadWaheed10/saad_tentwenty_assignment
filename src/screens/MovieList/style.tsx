import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  // Top gap before the first card — matches Figma's 20px card top offset.
  listContent: {
    paddingTop: 20,
    paddingBottom: spacing.lg,
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
