export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
  MovieSearch: undefined;
  SeatMapping: { movieId: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
