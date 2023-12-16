import { FC, useEffect } from 'react'
import { analytics } from 'helpers'
import { useRouter } from 'hooks'

export const Analytics: FC = () => {
  const { listen } = useRouter()

  useEffect(() => {
    listen(({ pathname }) => {
      if (!pathname) return

      analytics.setCurrentScreen(pathname)
      // eslint-disable-next-line @typescript-eslint/camelcase
      analytics.logEvent('screen_view', { app_name: 'pocket-todo', screen_name: pathname })
    })
  }, [listen])

  return null
}
