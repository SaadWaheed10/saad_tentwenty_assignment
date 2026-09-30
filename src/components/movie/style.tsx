import { StyleSheet } from 'react-native';
import { colors, radii, typography } from '@theme/index';

// Measured from Figma frame 42:13911 ("Watch"): 335×180 cards on a 375-wide
// screen (20px margin each side), 20px gap between cards, 10px radius,
// 70px-tall title scrim, ~20px text inset. These are deliberately hardcoded
// (not theme spacing tokens) because they're specific to this exact card,
// not a reused scale value.
const CARD_MARGIN_HORIZONTAL = 20;
const CARD_HEIGHT = 180;
const CARD_GAP = 20;
const SCRIM_HEIGHT = 70;
const TEXT_INSET = 20;

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: CARD_MARGIN_HORIZONTAL,
    marginBottom: CARD_GAP,
    height: CARD_HEIGHT,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.surfaceMuted,
  },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCRIM_HEIGHT,
    backgroundColor: colors.overlayDark,
    borderBottomLeftRadius: radii.md,
    borderBottomRightRadius: radii.md,
    justifyContent: 'flex-end',
    paddingHorizontal: TEXT_INSET,
    paddingBottom: TEXT_INSET,
  },
  title: {
    ...typography.cardTitle,
    color: colors.white,
  },
});
