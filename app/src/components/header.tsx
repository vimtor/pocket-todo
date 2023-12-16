import { color, styled, weight } from 'helpers'

export const Header = styled.header`
  padding: 16px 0 12px;
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray300};
  margin-bottom: 24px;
  position: sticky;
  background-color: inherit;
  top: 0;
  z-index: 1;
  ${weight('semibold')};
  ${color('gray500')};
`
