import { styled } from 'helpers'

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => {
    const { mode, colors } = theme
    return mode === 'light' ? colors.gray200 : colors.gray100
  }};

  &::-webkit-scrollbar {
    display: none;
  }
`
