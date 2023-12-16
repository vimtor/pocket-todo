import React, { FC } from 'react'
import { styled, gap } from 'helpers'
import { Button, Header, LegalInformation, Navbar, Page as BasePage } from 'components'
import { useAuth, useDrawer, useNotifications, useRouter } from 'hooks'
import { Drawers } from './drawers'
import { Sections } from './sections'

const Page = styled(BasePage)`
  overflow-y: scroll;
  padding-bottom: 56px;
`

const Container = styled.main`
  padding: 0 8px 56px;
`

const Section = styled.section`
  margin-top: 36px;
`

const Buttons = styled(Section)`
  margin-top: 8px;
  padding: 28px;
  ${gap(0, 12)};
`

const AccountButtons = () => {
  const { logout } = useAuth()
  const { openDrawer } = useDrawer()
  const { navigate } = useRouter()
  const { createNotification } = useNotifications()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    createNotification({ title: 'See you soon! 👋', type: 'info' }, { delay: 300 })
  }

  const handleDelete = () => {
    openDrawer('delete-account')
  }

  return (
    <Buttons>
      <Button icon="logout" variant="secondary" onClick={handleLogout}>
        Log out
      </Button>
      <Button color="red500" onClick={handleDelete}>
        Delete account
      </Button>
    </Buttons>
  )
}

export const Settings: FC = () => (
  <Page>
    <Header>Your settings</Header>
    <Drawers />
    <Container>
      <Sections />
      <AccountButtons />
      <LegalInformation />
    </Container>
    <Navbar />
  </Page>
)
