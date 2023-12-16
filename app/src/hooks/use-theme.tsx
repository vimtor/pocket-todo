import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import * as styled from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'
import { createGlobalStyle } from 'helpers'
import { Theme } from 'typings'
import { LIGHT_THEME, DARK_THEME } from 'lookups'

type StyledModule = ThemedStyledComponentsModule<Theme>

type ThemeContextProps = {
  setTheme?: (theme: 'light' | 'dark') => void
}

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({})

const { ThemeProvider: BaseThemeProvider, useTheme: useBaseTheme } = styled as StyledModule

const GlobalStyle = createGlobalStyle`
  * {
    font-family: ${({ theme }) => theme.fonts.primary};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
  
  a {
    text-decoration: none;
  }
  
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <BaseThemeProvider theme={theme === 'light' ? LIGHT_THEME : DARK_THEME}>
        <GlobalStyle />
        {children}
      </BaseThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  const base = useBaseTheme()

  if (!context) {
    throw new Error('useTheme hook must be used within ThemeProvider')
  }

  return { ...context, ...base }
}
