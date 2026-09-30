import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@theme/index';
import Button from './Button';

type ErrorViewProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

/**
 * Generic error state with an optional retry action. Never leave a screen
 * blank on failure — see .cursor/rules/03-offline-data.mdc.
 */
function ErrorView({
  title = 'Something went wrong',
  description = 'Please check your connection and try again.',
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {onRetry ? (
        <Button title="Retry" onPress={onRetry} style={styles.action} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  action: {
    marginTop: spacing.lg,
  },
});

export default ErrorView;
