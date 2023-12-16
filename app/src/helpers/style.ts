import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'
import { Color, Theme, Weight } from 'typings'

export { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

export const { default: styled, css, createGlobalStyle, keyframes } = styledComponents as ThemedStyledComponentsModule<
  Theme
>

export const color = (c: Color) => ({ theme }: { theme: Theme }) => `color: ${theme.colors[c]}`
export const background = (c: Color) => ({ theme }: { theme: Theme }) => `background-color: ${theme.colors[c]}`
export const weight = (w: Weight) => ({ theme }: { theme: Theme }) => `font-weight: ${theme.weights[w]}`
export const gap = (x = 0, y = 0) =>
  css`
    display: grid;
    row-gap: ${y}px;
    column-gap: ${x}px;
  `
