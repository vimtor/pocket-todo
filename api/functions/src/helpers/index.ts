import * as admin from 'firebase-admin'

admin.initializeApp()

export const database = admin.firestore()
export const timestamp = admin.firestore.Timestamp
export * as functions from 'firebase-functions'
