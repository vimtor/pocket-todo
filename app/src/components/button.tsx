import React, { FC, SyntheticEvent } from 'react'
import { css, motion, styled } from 'helpers'
import { Color, IconName } from 'typings'
import { Icon } from 'components'

type ButtonProps = {
  children?: any
  icon?: IconName
  variant?: 'primary' | 'secondary' | 'tertiary'
  color?: Color
  type?: 'button' | 'submit'
  onClick?: (e: SyntheticEvent) => void
}

const BaseButton = styled(motion.button)<ButtonProps>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  border: 1px solid ${({ theme, color }) => theme.colors[color]};
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 10px 0;
  width: 100%;
  color: ${({ theme }) => (theme.mode === 'light' ? theme.colors.white : theme.colors.gray900)};

  &:focus {
    outline: none;
  }

  ${({ icon }) =>
    icon &&
    css`
      & > *:first-child {
        margin-right: 8px;
      }
    `}

  ${({ theme, color, variant }) =>
    variant === 'secondary' &&
    css`
      color: ${theme.colors[color]};
      background-color: ${theme.mode === 'light' ? theme.colors.white : theme.colors.gray800};
    `}
    
    ${({ theme, color, variant }) =>
    variant === 'tertiary' &&
    css`
      color: ${theme.colors[color]};
      background-color: transparent;
      border-color: transparent;
    `}
`

export const Button: FC<ButtonProps> = ({ children, icon, variant = 'primary', color = 'blue500', ...props }) => (
  <BaseButton color={color} icon={icon} type="button" variant={variant} whileTap={{ scale: 0.975 }} {...props}>
    {icon && <Icon color={variant === 'primary' ? 'trueWhite' : color} name={icon} />}
    {children}
  </BaseButton>
)
