export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Card corner radius seen throughout the Figma file (movie posters, tags).
export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 30,
} as const;

export type SpacingKey = keyof typeof spacing;
