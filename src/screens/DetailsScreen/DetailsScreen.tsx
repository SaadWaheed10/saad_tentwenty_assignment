import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@components/index';
import { colors, spacing, typography } from '@theme/index';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({ route, navigation }: Props) {
  const id = route.params?.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      {id ? <Text style={styles.subtitle}>Item id: {id}</Text> : null}
      <Button title="Go Back" variant="secondary" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});

export default DetailsScreen;
