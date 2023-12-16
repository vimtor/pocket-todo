import { auth, performance, GoogleAuthProvider, getPlatform, analytics } from 'helpers'
import { WEB_CLIENT_ID } from 'lookups'
import { GooglePlus } from 'plugins'

export const signInWithEmailRedirect = async (link: string) => {
  if (auth.isSignInWithEmailLink(link)) {
    const email = localStorage.getItem('emailSignIn')

    await auth.signInWithEmailLink(email, link)
    localStorage.removeItem('emailSignIn')
  }
}

export const login = async (provider: 'email' | 'google', email?: string) => {
  const trace = performance.trace('login')
  const platform = getPlatform()

  trace.putAttribute('provider', provider)
  trace.putAttribute('platform', platform)
  trace.start()

  try {
    switch (provider) {
      case 'email':
        localStorage.setItem('signInMethod', 'emailLink')
        localStorage.setItem('emailSignIn', email)
        await auth.sendSignInLinkToEmail(email, {
          url: window.location.href,
          handleCodeInApp: true,
          android: {
            packageName: 'com.pocket.todo',
            installApp: false,
            minimumVersion: '12',
          },
          dynamicLinkDomain: 'pockettodo.page.link',
        })
        break
      case 'google':
        localStorage.setItem('signInMethod', 'google.com')
        if (platform === 'desktop' || process.env.NODE_ENV === 'development') {
          const googleProvider = new GoogleAuthProvider()
          await auth.signInWithPopup(googleProvider)
        } else {
          const userInfo = await GooglePlus.login({ webClientId: WEB_CLIENT_ID, offline: true })
          const credential = GoogleAuthProvider.credential(userInfo.idToken)
          await auth.signInWithCredential(credential)
        }
        break
      default:
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Not supported login provider: ${provider}`)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    trace.putAttribute('error', error.toString())
    trace.stop()

    throw error
  }

  trace.stop()
}

export const logout = async () => {
  await auth.signOut()
  analytics.logEvent('logout')
}

export const deleteAccount = async () => {
  await auth.currentUser.delete()
  analytics.logEvent('account_delete')
}
