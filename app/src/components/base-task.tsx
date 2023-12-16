import React, { FC, SyntheticEvent } from 'react'
import { css, keyframes } from 'styled-components'
import { styled, color, background, weight } from 'helpers'
import { Color, TaskEntity, TaskStatus } from 'typings'
import { Icon as BaseIcon } from 'components'

type BaseTaskProps = {
  onCheck: (e: SyntheticEvent) => void
  onUncheck: (e: SyntheticEvent) => void
  completed?: boolean
} & TaskEntity

type TextProps = {
  completed?: boolean
  status?: TaskStatus
  baseColor?: Color
}

const expand = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

const strike = (strikeColor: string, direction: 'normal' | 'reverse') => css`
  color: ${strikeColor};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${strikeColor};
    animation: ${expand} 200ms ease-in forwards ${direction};
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Icon = styled(BaseIcon)`
  flex-shrink: 0;
`
const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  max-width: 85%;
  @media screen and (max-width: 400px) {
    max-width: 75%;
  }
`

const Text = styled.p<TextProps>`
  ${({ baseColor }) => color(baseColor)};
  display: inline-block;
  transition: color 100ms ease-in;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 75vw;

  ${({ status, completed, theme }) => {
    if (!completed) return ''

    const strikeColor = theme.colors[status === 'today' ? 'blue500' : 'gray300']
    const direction = status === 'today' ? 'normal' : 'reverse'
    return strike(strikeColor, direction)
  }};

  ${({ status, completed }) => {
    if (status === 'archived') {
      return css`
        ${color(completed ? 'gray900' : 'gray400')};

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          ${background('gray400')}
        }
      `
    }

    if (status === 'today' && completed) {
      return color('blue500')
    }
  }};
`

const Title = styled(Text).attrs({ baseColor: 'gray900' })`
  position: relative;
  font-size: 20px;
  line-height: 20px;
  ${weight('semibold')};
`

const Description = styled(Text).attrs({ baseColor: 'gray600' })`
  position: relative;
  font-size: 12px;
  line-height: 125%;
  margin-top: 4px;
  ${weight('light')};
`

export const BaseTask: FC<BaseTaskProps> = props => {
  const { title, description, status, completed, onCheck, onUncheck } = props

  return (
    <Container>
      {status === 'today' && (
        <Icon
          filled
          color={completed ? 'blue500' : 'gray300'}
          name={completed ? 'check' : 'uncheck'}
          size={44}
          onClick={onCheck}
        />
      )}
      {status === 'archived' && (
        <Icon filled color="gray300" name={completed ? 'uncheck' : 'check'} size={44} onClick={onUncheck} />
      )}
      <Info>
        <Title completed={completed} status={status}>
          {title}
        </Title>
        {description && (
          <Description completed={completed} status={status}>
            {description}
          </Description>
        )}
      </Info>
    </Container>
  )
}
