import React from 'react'
import { styled, AnimatePresence } from 'helpers'
import { Portal, Notification } from 'components'
import { useNotifications } from 'hooks'

const List = styled.ul`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
  align-items: center;
`

export const NotificationList = () => {
  const { notifications } = useNotifications()

  return (
    <Portal>
      <List>
        <AnimatePresence initial={false}>
          {notifications.map(({ id, ...props }) => (
            <Notification key={id} id={id} {...props} />
          ))}
        </AnimatePresence>
      </List>
    </Portal>
  )
}
