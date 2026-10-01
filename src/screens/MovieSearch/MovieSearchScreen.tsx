import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState, ErrorView, LoadingView, MovieListItem } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { useSearchMoviesQuery } from '@store/api/moviesApi';
import { useDebouncedValue } from '@hooks/index';
import type { TmdbMovie } from '@app-types/tmdb';
import searchIconSource from '@assets/icons/search.png';
import { colors } from '@theme/index';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieSearch'>;

const SEARCH_DEBOUNCE_MS = 400;

/**
 * Screen 03 — Movie search (`GET /3/search/movie`).
 *
 * Freshness guarantee (.cursor/rules/04-screens-ux.mdc, non-negotiable):
 * results on screen must always match the CURRENT query. We debounce the
 * raw keystrokes into `committedQuery` and pass THAT as the RTK Query hook
 * arg — RTK Query caches/selects strictly per-arg, so switching the arg
 * (a new query) can never show a previous query's `data`, regardless of
 * which request resolves first on the wire. No manual AbortController /
 * race-tracking needed; it falls out of using the hook arg correctly.
 *
 * Distinguishes idle / typing (debounce pending) / loading / no-results /
 * error / content, per the same rule file.
 */
function MovieSearchScreen({ navigation }: Props) {
  const [inputValue, setInputValue] = useState('');
  const committedQuery = useDebouncedValue(inputValue.trim(), SEARCH_DEBOUNCE_MS);

  // The debounce for the latest keystroke hasn't committed yet — avoid
  // rendering anything tied to an older committed query underneath it.
  const isDebouncePending = inputValue.trim() !== committedQuery;

  const { data, isFetching, isError, refetch } = useSearchMoviesQuery(committedQuery, {
    skip: committedQuery.length === 0,
  });

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
    content = (
      <EmptyState
        title="Search for a movie"
        description={'Try a title like "Resident Evil" or "Coyote vs. Acme".'}
      />
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
        renderItem={({ item }) => <MovieListItem movie={item} onPress={handleOpenMovie} />}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
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
