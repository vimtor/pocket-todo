import React, { FC, ReactNode, createContext, useContext, useEffect } from 'react'
import { database, createInitialSettings, getDefaultSettings, analytics } from 'helpers'
import { SettingsEntity } from 'typings'
import { useAuth, useTheme } from 'hooks'

type SettingsContextProps = {
  updateSettings: (update: Partial<SettingsEntity>) => Promise<void>
} & SettingsEntity

type SettingsProviderProps = {
  children: ReactNode
}

const SettingsContext = createContext<SettingsContextProps>(null)

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const { logged, user } = useAuth()
  const { setTheme } = useTheme()

  useEffect(() => {
    if (user.settings && user.settings.theme) {
      setTheme(user.settings.theme as 'light' | 'dark')
    }
  }, [setTheme, user.settings])

  useEffect(() => {
    if (logged && !user.settings) {
      createInitialSettings()
    }
  }, [logged, user.settings])

  const updateSettings = async (update: Partial<SettingsEntity>) => {
    await database.collection('users').doc(user.id).set({ settings: update }, { merge: true })
    analytics.logEvent('settings_update', update)

    if (update.theme) {
      localStorage.setItem('theme', update.theme)
    }
  }

  return (
    <SettingsContext.Provider value={{ ...(user.settings || getDefaultSettings()), updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings hook must be used within SettingsProvider')
  }

  return context
}
