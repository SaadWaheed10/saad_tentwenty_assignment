import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getTmdbImageUrl } from '@api/tmdbImage';
import type { TmdbMovie } from '@app-types/tmdb';
import { styles } from './style';

export type MovieListItemProps = {
  movie: TmdbMovie;
  onPress: (movie: TmdbMovie) => void;
};

/**
 * Full-width landscape card with the title overlaid at the bottom — matches
 * the Figma "Watch" screen (fileKey 4e1pQ2l0VkLNgnaV7xNlFW, frame 42:13911):
 * 335×180 card, 10px radius, 20px screen margin, title in white Poppins
 * Medium 18 inset ~20px from the left/bottom.
 *
 * Uses `backdrop_path` (landscape) rather than `poster_path` (portrait) —
 * the card's 335:180 aspect ratio is a landscape shape, not a poster shape.
 *
 * NOTE: Figma renders a true black→transparent linear gradient behind the
 * title. We approximate it with a flat semi-transparent scrim
 * (`colors.overlayDark`) instead of adding a native gradient dependency —
 * an inferred simplification, not a measured match (see AGENTS.md).
 */
function MovieListItem({ movie, onPress }: MovieListItemProps) {
  const backdropUrl = getTmdbImageUrl(movie.backdrop_path ?? movie.poster_path, 'w500');

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => onPress(movie)}>
      {backdropUrl ? (
        <Image source={{ uri: backdropUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]} />
      )}
      <View style={styles.scrim}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MovieListItem;
