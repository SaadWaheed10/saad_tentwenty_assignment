import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  BOTTOM_TAB_BAR_HEIGHT,
  BottomTabBarVisual,
  EmptyState,
  ErrorView,
  LoadingView,
  MovieListItem,
} from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { useGetUpcomingMoviesInfiniteQuery } from '@store/api/moviesApi';
import { spacing } from '@theme/index';
import type { TmdbMovie } from '@app-types/tmdb';
import { styles } from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieList'>;

/**
 * Screen 01 — Movie list ("Watch" in Figma, frame 42:13911).
 *
 * `GET /3/movie/upcoming`, paginated via RTK Query's infinite-query support.
 * The RTK Query cache is persisted (see src/store/store.ts), so on relaunch
 * the last-seen page(s) render immediately — offline-first per
 * .cursor/rules/03-offline-data.mdc — while a background refetch (RTK
 * Query's refetchOnFocus/refetchOnReconnect, enabled via setupListeners)
 * brings it up to date when back online.
 *
 * The screen title lives in the native stack header (see AppNavigator),
 * matching Figma's single left-aligned header — no duplicate in-body title.
 */
function MovieListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUpcomingMoviesInfiniteQuery();

  const movies = useMemo<TmdbMovie[]>(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const handleOpenMovie = useCallback(
    (movie: TmdbMovie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // First load, nothing cached yet — full-screen loading state.
  if (isLoading && movies.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingView message="Loading upcoming movies…" />
        <BottomTabBarVisual />
      </View>
    );
  }

  // Failed and we have nothing cached to fall back to — full-screen error.
  if (isError && movies.length === 0) {
    return (
      <View style={styles.container}>
        <ErrorView description={describeError(error)} onRetry={refetch} />
        <BottomTabBarVisual />
      </View>
    );
  }

  // Succeeded but TMDb genuinely returned nothing.
  if (movies.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="No upcoming movies"
          description="TMDb has nothing scheduled right now — check back soon."
        />
        <BottomTabBarVisual />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isError ? (
        <View style={styles.staleBanner}>
          <Text style={styles.staleBannerText}>
            Showing saved results — couldn't refresh. Pull down to retry.
          </Text>
        </View>
      ) : null}
      <FlatList
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <MovieListItem movie={item} onPress={handleOpenMovie} />}
        contentContainerStyle={[
          styles.listContent,
          // Clears the floating tab bar, which itself sits above the
          // device's safe-area/system-nav-bar inset (BottomTabBarVisual).
          { paddingBottom: BOTTOM_TAB_BAR_HEIGHT + insets.bottom + spacing.lg },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isFetchingNextPage}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        ListFooterComponent={isFetchingNextPage ? <LoadingView /> : undefined}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
      />
      <BottomTabBarVisual />
    </View>
  );
}

function describeError(error: unknown): string {
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    (error as { status?: number }).status === undefined
  ) {
    return 'No internet connection. Check your network and try again.';
  }
  return 'Could not load upcoming movies. Please try again.';
}

export default MovieListScreen;
