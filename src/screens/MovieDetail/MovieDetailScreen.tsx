import React, { useCallback, useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErrorView, LoadingView } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { getTmdbImageUrl } from '@api/index';
import { useGetMovieDetailQuery, useGetMovieVideosQuery } from '@store/index';
import { pickBestTrailer } from '@utils/trailer';
import { colors } from '@theme/index';
import type { TmdbGenre } from '@app-types/tmdb';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

const GENRE_CHIP_COLORS = [
  colors.secondaryCompleted,
  colors.secondaryPink,
  colors.secondaryPurple,
  colors.secondaryGold,
];

/**
 * Screen 02 — Movie detail (Figma frame 42:756).
 *
 * `GET /movie/{id}` + `/videos` (see store/api/moviesApi.ts), both cached
 * per movie id for offline-first revisits. "Get Tickets" leads to the
 * (UI-only) seat map — the only ticketing-adjacent flow this assignment
 * actually scopes; no real booking/purchase logic exists anywhere here.
 */
function MovieDetailScreen({ route, navigation }: Props) {
  const { movieId } = route.params;

  const detailQuery = useGetMovieDetailQuery(movieId);
  const videosQuery = useGetMovieVideosQuery(movieId);

  const trailer = useMemo(
    () => pickBestTrailer(videosQuery.data?.results),
    [videosQuery.data],
  );

  const handleWatchTrailer = useCallback(() => {
    if (trailer) {
      navigation.navigate('TrailerPlayer', { videoKey: trailer.key });
    }
  }, [navigation, trailer]);

  const handleGetTickets = useCallback(() => {
    navigation.navigate('SeatMapping', { movieId });
  }, [navigation, movieId]);

  const isLoading = detailQuery.isLoading && !detailQuery.data;
  const isError = detailQuery.isError && !detailQuery.data;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingView message="Loading movie…" />
      </View>
    );
  }

  if (isError || !detailQuery.data) {
    return (
      <View style={styles.container}>
        <ErrorView
          description="Could not load this movie. Please try again."
          onRetry={detailQuery.refetch}
        />
      </View>
    );
  }

  const movie = detailQuery.data;
  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, 'w780');
  const releaseLabel = formatReleaseLabel(movie.release_date);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.backdropWrap}>
        {backdropUrl ? (
          <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />
        ) : (
          <View style={[styles.backdrop, styles.backdropPlaceholder]} />
        )}
        <View style={styles.backdropScrim} />
        <View style={styles.backdropContent}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.titleDivider} />
          {releaseLabel ? <Text style={styles.releaseLabel}>{releaseLabel}</Text> : null}

          <TouchableOpacity
            style={styles.ticketsButton}
            onPress={handleGetTickets}
            accessibilityRole="button">
            <Text style={styles.ticketsButtonText}>Get Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.trailerButton, !trailer && styles.trailerButtonDisabled]}
            onPress={handleWatchTrailer}
            disabled={!trailer}
            accessibilityRole="button">
            <View style={styles.trailerPlayIcon} />
            <Text style={styles.trailerButtonText}>
              {trailer ? 'Watch Trailer' : 'Trailer unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {movie.genres.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreRow}>
            {movie.genres.map((genre: TmdbGenre, index: number) => (
              <View
                key={genre.id}
                style={[
                  styles.genreChip,
                  { backgroundColor: GENRE_CHIP_COLORS[index % GENRE_CHIP_COLORS.length] },
                ]}>
                <Text style={styles.genreChipText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>
          {movie.overview || 'No overview available for this movie yet.'}
        </Text>
      </View>
    </ScrollView>
  );
}

function formatReleaseLabel(releaseDate: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(releaseDate);
  if (!match) {
    return null;
  }
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [, year, month, day] = match;
  const monthName = months[Number(month) - 1];
  return `In Theaters ${monthName} ${Number(day)}, ${year}`;
}

export default MovieDetailScreen;
