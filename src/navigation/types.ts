export type RootStackParamList = {
  Home: undefined;
  Details: { id?: string } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
