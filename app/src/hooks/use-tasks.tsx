import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { analytics, database } from 'helpers'
import { TaskEntity, TaskStatus } from 'typings'
import { useAuth } from 'hooks'

type TaskContextProps = {
  tasks?: TaskEntity[]
  status?: TaskStatus
  getTask?: (id: string) => Promise<TaskEntity>
  updateTask?: (id: string, update: Partial<TaskEntity>) => void
  removeTask?: (id: string) => void
  createTask?: (task: Partial<TaskEntity>) => void
  setStatus?: (status: TaskStatus) => void
}

type TaskProviderProps = {
  children: ReactNode
}

const TaskContext = createContext<TaskContextProps>({})

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const { logged, user } = useAuth()
  const [tasks, setTasks] = useState<TaskEntity[]>([])
  const [status, setStatus] = useState<TaskStatus>(null)

  useEffect(() => {
    if (!logged || !status) return

    setTasks([]) // Reset tasks for triggering animation

    return database
      .collection('users')
      .doc(user.id)
      .collection('tasks')
      .where('status', '==', status)
      .onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setTasks(newTasks as TaskEntity[])
      })
  }, [logged, status, user.id])

  const updateTask = async (id: string, update: Partial<TaskEntity>) => {
    await database.collection('users').doc(user.id).collection('tasks').doc(id).update(update)
    analytics.logEvent('task_update', { ...update, id })
  }

  const removeTask = async (id: string) => {
    await database.collection('users').doc(user.id).collection('tasks').doc(id).delete()
    analytics.logEvent('task_delete', { id })
  }

  const createTask = async (task: Partial<TaskEntity>) => {
    const created = await database.collection('users').doc(user.id).collection('tasks').add(task)
    analytics.logEvent('task_create', { ...task, id: created.id })
  }

  const getTask = async (id: string): Promise<TaskEntity> => {
    const task = tasks.find(el => el.id === id)
    if (task) return task

    const doc = await database.collection('users').doc(user.id).collection('tasks').doc(id).get()
    return { id: doc.id, ...doc.data() } as TaskEntity
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        status,
        getTask,
        setStatus,
        updateTask,
        removeTask,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks hook must be used within TaskProvider')
  }

  return context
}
