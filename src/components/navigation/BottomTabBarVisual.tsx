import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import bottomTabBarSource from '@assets/images/nav/bottom-tab-bar.png';

// Figma's design frame is a 375pt-wide phone mock. We keep the bar at its
// exact designed size and center it, rather than stretching the raster
// image to fill arbitrary widths — this app must also support landscape
// and larger screens (hard constraint), where stretching a pill-shaped
// asset would visibly distort it.
export const BOTTOM_TAB_BAR_HEIGHT = 75;
const BAR_WIDTH = 375;

/**
 * Pixel-accurate reproduction of the bottom bar on the Figma "Watch" frame
 * (fileKey 4e1pQ2l0VkLNgnaV7xNlFW, node 42:13916) — this is the actual
 * asset exported from Figma (see docs/planning/figma-refs/bottom_bar.png),
 * not a hand-recreated icon set.
 *
 * Only the "Watch" tab (2nd of 4) maps to a screen in this assignment's
 * scope — it represents the Movie List screen it's rendered on. "Dashboard",
 * "Media Library", and "More" belong to the broader Figma template but have
 * no corresponding screen in the 4-screen assignment brief (movie list /
 * detail / search / seat map). Rendered here as decorative-only, matching
 * the design pixel-for-pixel, without inventing out-of-scope screens.
 *
 * Positioned above `insets.bottom` rather than flush at `bottom: 0` — on
 * devices using 3-button (non-gesture) Android navigation, the system nav
 * bar occupies that space and would otherwise cover this bar entirely.
 */
function BottomTabBarVisual() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom }]} pointerEvents="none">
      <Image source={bottomTabBarSource} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  image: {
    width: BAR_WIDTH,
    height: BOTTOM_TAB_BAR_HEIGHT,
  },
});

export default BottomTabBarVisual;
