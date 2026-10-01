import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import searchIconSource from '@assets/icons/search.png';

type HeaderSearchButtonProps = {
  onPress: () => void;
};

/**
 * Header search icon — the exact asset exported from Figma (frame
 * 42:13911's top-right icon, fileKey 4e1pQ2l0VkLNgnaV7xNlFW), not a
 * hand-recreated icon. See docs/planning/figma-refs/header_icons.png.
 */
function HeaderSearchButton({ onPress }: HeaderSearchButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} hitSlop={8} accessibilityLabel="Search movies" accessibilityRole="button">
      <Image source={searchIconSource} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  // The exported Figma asset (docs/planning/figma-refs/header_icons.png)
  // bakes in a lot of surrounding whitespace around the glyph itself — at
  // a "true" 22x22 box the visible magnifying glass renders tiny next to
  // the 24px header title. Sized up to compensate so the *visible* glyph
  // reads at roughly the right proportion to the title text.
  icon: {
    width: 38,
    height: 38,
  },
});

export default HeaderSearchButton;
