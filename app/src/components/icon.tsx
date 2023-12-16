import React, { FC, SyntheticEvent } from 'react'
import { IconName, Color } from 'typings'
import { PATHS } from 'lookups'
import { useTheme } from 'hooks'

type IconProps = {
  name: IconName
  size?: number
  filled?: boolean
  color: Color
  onClick?: (e: SyntheticEvent) => void
  className?: string
}

type ContainerProps = {
  children?: any
  size?: number
  onClick?: (e: SyntheticEvent) => void
  className?: string
}

type PathProps = {
  path: string
  color: Color
}

const Container: FC<ContainerProps> = ({ children, size, onClick, className }) => (
  <svg
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    {children}
  </svg>
)

const OutlinePath: FC<PathProps> = ({ path, color }) => (
  <path d={path} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
)

const FilledPath: FC<PathProps> = ({ path, color }) => (
  <path clipRule="evenodd" d={path} fill={color} fillRule="evenodd" />
)

const SimplePath: FC<PathProps> = ({ path, color }) => <path d={path} fill={color} />

export const Icon: FC<IconProps> = ({ name, color, filled = false, size = 24, ...props }) => {
  const { colors } = useTheme()
  const path = PATHS[name]

  if (typeof path === 'string') {
    return (
      <Container size={size} {...props}>
        <SimplePath color={colors[color] as Color} path={path} />
      </Container>
    )
  }

  return (
    <Container size={size} {...props}>
      {filled ? (
        <FilledPath color={colors[color] as Color} path={(path as any).filled} />
      ) : (
        <OutlinePath color={colors[color] as Color} path={(path as any).outline} />
      )}
    </Container>
  )
}
