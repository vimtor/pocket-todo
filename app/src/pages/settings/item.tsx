import React, { FC } from 'react'
import { color, styled, weight } from 'helpers'

type ItemProps = {
  title: string
  icon?: any
  children?: any
  link?: string
  onClick?: () => void
}

const Container = styled.a`
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  ${weight('semibold')};
  ${color('gray900')};

  & > *:first-child {
    margin-right: 16px;
  }

  & > *:nth-child(2) {
    margin-left: auto;
  }
`

export const Item: FC<ItemProps> = ({ title, link, onClick, icon, children }) => (
  <Container href={link} onClick={onClick}>
    {icon}
    {title}
    {children}
  </Container>
)
