import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@theme/index';

/**
 * Icon glyphs for the bottom tab bar (Figma "Watch" frame, node 42:13916).
 *
 * The bar's layout, colors, badge size, and corner radius below were
 * measured directly from the exported PNG
 * (docs/planning/figma-refs/bottom_bar.png) via pixel inspection — the
 * Figma data API (which would give exact vector paths) was rate-limited
 * for ~4.5 days when this was built, and extracting clean per-focus-state
 * raster assets from the single flattened export wasn't feasible without
 * introducing image-masking tooling.
 *
 * The icon *shapes* below are therefore vector reconstructions of the
 * Figma glyphs (grid / play / stack / list metaphors), not re-exported
 * pixels — flagged per AGENTS.md ("flag anything inferred rather than
 * measured"). Colors, the focused badge treatment (white squircle behind
 * the icon, icon recolored to the bar's own background — a "cutout" look,
 * confirmed by pixel sampling), and sizing are measured and exact.
 */

export const TAB_ICON_BADGE_SIZE = 36;
const BADGE_RADIUS = 10;
const GLYPH_SIZE = 18;

type TabIconProps = { focused: boolean };

function Badge({ children, focused }: { children: React.ReactNode; focused: boolean }) {
  if (!focused) {
    return <View style={styles.plainWrap}>{children}</View>;
  }
  return <View style={styles.badge}>{children}</View>;
}

function glyphColor(focused: boolean) {
  return focused ? colors.tabBarBackground : colors.tabBarInactive;
}

export function DashboardTabIcon({ focused }: TabIconProps) {
  const color = glyphColor(focused);
  return (
    <Badge focused={focused}>
      <View style={styles.dotGrid}>
        {[0, 1, 2, 3].map(i => (
          <View key={i} style={[styles.dot, { backgroundColor: color }]} />
        ))}
      </View>
    </Badge>
  );
}

export function WatchTabIcon({ focused }: TabIconProps) {
  const color = glyphColor(focused);
  return (
    <Badge focused={focused}>
      <Text style={[styles.glyphText, { color, fontSize: GLYPH_SIZE }]}>▶</Text>
    </Badge>
  );
}

export function MediaLibraryTabIcon({ focused }: TabIconProps) {
  const color = glyphColor(focused);
  return (
    <Badge focused={focused}>
      <View style={styles.stackWrap}>
        <View style={[styles.stackLayer, styles.stackLayerBack, { borderColor: color }]} />
        <View style={[styles.stackLayer, styles.stackLayerFront, { backgroundColor: color }]} />
      </View>
    </Badge>
  );
}

export function MoreTabIcon({ focused }: TabIconProps) {
  const color = glyphColor(focused);
  return (
    <Badge focused={focused}>
      <View style={styles.listWrap}>
        {[0, 1, 2].map(i => (
          <View key={i} style={styles.listRow}>
            <View style={[styles.listBullet, { backgroundColor: color }]} />
            <View style={[styles.listLine, { backgroundColor: color }]} />
          </View>
        ))}
      </View>
    </Badge>
  );
}

const styles = StyleSheet.create({
  plainWrap: {
    width: TAB_ICON_BADGE_SIZE,
    height: TAB_ICON_BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: TAB_ICON_BADGE_SIZE,
    height: TAB_ICON_BADGE_SIZE,
    borderRadius: BADGE_RADIUS,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: {
    includeFontPadding: false,
  },
  dotGrid: {
    width: GLYPH_SIZE,
    height: GLYPH_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  stackWrap: {
    width: GLYPH_SIZE,
    height: GLYPH_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stackLayer: {
    position: 'absolute',
    width: 13,
    height: 15,
    borderRadius: 3,
  },
  stackLayerBack: {
    borderWidth: 1.5,
    top: 0,
    left: 5,
  },
  stackLayerFront: {
    top: 3,
    left: 0,
  },
  listWrap: {
    width: GLYPH_SIZE,
    height: GLYPH_SIZE,
    justifyContent: 'space-between',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listBullet: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginRight: 3,
  },
  listLine: {
    flex: 1,
    height: 2,
    borderRadius: 1,
  },
});
