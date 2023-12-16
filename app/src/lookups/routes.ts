import { IconName, TaskStatus } from 'typings'

type RouteInfo = {
  icon: IconName
  action?: {
    status: TaskStatus
    icon: IconName
  }
}

type EmptyInfo = {
  icon: string
  title: string
  description: string
}

export const ROUTES: Record<string, RouteInfo> = {
  '/schedule': {
    icon: 'calendar',
    action: {
      status: 'today',
      icon: 'sun',
    },
  },
  '/today': {
    icon: 'sun',
    action: {
      status: 'schedule',
      icon: 'calendar',
    },
  },
  '/create': {
    icon: 'add',
  },
  '/archived': {
    icon: 'archive',
    action: {
      status: 'schedule',
      icon: 'calendar',
    },
  },
  '/settings': {
    icon: 'gear',
  },
}

export const EMPTY_INFO: Record<TaskStatus, EmptyInfo> = {
  schedule: {
    icon: '💪',
    title: 'Stay strong',
    description: 'Add a task so you dont forget',
  },
  archived: {
    icon: '👀',
    title: 'No tasks yet',
    description: 'Completed tasks will be here',
  },
  today: {
    icon: '💪',
    title: 'Stay strong',
    description: 'Add a task for today',
  },
}
