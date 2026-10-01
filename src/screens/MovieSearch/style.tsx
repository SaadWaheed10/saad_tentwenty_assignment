import { StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Full pill shape (not the softer radii.md card used elsewhere) —
  // matches the Figma search frame's rounded search bar.
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
  },
  // Same oversized box as HeaderSearchButton — this exported Figma asset
  // bakes in a lot of internal whitespace around the glyph itself.
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
  },
  clearGlyph: {
    ...typography.body,
    color: colors.textMuted,
    paddingHorizontal: spacing.xs,
  },
  content: {
    flex: 1,
  },
  sectionLabel: {
    ...typography.h3,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  // Result row — Figma's search list is a dense row list (thumbnail +
  // title + genre subtitle), distinct from the Movie List's full-width
  // backdrop card.
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  rowThumb: {
    width: 56,
    height: 56,
    borderRadius: radii.sm,
  },
  rowThumbPlaceholder: {
    backgroundColor: colors.surfaceMuted,
  },
  rowTextWrap: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  rowTitle: {
    ...typography.h3,
    color: colors.text,
  },
  rowSubtitle: {
    ...typography.caption,
    color: colors.primary,
    marginTop: 2,
  },
  rowMore: {
    ...typography.h2,
    color: colors.primary,
    paddingHorizontal: spacing.sm,
  },
  // Idle-state genre browse grid (Figma search frame, before typing).
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  genreTile: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: radii.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'flex-end',
  },
  genreTileImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  genreTilePlaceholder: {
    backgroundColor: colors.surfaceMuted,
  },
  genreTileScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    backgroundColor: colors.overlayDark,
  },
  genreTileLabel: {
    ...typography.cardTitle,
    color: colors.white,
    padding: spacing.sm,
  },
});
