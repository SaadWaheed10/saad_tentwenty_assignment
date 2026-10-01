module.exports = {
  preset: '@react-native/jest-preset',
  // Behaviour tests from .cursor/rules/05-testing.mdc are deferred by
  // human direction (2026-10-01); keep Jest wired so they can be added
  // later without re-scaffolding. passWithNoTests avoids a red suite while
  // empty.
  passWithNoTests: true,
  // .kilo/ is an unrelated tool's git worktree that happens to live inside
  // this workspace folder (globally gitignored, not part of this repo).
  modulePathIgnorePatterns: ['<rootDir>/.kilo/'],
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-async-storage|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-webview|react-redux|redux-persist|immer|@reduxjs)/)',
  ],
};
