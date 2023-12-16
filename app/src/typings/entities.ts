import { Timestamp } from 'typings'

export type TaskStatus = 'schedule' | 'today' | 'archived'

export type TaskEntity = {
  id: string
  title: string
  description?: string
  order: number
  status: TaskStatus
  completedAt?: Timestamp
}

export type SettingsEntity = {
  theme: 'dark' | 'light'
  timeFormat: '12' | '24'
  resetTime: Timestamp
  language: string
}

export type UserEntity = {
  id: string
  settings: SettingsEntity
}
