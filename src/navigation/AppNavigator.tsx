import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createBottomTabNavigator,
  type BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  DashboardTabIcon,
  HeaderSearchButton,
  MediaLibraryTabIcon,
  MoreTabIcon,
  TabBarLabel,
  WatchTabIcon,
} from '@components/index';
import MovieListScreen from '@screens/MovieList';
import MovieDetailScreen from '@screens/MovieDetail';
import MovieSearchScreen from '@screens/MovieSearch';
import SeatMappingScreen from '@screens/SeatMapping';
import TrailerPlayerScreen from '@screens/TrailerPlayer';
import {
  DashboardScreen,
  MediaLibraryScreen,
  MoreScreen,
} from '@screens/Placeholder';
import { colors, typography } from '@theme/index';
import { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

// Defined at module scope (not inside AppNavigator's render) so it's a
// stable component reference, not a new one created on every render — see
// react/no-unstable-nested-components.
//
// `navigation` here is the "Watch" tab's own navigation object, which is
// only typed for MainTabParamList — it has no static knowledge of
// 'MovieSearch' (a sibling of MainTabs in the *root* stack). `getParent`
// with an explicit type param is React Navigation's documented escape
// hatch for exactly this case, rather than an unsafe cast.
function WatchHeaderRight({ navigation }: { navigation: BottomTabNavigationProp<MainTabParamList, 'Watch'> }) {
  return (
    <HeaderSearchButton
      onPress={() => navigation.getParent<RootStackNavigation>()?.navigate('MovieSearch')}
    />
  );
}

// Stable, module-scope render functions for `tabBarIcon`/`tabBarLabel` —
// defined once, not recreated per MainTabs render, per
// react/no-unstable-nested-components.
function renderDashboardIcon({ focused }: { focused: boolean }) {
  return <DashboardTabIcon focused={focused} />;
}
function renderDashboardLabel({ focused }: { focused: boolean }) {
  return <TabBarLabel focused={focused}>Dashboard</TabBarLabel>;
}
function renderWatchIcon({ focused }: { focused: boolean }) {
  return <WatchTabIcon focused={focused} />;
}
function renderWatchLabel({ focused }: { focused: boolean }) {
  return <TabBarLabel focused={focused}>Watch</TabBarLabel>;
}
function renderMediaLibraryIcon({ focused }: { focused: boolean }) {
  return <MediaLibraryTabIcon focused={focused} />;
}
function renderMediaLibraryLabel({ focused }: { focused: boolean }) {
  return <TabBarLabel focused={focused}>Media Library</TabBarLabel>;
}
function renderMoreIcon({ focused }: { focused: boolean }) {
  return <MoreTabIcon focused={focused} />;
}
function renderMoreLabel({ focused }: { focused: boolean }) {
  return <TabBarLabel focused={focused}>More</TabBarLabel>;
}

const sharedHeaderOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  // Matches the Figma header treatment (frame 42:13911, "Watch"):
  // left-aligned, Poppins Medium 16 — not a bold centered title.
  headerTitleAlign: 'left' as const,
  headerTitleStyle: { ...typography.h3, color: colors.text },
};

/**
 * Bottom tab navigator — matches the Figma bottom bar (node 42:13916).
 * Only "Watch" maps to a real assignment screen (Movie List); the other
 * three are real, tappable tabs (per the "use the actual library"
 * direction) that render a neutral placeholder — see
 * screens/Placeholder/PlaceholderScreen.tsx for why they're not fully
 * built out.
 */
function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Watch"
      screenOptions={{
        ...sharedHeaderOptions,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          // 75pt content height (Figma node 42:13916) plus the device's
          // own safe-area/system-nav-bar inset — on 3-button Android nav,
          // omitting insets.bottom here clips the labels right at the
          // system bar.
          height: 75 + insets.bottom,
          paddingBottom: insets.bottom,
          borderTopWidth: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        },
        tabBarItemStyle: { paddingTop: 10 },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: renderDashboardIcon,
          tabBarLabel: renderDashboardLabel,
        }}
      />
      <Tab.Screen
        name="Watch"
        component={MovieListScreen}
        options={({ navigation }) => ({
          // Ditto copy of the Figma header text (frame 42:13911 literally
          // reads "Watch", not a separate invented title).
          title: 'Watch',
          headerTitleStyle: { ...typography.screenTitle, color: colors.text },
          // Figma's header has no divider/shadow beneath it — flush white.
          headerShadowVisible: false,
          tabBarIcon: renderWatchIcon,
          tabBarLabel: renderWatchLabel,
          // Matches the search icon in the Figma header (frame 42:13911).
          // `WatchHeaderRight` itself is a stable, module-scope component
          // (not defined inline), so this wrapper carries no remount risk
          // despite the lint rule's generic heuristic — React Navigation's
          // `headerRight` option is, by its own API contract, always
          // re-evaluated as a function per render.
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <WatchHeaderRight navigation={navigation} />,
        })}
      />
      <Tab.Screen
        name="MediaLibrary"
        component={MediaLibraryScreen}
        options={{
          title: 'Media Library',
          tabBarIcon: renderMediaLibraryIcon,
          tabBarLabel: renderMediaLibraryLabel,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarIcon: renderMoreIcon,
          tabBarLabel: renderMoreLabel,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={sharedHeaderOptions}>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            // Figma's detail frame (node 42:756) overlays a transparent
            // header directly on the backdrop image, with the back arrow
            // and "Watch" title in white — not a separate white bar.
            // `headerTransparent` alone isn't enough: the shared
            // `headerStyle.backgroundColor` from the Stack.Navigator's
            // screenOptions still gets merged in, painting an opaque white
            // bar (with invisible white-on-white text) unless explicitly
            // cleared here too.
            title: 'Watch',
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent' },
            headerTintColor: colors.white,
            headerTitleStyle: { ...typography.h3, color: colors.white },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="MovieSearch"
          component={MovieSearchScreen}
          // Figma's search frame has no header bar / back button at all —
          // the search pill itself sits directly under the status bar.
          // Dismissing relies on the hardware back button (Android) /
          // swipe-back gesture (iOS), both still work with headerShown
          // false on a pushed native-stack screen.
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeatMapping"
          component={SeatMappingScreen}
          options={{ title: 'Select Seats' }}
        />
        <Stack.Screen
          name="TrailerPlayer"
          component={TrailerPlayerScreen}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
