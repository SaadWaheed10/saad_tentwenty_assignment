import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * The "Watch" tab hosts the real assignment screens (Movie List). The
 * other three tabs mirror the Figma bottom bar (node 42:13916) but are
 * out of this assignment's 4-screen scope — see PlaceholderScreen.
 */
export type MainTabParamList = {
  Dashboard: undefined;
  Watch: undefined;
  MediaLibrary: undefined;
  More: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  MovieDetail: { movieId: number };
  MovieSearch: undefined;
  SeatMapping: { movieId: number };
  TrailerPlayer: { videoKey: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
