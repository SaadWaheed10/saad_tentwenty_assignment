import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getTmdbImageUrl } from '@api/tmdbImage';
import type { TmdbMovie } from '@app-types/tmdb';
import { formatReleaseDate } from '@utils/date';
import { styles } from './style';

export type MovieListItemProps = {
  movie: TmdbMovie;
  onPress: (movie: TmdbMovie) => void;
};

/**
 * Single row in the upcoming-movies list: poster + title + release date +
 * rating. Kept dumb (no data fetching) so it's reusable from search results
 * later — see .cursor/rules/04-screens-ux.mdc ("keep rows scannable").
 */
function MovieListItem({ movie, onPress }: MovieListItemProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, 'w185');

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(movie)}>
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <Text style={styles.posterPlaceholderText}>No image</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>{formatReleaseDate(movie.release_date)}</Text>
        {movie.vote_average > 0 ? (
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingValue}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default MovieListItem;
