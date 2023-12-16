import { database, functions, timestamp } from 'helpers'
import { Timestamp } from 'typings'

type JobName = 'reschedule'

type RawJob = {
  name: JobName
  date: Timestamp
  user: string
  payload?: Record<string, any>
}

type Job = Omit<RawJob, 'date'> & {
  id: string
  date: Date
}

const WORKERS = {
  reschedule: async (job: Job) => {
    const { id, date, user } = job

    const ref = database.collection('users').doc(user).collection('tasks')
    const batch = database.batch()
    const todayTasks = await ref.where('status', '==', 'today').get()

    if (todayTasks.docs.length > 0) {
      const scheduleTasks = await ref.where('status', '==', 'schedule').get()
      const tasks = [...todayTasks.docs, ...scheduleTasks.docs]
      tasks.forEach(task => {
        batch.update(ref.doc(task.id), { status: 'schedule' })
      })
    }

    date.setDate(date.getDate() + 1)
    batch.update(database.collection('jobs').doc(id), { date })

    return batch.commit()
  },
}

export const runJobs = functions
  .region('europe-west3')
  .pubsub.schedule('every 2 hours')
  .onRun(async () => {
    const now = timestamp.now()
    const query = await database.collection('jobs').where('date', '<=', now).get()

    const jobs = query.docs.map(job => {
      const { id } = job
      const { name, date, ...data } = job.data() as RawJob

      return WORKERS[name]({ ...data, date: date.toDate(), name, id })
    })

    return Promise.all(jobs)
  })
