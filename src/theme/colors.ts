export const colors = {
  primary: '#2563EB',
  secondary: '#7C3AED',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
} as const;

export type ColorKey = keyof typeof colors;
