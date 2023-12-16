import { LIGHT_THEME } from 'lookups'

export type Theme = typeof LIGHT_THEME
export type Color = keyof typeof LIGHT_THEME.colors
export type Weight = keyof typeof LIGHT_THEME.weights
export type Shadow = keyof typeof LIGHT_THEME.shadows
