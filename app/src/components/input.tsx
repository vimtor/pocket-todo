import React, { useState } from 'react'
import { background, capitalize, color, styled } from 'helpers'
import { Color, IconName, Rules } from 'typings'
import { Icon, Error } from 'components'
import { useField } from 'hooks'

type ContainerProps = {
  outline: Color
}

type InputProps = {
  name: string
  placeholder?: string
  icon?: IconName
  rules?: Rules
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ outline, theme }) => theme.colors[outline]};
  transition: border 150ms ease-in-out;
  justify-content: space-between;
  ${background('white')};
`

const BaseInput = styled.input`
  outline: none;
  border: none;
  font-size: 1rem;
  width: 90%;
  ${color('gray900')};
  ${background('white')};

  &::placeholder {
    ${color('gray500')};
  }
`

export const Input: React.FC<InputProps> = ({ name, placeholder, icon, rules = {} }) => {
  const [focused, setFocused] = useState(false)
  const { register, errors } = useField()

  const { message: error, ref: field } = errors[name] || { message: null, ref: null }
  const outlineColor = (error && 'red500') || (focused ? 'blue500' : 'gray400')

  return (
    <Container outline={outlineColor as Color}>
      <BaseInput
        ref={register(rules)}
        autoComplete="off"
        name={name}
        placeholder={placeholder || capitalize(name)}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      <Error visible={!focused} onClick={() => field.focus()}>
        {error}
      </Error>
      {icon && <Icon color={outlineColor as Color} name={icon} />}
    </Container>
  )
}
