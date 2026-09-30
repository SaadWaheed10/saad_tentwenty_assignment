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
  icon: {
    width: 22,
    height: 22,
  },
});

export default HeaderSearchButton;
