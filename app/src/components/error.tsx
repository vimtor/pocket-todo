import React, { FC, ReactNode, SyntheticEvent } from 'react'
import { background, color, motion, styled, weight } from 'helpers'

type ErrorProps = {
  children: ReactNode
  visible?: boolean
  onClick?: (event: SyntheticEvent) => void
  className?: string
}

const Container = styled(motion.span)`
  font-size: 1rem;
  position: absolute;
  white-space: pre-wrap;
  width: calc(100% - 32px);
  height: calc(100% - 20px);
  text-align: center;
  ${background('white')};
  ${color('red500')};
  ${weight('regular')};
`

export const Error: FC<ErrorProps> = ({ children, visible = false, onClick, className }) =>
  visible &&
  children && (
    <Container
      animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
      className={className}
      initial={{ opacity: 0, y: 5 }}
      onClick={onClick}
    >
      {children}
    </Container>
  )
