import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTmdbImageUrl } from '@api/tmdbImage';
import { EmptyState, ErrorView, LoadingView } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import {
  useGetGenresQuery,
  useGetUpcomingMoviesInfiniteQuery,
  useSearchMoviesQuery,
} from '@store/api/moviesApi';
import { useDebouncedValue } from '@hooks/index';
import type { TmdbGenre, TmdbMovie } from '@app-types/tmdb';
import searchIconSource from '@assets/icons/search.png';
import { colors } from '@theme/index';
import GenreTile from './GenreTile';
import SearchResultRow from './SearchResultRow';
import { styles } from './style';

// A curated subset of real TMDb genres (not every TMDb genre is visually
// interesting as a browse tile, e.g. "TV Movie"/"War"). Figma's idle-state
// grid has a "Holidays" tile, which isn't an actual TMDb genre — "Mystery"
// stands in for it here since this grid is built from real genre/movie
// data, not hand-picked art.
const IDLE_GENRE_NAMES = [
  'Comedy',
  'Crime',
  'Family',
  'Documentary',
  'Drama',
  'Fantasy',
  'Mystery',
  'Horror',
  'Science Fiction',
  'Thriller',
];

type Props = NativeStackScreenProps<RootStackParamList, 'MovieSearch'>;

const SEARCH_DEBOUNCE_MS = 400;

/**
 * Screen 03 — Movie search (`GET /3/search/movie`), row-list layout per the
 * Figma search frame (thumbnail + title + genre subtitle + trailing glyph,
 * not the Movie List's full-width backdrop card).
 *
 * Idle state (nothing typed yet) shows a 2-column genre browse grid, per
 * Figma. Tile images are derived from the already-cached upcoming-movies
 * list (first cached movie matching each genre's id) rather than issuing
 * a separate `/discover/movie` call per tile — reuses a cache we already
 * have, no extra network cost. Tiles are decorative (not tappable): tapping
 * "Horror" into the title-only `/search/movie` endpoint wouldn't actually
 * surface horror movies (it searches titles, not genres), so making tiles
 * look actionable would be misleading.
 *
 * Figma's search flow has one more step this screen intentionally skips:
 * submitting a query swaps the search bar for a "N Results Found" header
 * on a second page. That submit-based flow works against "feel immediate"
 * / live results as you type, so this screen keeps a single,
 * always-editable search bar with live results instead.
 *
 * Freshness guarantee (.cursor/rules/04-screens-ux.mdc, non-negotiable):
 * results on screen must always match the CURRENT query. We debounce the
 * raw keystrokes into `committedQuery` and pass THAT as the RTK Query hook
 * arg — RTK Query caches/selects strictly per-arg, so switching the arg
 * (a new query) can never show a previous query's `data`, regardless of
 * which request resolves first on the wire. No manual AbortController /
 * race-tracking needed; it falls out of using the hook arg correctly.
 */
function MovieSearchScreen({ navigation }: Props) {
  // No header on this screen (see AppNavigator) — the search bar sits
  // directly under the status bar per Figma, so it needs its own top
  // safe-area padding that a header would otherwise have provided.
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState('');
  const committedQuery = useDebouncedValue(inputValue.trim(), SEARCH_DEBOUNCE_MS);

  // The debounce for the latest keystroke hasn't committed yet — avoid
  // rendering anything tied to an older committed query underneath it.
  const isDebouncePending = inputValue.trim() !== committedQuery;

  const { data, isFetching, isError, refetch } = useSearchMoviesQuery(committedQuery, {
    skip: committedQuery.length === 0,
  });

  // Genre names for the result rows' subtitles, and for the idle-state
  // browse grid below — a small, static, unparameterised lookup fetched
  // once and cached indefinitely.
  const { data: genresData } = useGetGenresQuery();
  const genreNameById = useMemo(() => {
    const map = new Map<number, string>();
    genresData?.genres.forEach(genre => map.set(genre.id, genre.name));
    return map;
  }, [genresData]);

  // Same cached query Screen 01 (Movie List) uses — subscribing to it here
  // does not trigger a second network request if it's already fetched.
  const { data: upcomingData } = useGetUpcomingMoviesInfiniteQuery();
  const upcomingMovies = useMemo<TmdbMovie[]>(
    () => upcomingData?.pages.flatMap(page => page.results) ?? [],
    [upcomingData],
  );

  const genreTiles = useMemo(() => {
    if (!genresData) {
      return [];
    }
    return IDLE_GENRE_NAMES.map(name =>
      genresData.genres.find((genre: TmdbGenre) => genre.name === name),
    )
      .filter((genre): genre is TmdbGenre => Boolean(genre))
      .map(genre => {
        const representativeMovie = upcomingMovies.find(
          movie => movie.genre_ids.includes(genre.id) && movie.backdrop_path,
        );
        return {
          id: genre.id,
          label: genre.name === 'Science Fiction' ? 'Sci-Fi' : genre.name,
          imageUrl: representativeMovie
            ? getTmdbImageUrl(representativeMovie.backdrop_path, 'w342')
            : null,
        };
      });
  }, [genresData, upcomingMovies]);

  const results = useMemo<TmdbMovie[]>(() => data?.results ?? [], [data]);

  const handleOpenMovie = useCallback(
    (movie: TmdbMovie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  const handleClear = useCallback(() => setInputValue(''), []);

  let content: React.ReactNode;
  if (committedQuery.length === 0) {
    content = genresData ? (
      <ScrollView contentContainerStyle={styles.genreGrid} showsVerticalScrollIndicator={false}>
        {genreTiles.map(tile => (
          <GenreTile key={tile.id} label={tile.label} imageUrl={tile.imageUrl} />
        ))}
      </ScrollView>
    ) : (
      <LoadingView />
    );
  } else if (isDebouncePending || (isFetching && results.length === 0)) {
    content = <LoadingView message={`Searching "${committedQuery}"…`} />;
  } else if (isError) {
    content = (
      <ErrorView
        description="Could not search right now. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  } else if (results.length === 0) {
    content = (
      <EmptyState title="No results" description={`Nothing found for "${committedQuery}".`} />
    );
  } else {
    content = (
      <FlatList
        data={results}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <SearchResultRow
            movie={item}
            genreName={
              item.genre_ids.length > 0 ? genreNameById.get(item.genre_ids[0]) : undefined
            }
            onPress={handleOpenMovie}
          />
        )}
        ListHeaderComponent={<Text style={styles.sectionLabel}>Top Results</Text>}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, { marginTop: insets.top + 12 }]}>
        <Image source={searchIconSource} style={styles.searchIcon} resizeMode="contain" />
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Search movies"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          autoFocus
          returnKeyType="search"
          autoCorrect={false}
        />
        {inputValue.length > 0 ? (
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={8}
            accessibilityLabel="Clear search"
            accessibilityRole="button">
            <Text style={styles.clearGlyph}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.content}>{content}</View>
    </View>
  );
}

export default MovieSearchScreen;
