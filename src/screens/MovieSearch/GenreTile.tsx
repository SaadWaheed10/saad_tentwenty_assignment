import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './style';

export type GenreTileProps = {
  label: string;
  imageUrl: string | null;
};

/**
 * Idle-state genre browse tile (Figma search frame, idle state before the
 * user types anything) — backdrop image with a dark scrim and the genre
 * name overlaid at the bottom-left, in a 2-column grid.
 */
function GenreTile({ label, imageUrl }: GenreTileProps) {
  return (
    <View style={styles.genreTile}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.genreTileImage} resizeMode="cover" />
      ) : (
        <View style={[styles.genreTileImage, styles.genreTilePlaceholder]} />
      )}
      <View style={styles.genreTileScrim} />
      <Text style={styles.genreTileLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export default GenreTile;
