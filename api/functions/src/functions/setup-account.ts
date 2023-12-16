import { database, functions } from 'helpers'

const INITIAL_TASKS = [
  {
    title: 'This is your first task!',
    description: 'Try swiping the task to the right to change its status',
    status: 'schedule',
  },
  {
    title: "I don't like being here",
    description: 'Just as easy as swiping left',
    status: 'schedule',
  },
  {
    title: 'Tap me to edit',
    status: 'today',
  },
  {
    title: 'Leave me here for a day',
    description: 'And see what happens...',
    status: 'today',
  },
  {
    title: 'I was completed a long time ago...',
    description: 'Resurrect me by unchecking or swiping right',
    status: 'archived',
  },
]

export const setupAccount = functions
  .region('europe-west3')
  .runWith({ memory: '128MB', timeoutSeconds: 10 })
  .auth.user()
  .onCreate(user => {
    const batch = database.batch()

    const userRef = database.collection('users').doc(user.uid)
    const taskRef = userRef.collection('tasks')
    INITIAL_TASKS.forEach(task => batch.create(taskRef.doc(), task))

    return batch.commit()
  })
