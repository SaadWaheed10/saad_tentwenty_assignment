/**
 * task
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from '@navigation/index';
import { StoreProvider } from '@store/index';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
}

export default App;
