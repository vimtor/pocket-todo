import React from 'react'
import { styled } from 'helpers'
import { ROUTES } from 'lookups'
import { Icon } from 'components'
import { useRouter } from 'hooks'

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  column-gap: 40px;
  padding: 14px 28px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.08);
  z-index: 2;
`

export const Navbar = () => {
  const { pathname, navigate } = useRouter()

  return (
    <Container>
      {Object.entries(ROUTES).map(([path, { icon }]) => {
        const match = pathname === path

        return (
          <Icon
            key={path}
            color={match ? 'gray700' : 'gray500'}
            filled={match}
            name={icon}
            onClick={() => navigate(path)}
          />
        )
      })}
    </Container>
  )
}
