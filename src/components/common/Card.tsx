import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, spacing } from '@theme/index';

type CardProps = ViewProps & {
  children: React.ReactNode;
};

function Card({ children, style, ...rest }: CardProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;
