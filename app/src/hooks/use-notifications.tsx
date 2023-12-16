import React, { createContext, FC, useContext, useState } from 'react'
import { randomId } from 'helpers'
import { NotificationList } from 'components'

type NotificationEntity = {
  id: string
  type: 'info' | 'warn' | 'error' | 'success'
  title: string
}

type NotificationOptions = {
  delay: number
}

type NotificationContextProps = {
  notifications?: NotificationEntity[]
  removeNotification?: (id: string) => void
  createNotification?: (notification: Omit<NotificationEntity, 'id'>, options?: NotificationOptions) => void
}

type NotificationProviderProps = {
  children?: any
}

const NotificationContext = createContext<NotificationContextProps>({})

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationEntity[]>([])

  const removeNotification = (id: string) => {
    setNotifications(state => state.filter(notification => notification.id !== id))
  }

  const createNotification = (notification: Omit<NotificationEntity, 'id'>, options = { delay: 0 }) => {
    const id = randomId()
    const { delay } = options

    setTimeout(() => {
      setNotifications(state => [{ id, ...notification }, ...state])
    }, delay)

    setTimeout(() => removeNotification(id), 4000)
  }

  return (
    <>
      <NotificationContext.Provider
        value={{
          notifications,
          removeNotification,
          createNotification,
        }}
      >
        {children}
        <NotificationList />
      </NotificationContext.Provider>
    </>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotifications hook must be used within NotificationProvider')
  }

  return context
}
