import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fontFamily } from '@theme/index';

/**
 * Tab label renderer — bold + white when focused, regular + muted gray
 * when not, matching the "Watch" tab's treatment in the Figma bottom bar
 * (node 42:13916). See TabBarIcon.tsx for how these colors were measured.
 */
type Props = { focused: boolean; children: string };

function TabBarLabel({ focused, children }: Props) {
  return (
    <Text
      style={[
        styles.label,
        focused ? styles.labelFocused : styles.labelUnfocused,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    marginTop: 4,
  },
  labelFocused: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
  labelUnfocused: {
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.tabBarInactive,
  },
});

export default TabBarLabel;
