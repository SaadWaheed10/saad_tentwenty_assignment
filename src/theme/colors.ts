/**
 * Colors sourced from the Figma file "Tentwenty : App Test"
 * (fileKey 4e1pQ2l0VkLNgnaV7xNlFW, node 21:234) via the Figma MCP server.
 */
export const colors = {
  // Core
  background: '#FFFFFF',
  surface: '#F6F6FA',
  surfaceMuted: '#EFEFEF',
  text: '#202C43',
  textMuted: '#8F8F8F',
  textOnDark: '#FFFFFF',
  border: '#DBDBDF',
  white: '#FFFFFF',
  black: '#000000',

  // Accent / brand (from Figma palette)
  primary: '#61C3F2',
  secondaryCompleted: '#15D2BC',
  secondaryPink: '#E26CA5',
  secondaryPurple: '#564CA3',
  secondaryGold: '#CD9D0F',

  // States
  error: '#DC2626',
  success: '#15D2BC',
  warning: '#CD9D0F',

  // Misc grays used across cards/overlays in the design
  grayDark: '#50555C',
  grayMid: '#ADB3BC',
  offWhite: '#FCFCFE',
  overlayDark: 'rgba(0, 0, 0, 0.5)',

  // Bottom tab bar (Figma "Watch" frame, node 42:13916) — sampled directly
  // from the exported PNG (docs/planning/figma-refs/bottom_bar.png) via
  // pixel inspection, since the Figma data API was rate-limited when this
  // was built. The focused tab's icon reuses this same background color on
  // a white badge (a "cutout" effect), rather than a separate accent color.
  tabBarBackground: '#2E2739',
  tabBarInactive: '#9F9CA4',
} as const;

export type ColorKey = keyof typeof colors;
