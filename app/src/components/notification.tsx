import React, { FC } from 'react'
import { styled, motion } from 'helpers'
import { Color, IconName } from 'typings'
import { Icon } from 'components'
import { useNotifications } from 'hooks'

const NOTIFICATION_TYPE = {
  warn: {
    icon: 'warn',
    color: 'yellow',
  },
  error: {
    icon: 'danger',
    color: 'red',
  },
  info: {
    icon: 'info',
    color: 'blue',
  },
  success: {
    icon: 'check',
    color: 'green',
  },
}

type ContainerProps = {
  color: string
}

type NotificationProps = {
  id: string
  type: 'info' | 'warn' | 'error' | 'success'
  title: string
}

const Container = styled(motion.li)<ContainerProps>`
  background-color: ${({ theme, color }) => theme.colors[`${color}100` as Color]};
  color: ${({ theme, color }) => theme.colors[`${color}700` as Color]};
  border: 1px solid ${({ theme, color }) => theme.colors[`${color}500` as Color]};
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  width: 340px;
  margin-top: 12px;

  & > *:first-child {
    margin-right: 16px;
  }

  & > *:last-child {
    margin-left: auto;
  }
`

export const Notification: FC<NotificationProps> = ({ id, title, type }) => {
  const { removeNotification } = useNotifications()
  const { icon, color } = NOTIFICATION_TYPE[type]

  const handleRemove = () => removeNotification(id)

  return (
    <Container
      layout
      animate={{ opacity: 1, y: 0 }}
      color={color}
      exit={{ opacity: 0, y: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: -50 }}
    >
      <Icon color={`${color}700` as Color} name={icon as IconName} />
      {title}
      <Icon color={`${color}700` as Color} name="close" size={20} onClick={handleRemove} />
    </Container>
  )
}
