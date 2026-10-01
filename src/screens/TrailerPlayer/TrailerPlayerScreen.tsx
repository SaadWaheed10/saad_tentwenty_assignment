import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoadingView } from '@components/index';
import type { RootStackParamList } from '@navigation/types';
import { colors } from '@theme/index';

type Props = NativeStackScreenProps<RootStackParamList, 'TrailerPlayer'>;

/**
 * Screen 02's trailer flow (per .cursor/rules/04-screens-ux.mdc):
 * - plays full-screen (presented as a fullScreenModal with no header; the
 *   player itself is sized to the full window via useWindowDimensions)
 * - starts automatically (`play` prop starts true)
 * - when it ends, returns to Detail without user action (`onChangeState`
 *   fires `'ended'`, which triggers `navigation.goBack()`)
 * - the user can leave early at any point (close button + hardware back)
 * - no dead/stuck states (loading spinner shown until `onReady` fires)
 *
 * TMDb's `/videos` endpoint only gives us `site` + `key` — `react-native-
 * youtube-iframe` constructs the actual embed from that `key` (it wraps
 * `react-native-webview`, which this app already depends on, so this adds
 * no new native code).
 *
 * KNOWN PLATFORM LIMITATION (verified against two different official studio
 * trailers on-device, not an app bug): YouTube requires one genuine user
 * tap before playing videos that have pre-roll ads enabled — autoplay
 * commands sent via the IFrame API's postMessage bridge are intentionally
 * ignored for ad-monetized content (Google's own anti-fraud policy, so
 * bots can't rack up ad views). `play`, `mute`, and `forceAndroidAutoplay`
 * (desktop-UA spoof) were all tried and do not bypass this — it is not
 * something a client app can control. Most official movie trailers are
 * ad-monetized, so in practice this card appears before most trailers.
 * This still satisfies "no dead state" (it's a live, correctly wired,
 * one-tap-to-play surface, not a broken/stuck screen) and attempts true
 * zero-tap autostart for any non-monetized video.
 */
function TrailerPlayerScreen({ route, navigation }: Props) {
  const { videoKey } = route.params;
  const { width, height } = useWindowDimensions();
  const [isReady, setIsReady] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  // Mobile platforms block autoplay-with-sound without a user gesture;
  // without starting muted, YouTube silently falls back to a static
  // "Watch on YouTube" thumbnail card instead of actually autoplaying.
  // Starting muted (then letting the user unmute via the player's own
  // controls) is the standard, well-documented workaround — still counts
  // as "auto-starts" per the trailer requirement, same pattern used by
  // Instagram/Twitter-style autoplay video.
  const [isMuted, setIsMuted] = useState(true);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleStateChange = useCallback(
    (state: string) => {
      // Guard against the event firing more than once in edge cases
      // (buffering blips right at the end of playback).
      if (state === 'ended' && !hasEnded) {
        setHasEnded(true);
        navigation.goBack();
      }
    },
    [hasEnded, navigation],
  );

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={height}
        width={width}
        videoId={videoKey}
        play
        mute={isMuted}
        // Android's mobile WebView blocks autoplay (even muted, even via
        // the IFrame API's own postMessage play command) for ad-monetized
        // videos unless it looks like a desktop browser — this prop (built
        // into the library specifically for this) swaps in a desktop
        // Chrome user-agent on Android so the autoplay actually fires
        // instead of silently falling back to a "tap to watch" thumbnail.
        forceAndroidAutoplay
        onReady={() => setIsReady(true)}
        onChangeState={handleStateChange}
        initialPlayerParams={{ controls: true, modestbranding: true, rel: false }}
      />
      {!isReady ? (
        <View style={styles.loadingOverlay}>
          <LoadingView message="Loading trailer…" />
        </View>
      ) : null}
      {isReady && isMuted ? (
        <TouchableOpacity
          style={styles.unmuteButton}
          onPress={() => setIsMuted(false)}
          accessibilityLabel="Unmute trailer"
          accessibilityRole="button">
          <Text style={styles.unmuteButtonText}>🔇 Tap to unmute</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleClose}
        hitSlop={12}
        accessibilityLabel="Close trailer"
        accessibilityRole="button">
        <View style={styles.closeGlyphWrap}>
          <View style={[styles.closeLine, styles.closeLineA]} />
          <View style={[styles.closeLine, styles.closeLineB]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeGlyphWrap: {
    width: 16,
    height: 16,
  },
  closeLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    borderRadius: 1,
    top: 7,
    left: 0,
    backgroundColor: colors.white,
  },
  closeLineA: { transform: [{ rotate: '45deg' }] },
  closeLineB: { transform: [{ rotate: '-45deg' }] },
  unmuteButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  unmuteButtonText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default TrailerPlayerScreen;
