import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@theme/index';

type TicketHeaderProps = {
  title: string;
  subtitle: string;
  onBack: () => void;
};

/**
 * Figma ticket headers (screens 06 + 07): thin back chevron on the left,
 * movie title + cyan subtitle perfectly centered on the screen width
 * (absolute center, not flex-balanced), no default stack header.
 */
function TicketHeader({ title, subtitle, onBack }: TicketHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        hitSlop={12}
        accessibilityLabel="Go back"
        accessibilityRole="button">
        <View style={styles.backChevron} />
      </TouchableOpacity>

      <View style={styles.centerBlock} pointerEvents="none">
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: undefined,
    minHeight: 56,
    justifyContent: 'center',
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm + 4,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  // Thin iOS-style chevron (Figma back control).
  backChevron: {
    width: 11,
    height: 11,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.text,
    transform: [{ rotate: '45deg' }],
  },
  centerBlock: {
    alignItems: 'center',
    paddingHorizontal: 52,
  },
  title: {
    fontFamily: typography.h2.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default TicketHeader;
