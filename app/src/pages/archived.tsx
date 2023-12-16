import React, { FC } from 'react'
import { Header, Navbar, Page, TaskList } from 'components'

export const Archived: FC = () => (
  <Page>
    <Header>Completed tasks</Header>
    <TaskList status="archived" />
    <Navbar />
  </Page>
)
