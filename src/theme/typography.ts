/**
 * Type scale sourced from the Figma file "Tentwenty : App Test".
 * Primary family is Poppins (Regular/Medium/SemiBold/Bold seen in the design).
 *
 * NOTE: Poppins font files are not bundled yet — `fontFamily` below will fall
 * back to the OS default until a follow-up slice adds the .ttf files under
 * `src/assets/fonts` and links them via `react-native.config.js`. Tracked in
 * docs/planning/01-bootstrap-and-navigation.md risks.
 */
const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const typography = {
  h1: { fontFamily: fontFamily.bold, fontSize: 22, fontWeight: '700' as const },
  h2: { fontFamily: fontFamily.semiBold, fontSize: 18, fontWeight: '600' as const },
  h3: { fontFamily: fontFamily.medium, fontSize: 16, fontWeight: '500' as const },
  body: { fontFamily: fontFamily.regular, fontSize: 14, fontWeight: '400' as const },
  caption: { fontFamily: fontFamily.regular, fontSize: 12, fontWeight: '400' as const },
  label: { fontFamily: fontFamily.medium, fontSize: 12, fontWeight: '500' as const },
  // Poppins Medium 18 — the movie-title-over-poster style seen on the
  // "Watch" frame (Figma node 42:13911). Distinct from h2 (SemiBold 18).
  cardTitle: { fontFamily: fontFamily.medium, fontSize: 18, fontWeight: '500' as const },
  // Poppins SemiBold ~24 — the large "Watch" screen-title header text on
  // the same frame. Visually larger/bolder than h1; a dedicated token
  // rather than reusing h1 since the two aren't actually the same size.
  screenTitle: { fontFamily: fontFamily.semiBold, fontSize: 24, fontWeight: '600' as const },
} as const;

export { fontFamily };
