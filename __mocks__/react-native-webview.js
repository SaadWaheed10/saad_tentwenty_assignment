// Manual Jest mock for react-native-webview — it's a native TurboModule
// with no JS-only implementation, so it can't run under Jest's Node
// environment. This mock is just enough for component trees that render a
// <WebView> (e.g. TrailerPlayerScreen) to mount in tests without crashing.
const React = require('react');
const { View } = require('react-native');

function WebView(props) {
  return React.createElement(View, { testID: 'mock-webview', ...props });
}

module.exports = { WebView };
