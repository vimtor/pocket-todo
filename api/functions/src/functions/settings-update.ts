import { database, functions, timestamp } from 'helpers'
import { Timestamp } from 'typings'

export const settingsUpdate = functions
  .region('europe-west3')
  .runWith({ memory: '128MB', timeoutSeconds: 10 })
  .firestore.document('/users/{userId}')
  .onUpdate(async snapshot => {
    const beforeResetTime = snapshot.before.data().settings.resetTime as Timestamp
    const afterResetTime = snapshot.after.data().settings.resetTime as Timestamp

    if (!beforeResetTime.isEqual(afterResetTime)) {
      const userId = snapshot.after.id
      const jobs = await database
        .collection('jobs')
        .where('user', '==', userId)
        .where('name', '==', 'reschedule')
        .limit(1)
        .get()
      const rescheduleJob = jobs.docs[0]

      // Time comes from settings and day from job
      const rescheduleDate = (rescheduleJob.data().date as Timestamp).toDate()
      rescheduleDate.setHours(afterResetTime.toDate().getHours())
      rescheduleDate.setMinutes(afterResetTime.toDate().getMinutes())

      return database
        .collection('jobs')
        .doc(rescheduleJob.id)
        .update({ date: timestamp.fromDate(rescheduleDate) })
    }
  })
