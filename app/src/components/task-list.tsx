import React, { FC, useEffect } from 'react'
import { styled, AnimatePresence, AnimateSharedLayout, motion } from 'helpers'
import { TaskStatus } from 'typings'
import { Task, EmptyList } from 'components'
import { useTasks } from 'hooks'

const LIST_VARIANTS = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
}

type TaskListProps = {
  status: TaskStatus
}

const List = styled(motion.ul)`
  overflow: scroll;
  padding-bottom: 156px;
  min-height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const TaskList: FC<TaskListProps> = ({ status }) => {
  const { tasks, setStatus } = useTasks()

  useEffect(() => setStatus(status), [status, setStatus])

  if (tasks.length === 0) {
    return <EmptyList />
  }

  return (
    <AnimateSharedLayout>
      <List animate="visible" initial="hidden" variants={LIST_VARIANTS}>
        <AnimatePresence>
          {tasks.map((props, order) => (
            <Task {...props} key={props.id} order={order} />
          ))}
        </AnimatePresence>
      </List>
    </AnimateSharedLayout>
  )
}
