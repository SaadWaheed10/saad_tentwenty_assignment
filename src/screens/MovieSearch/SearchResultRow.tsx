import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getTmdbImageUrl } from '@api/tmdbImage';
import type { TmdbMovie } from '@app-types/tmdb';
import { styles } from './style';

export type SearchResultRowProps = {
  movie: TmdbMovie;
  genreName?: string;
  onPress: (movie: TmdbMovie) => void;
};

/**
 * Search result row — thumbnail + title + genre subtitle, matching the
 * Figma search frame's list layout (not the Movie List's full-width
 * backdrop card; search results are a denser row list).
 */
function SearchResultRow({ movie, genreName, onPress }: SearchResultRowProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, 'w185');

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => onPress(movie)}>
      {posterUrl ? (
        <Image source={{ uri: posterUrl }} style={styles.rowThumb} resizeMode="cover" />
      ) : (
        <View style={[styles.rowThumb, styles.rowThumbPlaceholder]} />
      )}
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {movie.title}
        </Text>
        {genreName ? (
          <Text style={styles.rowSubtitle} numberOfLines={1}>
            {genreName}
          </Text>
        ) : null}
      </View>
      {/* Purely decorative — matches the Figma row's trailing "more" glyph.
          No overflow menu exists in this assignment's scope. */}
      <Text style={styles.rowMore}>⋮</Text>
    </TouchableOpacity>
  );
}

export default SearchResultRow;
