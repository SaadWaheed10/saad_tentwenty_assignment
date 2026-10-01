import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyState } from '@components/index';
import { colors } from '@theme/index';

type Props = { title: string };

/**
 * Stub for the "Dashboard" / "Media Library" / "More" tabs.
 *
 * These exist in the Figma bottom tab bar (node 42:13916) as template
 * chrome, but have no corresponding screen in this assignment's 4-screen
 * brief (movie list / detail / search / seat map). They're wired as real,
 * tappable tabs — per the "use the real bottom-tabs library" direction —
 * rather than omitted, but intentionally render only a neutral empty state
 * instead of inventing out-of-scope features.
 */
function PlaceholderScreen({ title }: Props) {
  return (
    <View style={styles.container}>
      <EmptyState title={title} description="Not part of this assignment's scope." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
});

// Fixed-title wrappers so each is a plain, stable `component={...}` for
// React Navigation (which doesn't pass arbitrary custom props) rather than
// trying to thread `title` through route params.
export function DashboardScreen() {
  return <PlaceholderScreen title="Dashboard" />;
}

export function MediaLibraryScreen() {
  return <PlaceholderScreen title="Media Library" />;
}

export function MoreScreen() {
  return <PlaceholderScreen title="More" />;
}

export default PlaceholderScreen;
