import React, { useEffect, useState } from 'react'
import { color, dateToTimestamp, styled } from 'helpers'
import { Color } from 'typings'
import { Button, Clock, Drawer, Icon } from 'components'
import { useAuth, useDrawer, useNotifications, useSettings } from 'hooks'

type TitleProps = {
  color: Color
}

const Container = styled.div`
  display: flex;
  width: 100%;

  & > *:first-child {
    margin-right: 16px;
  }
`

const Title = styled.h3<TitleProps>`
  font-size: 20px;
  font-weight: 800;
  color: ${props => props.theme.colors[props.color]};
`

const Text = styled.p`
  text-align: center;
  margin-top: 12px;
  font-size: 16px;
  margin-bottom: 32px;
  ${color('gray900')};
`

const Suggestion = styled.span`
  display: block;
  margin-top: 24px;
  ${color('gray500')};
`

const ResetTimeDrawer = () => {
  const { resetTime: initialResetTime, timeFormat, updateSettings } = useSettings()
  const [resetTime, setResetTime] = useState(initialResetTime.toDate())
  const { closeDrawer } = useDrawer()

  useEffect(() => setResetTime(initialResetTime.toDate()), [initialResetTime])

  const handleSubmit = async () => {
    closeDrawer()
    await updateSettings({ resetTime: dateToTimestamp(resetTime) })
  }

  return (
    <Drawer name="reset-time">
      <Clock format={timeFormat} value={resetTime} onChange={setResetTime} />
      <Button onClick={handleSubmit}>Confirm changes</Button>
    </Drawer>
  )
}

const TimeFormatDrawer = () => {
  const { timeFormat, updateSettings } = useSettings()
  const { closeDrawer } = useDrawer()

  const handleChange = (format: '12' | '24') => async () => {
    closeDrawer()
    await updateSettings({ timeFormat: format })
  }

  return (
    <Drawer name="time-format">
      <Icon color="blue700" name="info" />
      <Title color="blue700">Hammer time!</Title>
      <Text>
        This option indicates whether the time will appear in a 12 or 24 hour format
        <Suggestion>Please select what you prefer</Suggestion>
      </Text>
      <Container>
        <Button variant={timeFormat === '12' ? 'primary' : 'secondary'} onClick={handleChange('12')}>
          12 AM/PM
        </Button>
        <Button variant={timeFormat === '24' ? 'primary' : 'secondary'} onClick={handleChange('24')}>
          24 H
        </Button>
      </Container>
    </Drawer>
  )
}

const DeleteAccountDrawer = () => {
  const { logout, deleteAccount } = useAuth()
  const { createNotification } = useNotifications()
  const { closeDrawer } = useDrawer()

  const handleDelete = async () => {
    closeDrawer()

    try {
      await deleteAccount()
      await logout()
      createNotification({ title: 'Good luck in your journey 👋', type: 'info' }, { delay: 300 })
    } catch (e) {
      if (e.code === 'auth/requires-recent-login') {
        await logout()
        createNotification({ title: 'Login again to confirm your identity', type: 'error' }, { delay: 300 })
      }
    }
  }

  return (
    <Drawer name="delete-account">
      <Icon color="red600" name="warn" />
      <Title color="red600">Warning</Title>
      <Text>
        If you delete your account, you will not be able to recover your settings and/or any task that has been created
        up to this point.
      </Text>
      <Button color="red600" onClick={handleDelete}>
        Yes, delete my account
      </Button>
    </Drawer>
  )
}

export const Drawers = () => (
  <>
    <ResetTimeDrawer />
    <DeleteAccountDrawer />
    <TimeFormatDrawer />
  </>
)
