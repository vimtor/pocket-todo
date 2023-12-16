import { database, functions } from 'helpers'

export const settingsCreate = functions
  .region('europe-west3')
  .runWith({ memory: '128MB', timeoutSeconds: 10 })
  .firestore.document('/users/{userId}')
  .onCreate(async snapshot => {
    const { resetTime } = snapshot.data().settings
    const userId = snapshot.id
    const job = { name: 'reschedule', user: userId, date: resetTime }
    return database.collection('jobs').add(job)
  })
