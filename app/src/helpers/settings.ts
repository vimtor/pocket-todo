import { auth, database, dateToTimestamp } from 'helpers'
import { SettingsEntity } from 'typings'

const prefers12Format = () => /AM|PM/.test(new Date().toLocaleString())

const getResetTime = () => {
  const resetTime = new Date()
  resetTime.setHours(0, 0, 0, 0)
  resetTime.setDate(resetTime.getDate() + 1)
  return dateToTimestamp(resetTime)
}

const getDefaultTheme = () => {
  const theme = localStorage.getItem('theme')

  if (theme) {
    return theme as 'light' | 'dark'
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

export const getDefaultSettings = (): SettingsEntity => ({
  theme: getDefaultTheme(),
  language: navigator.language || 'en-US',
  timeFormat: prefers12Format() ? '12' : '24',
  resetTime: getResetTime(),
})

export const createInitialSettings = () => {
  const user = auth.currentUser.uid
  const settings = getDefaultSettings()

  database
    .collection('users')
    .doc(user)
    .set({ settings })
    .then(() => {
      localStorage.setItem('theme', settings.theme)
    })
}
