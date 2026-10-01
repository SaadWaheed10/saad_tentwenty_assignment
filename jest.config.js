module.exports = {
  preset: '@react-native/jest-preset',
  // .kilo/ is an unrelated tool's git worktree that happens to live inside
  // this workspace folder (globally gitignored, not part of this repo) —
  // exclude it so its duplicate package.json doesn't trip haste's module
  // naming collision check.
  modulePathIgnorePatterns: ['<rootDir>/.kilo/'],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest',
  },
  transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@react-native-async-storage|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-webview|react-redux|redux-persist|immer|@reduxjs)/)',
  ],
};
