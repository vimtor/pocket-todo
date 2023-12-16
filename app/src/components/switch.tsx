import React, { FC } from 'react'
import { styled } from 'helpers'

type CheckProps = {
  checked: boolean
}

type SwitchProps = {
  value: boolean
  onChange: (status: boolean) => void
}

const Container = styled.label<CheckProps>`
  display: inline-block;
  position: relative;
  width: 38px;
  height: 20px;
  border-radius: 16px;
  cursor: pointer;
  background-color: ${({ theme, checked }) => theme.colors[checked ? 'blue900' : 'gray400']};
`

const Slider = styled.span<CheckProps>`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 2px;
  bottom: 2px;
  border-radius: 50%;
  box-shadow: 0 3px 5px rgba(26, 26, 26, 0.14);
  cursor: pointer;
  transition: all 200ms ease-out;
  background-color: ${({ theme }) => (theme.mode === 'light' ? theme.colors.white : theme.colors.gray800)};
  transform: translateX(${({ checked }) => (checked ? 18 : 0)}px);
`

export const Switch: FC<SwitchProps> = Props => {
  const { value, onChange } = Props

  const handleChange = () => {
    onChange(!value)
  }

  return (
    <Container aria-checked={value} checked={value} role="switch" onClick={handleChange}>
      <Slider checked={value} />
    </Container>
  )
}
