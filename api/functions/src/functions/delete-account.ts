import { database, functions } from 'helpers'

export const deleteAccount = functions
  .region('europe-west3')
  .runWith({ memory: '256MB', timeoutSeconds: 20 })
  .auth.user()
  .onDelete(async user => {
    const batch = database.batch()

    const tasks = await database.collection('users').doc(user.uid).collection('tasks').get()
    const jobs = await database.collection('jobs').where('user', '==', user.uid).get()

    tasks.forEach(doc => batch.delete(doc.ref))
    jobs.forEach(doc => batch.delete(doc.ref))
    batch.delete(database.collection('users').doc(user.uid))

    return batch.commit()
  })
