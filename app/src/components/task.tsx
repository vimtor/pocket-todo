import React, { FC, SyntheticEvent, useState } from 'react'
import { styled, motion, preventDefault, background } from 'helpers'
import { Direction, TaskEntity, PanInfo } from 'typings'
import { ROUTES } from 'lookups'
import { Swiper, Card, BaseTask } from 'components'
import { useMotionValue, useRouter, useTasks } from 'hooks'

const ACTION_OFFSET = 100
const VELOCITY_OFFSET = 300
const ITEM_VARIANT = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

type TaskProps = {
  index?: number
} & TaskEntity

const Item = styled(motion.li)`
  position: relative;
  margin: 0 8px 12px;
`

const Container = styled(Card)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 76px;
  ${background('white')};
`

export const Task: FC<TaskProps> = ({ id, order, status, ...props }) => {
  const { updateTask, removeTask } = useTasks()
  const [direction, setDirection] = useState<Direction>()
  const [swiping, setSwiping] = useState(false)
  const [completed, setCompleted] = useState(false)
  const { navigate, pathname } = useRouter()
  const x = useMotionValue(0)

  const handleDragStart = (event: TouchEvent, info: PanInfo) => {
    const moreHorizontalThanVertical = Math.abs(info.delta.x) > Math.abs(info.delta.y)
    if (moreHorizontalThanVertical) {
      setSwiping(true)
    }
  }

  const handleDrag = (event: TouchEvent, info: PanInfo) => {
    if (swiping) {
      x.set(info.offset.x)
      if (info.offset.x < 0) {
        setDirection('left')
      } else {
        setDirection('right')
      }
    }
  }

  const handleDragEnd = async (event: TouchEvent, info: PanInfo) => {
    if (swiping) {
      if (info.offset.x > ACTION_OFFSET || info.velocity.x > VELOCITY_OFFSET) {
        x.set(500)
        updateTask(id, { status: ROUTES[pathname].action.status })
      } else if (info.offset.x < -ACTION_OFFSET || info.velocity.x < -VELOCITY_OFFSET) {
        x.set(-500)
        removeTask(id)
      } else {
        x.set(0)
      }
      setSwiping(false)
    }
  }

  const handleCheck = async (e: SyntheticEvent) => {
    e.stopPropagation()
    setCompleted(true)
    await updateTask(id, { status: 'archived' })
  }

  const handleUncheck = async (e: SyntheticEvent) => {
    e.stopPropagation()
    setCompleted(true)
    await updateTask(id, { status: 'today' })
  }

  const handleClick = () => {
    navigate(`/edit/${id}`)
  }

  return (
    <Item variants={ITEM_VARIANT} whileTap={{ zIndex: 1 }} onClick={handleClick} onContextMenu={preventDefault}>
      <Swiper direction={direction} visible={swiping} />
      <Container
        layout
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        exit={{
          opacity: 0,
          transition: { delay: 0.2, duration: completed ? 0.2 : 0 },
        }}
        style={{ x }}
        onContextMenu={preventDefault}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <BaseTask
          completed={completed}
          id={id}
          order={order}
          status={status}
          onCheck={handleCheck}
          onUncheck={handleUncheck}
          {...props}
        />
      </Container>
    </Item>
  )
}
