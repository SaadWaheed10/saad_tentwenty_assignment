import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Same white as the header so there's no grey "gutter" strip between
    // the Watch/search header and the first movie card (Figma frame
    // 42:13911 is flush white through that region).
    backgroundColor: colors.background,
  },
  // Small top inset before the first card — Figma is ~10–12px, not a
  // large spacer. Earlier 20px read as an empty gap under the header.
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  staleBanner: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    borderRadius: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  staleBannerText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
