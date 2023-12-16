import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Plugins } from '@capacitor/core'
import { Analytics, Providers, Route } from 'components'
import { Archived, Create, Edit, Home, Login, Schedule, Settings, Today } from 'pages'

export const App = () => {
  const { SplashScreen } = Plugins

  useEffect(() => {
    SplashScreen.hide()
  }, [SplashScreen])

  return (
    <Providers>
      <Analytics />
      <Route component={Home} path="/" />
      <Route component={Login} path="/login" />
      <Route protect component={Schedule} path="/schedule" />
      <Route protect component={Today} path="/today" />
      <Route protect component={Archived} path="/archived" />
      <Route protect component={Create} path="/create" />
      <Route protect component={Settings} path="/settings" />
      <Route protect component={Edit} path="/edit/:id" />
    </Providers>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
