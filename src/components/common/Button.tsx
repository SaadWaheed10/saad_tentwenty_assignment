import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '@theme/index';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        style,
      ]}
      activeOpacity={0.8}
      {...rest}>
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryLabel: {
    color: colors.white,
  },
  secondaryLabel: {
    color: colors.text,
  },
});

export default Button;
