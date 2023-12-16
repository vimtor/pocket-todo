/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/performance'
import 'firebase/firestore'

const isProduction = process.env.NODE_ENV === 'production'

firebase.initializeApp({
  apiKey: 'AIzaSyDI8PiQWzzDPKxRJ5NDr8yD5rEHXJejNOI',
  authDomain: 'pocket-todo.firebaseapp.com',
  databaseURL: 'https://pocket-todo.firebaseio.com',
  projectId: 'pocket-todo',
  storageBucket: 'pocket-todo.appspot.com',
  messagingSenderId: '637402866890',
  appId: '1:637402866890:web:1013b20a371c2e091c4033',
  measurementId: 'G-HGHVMZKPMT',
})

firebase
  .firestore()
  .enablePersistence()
  .catch(err => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

export const performance = firebase.performance()
export const analytics = firebase.analytics()
export const auth = firebase.auth()
export const database = firebase.firestore()

export const { GoogleAuthProvider } = firebase.auth

analytics.setAnalyticsCollectionEnabled(isProduction)
performance.dataCollectionEnabled = isProduction
performance.instrumentationEnabled = isProduction
