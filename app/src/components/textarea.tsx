import React, { useState } from 'react'
import { background, capitalize, color, styled } from 'helpers'
import { Color, Rules } from 'typings'
import { Error } from 'components'
import { useField } from 'hooks'

type ContainerProps = {
  outline: Color
}

type TextAreaProps = {
  name: string
  placeholder?: string
  rules?: Rules
  rows?: number
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

const BaseTextArea = styled.textarea`
  outline: none;
  border: none;
  font-size: 1rem;
  width: 95%;
  resize: none;
  ${color('gray900')};
  ${background('white')};

  &::placeholder {
    ${color('gray500')};
  }
`

export const TextArea: React.FC<TextAreaProps> = ({ name, placeholder, rules = {}, rows = 8 }) => {
  const [focused, setFocused] = useState(false)
  const { register, errors } = useField()

  const { message: error, ref: field } = errors[name] || { message: null, ref: null }
  const outlineColor = (error && 'red500') || (focused ? 'blue500' : 'gray400')

  return (
    <Container outline={outlineColor}>
      <BaseTextArea
        ref={register(rules)}
        name={name}
        placeholder={placeholder || capitalize(name)}
        rows={rows}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      <Error visible={!focused} onClick={() => field.focus()}>
        {error}
      </Error>
    </Container>
  )
}
