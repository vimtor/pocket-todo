import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links'
import { analytics, database, auth, deleteAccount, login, logout, signInWithEmailRedirect, getPlatform } from 'helpers'
import { UserEntity } from 'typings'

const INITIAL_STATE: AuthState = { logged: false, loading: true, user: { id: null } }

type AuthState = {
  user?: Partial<UserEntity>
  logged?: boolean
  loading?: boolean
}

type AuthContextProps = {
  login?: (provider: 'email' | 'google', email?: string) => Promise<void>
  logout?: (path?: string) => Promise<void>
  deleteAccount?: () => Promise<void>
} & AuthState

type AuthProviderProps = {
  children: any
}

const AuthContext = createContext<AuthContextProps>({})

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [{ user, logged, loading }, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    if (getPlatform() === 'desktop') {
      signInWithEmailRedirect(window.location.href)
    } else if (getPlatform() === 'android') {
      FirebaseDynamicLinks.onDynamicLink().subscribe((res: any) => {
        signInWithEmailRedirect(res.deepLink)
      })
    }
  }, [])

  useEffect(
    () =>
      auth.onAuthStateChanged(async response => {
        if (!response) {
          setState({ user: { id: null }, logged: false, loading: false })
          return
        }

        analytics.setUserId(response.uid)

        const method = localStorage.getItem('signInMethod')
        if (method) {
          const { lastSignInTime, creationTime } = response.metadata
          const firstLogin = lastSignInTime === creationTime

          if (firstLogin) {
            analytics.logEvent('sign_up', { method })
          } else {
            analytics.logEvent('login', { method })
          }

          localStorage.removeItem('signInMethod')
        }

        database
          .collection('users')
          .doc(response.uid)
          .get()
          .then(doc => {
            setState({
              user: { id: doc.id, ...doc.data() } as UserEntity,
              logged: true,
              loading: false,
            })
          })
      }),
    []
  )

  useEffect(() => {
    if (!logged) return

    return database
      .collection('users')
      .doc(auth.currentUser.uid)
      .onSnapshot(doc => {
        setState({
          user: { id: doc.id, ...doc.data() } as UserEntity,
          logged: true,
          loading: false,
        })
      })
  }, [logged])

  return (
    <AuthContext.Provider value={{ login, logout, deleteAccount, user, logged, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth hook must be used within AuthProvider')
  }

  return context
}
