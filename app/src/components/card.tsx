import { styled, css, motion } from 'helpers'
import { Color, Shadow } from 'typings'

type CardProps = {
  shadow?: Shadow
  color?: Color
}

export const Card = styled(motion.div)<CardProps>`
  border-radius: 24px;
  padding: 18px 16px;
  transition: box-shadow 250ms ease-in;
  ${({ theme, color, shadow }) => css`
    background: ${theme.colors[color || 'white']};
    box-shadow: ${theme.shadows[shadow || 'small']};
  `};
`
