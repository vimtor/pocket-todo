import React, { FC } from 'react'
import { Header, Navbar, Page, TaskList } from 'components'

export const Schedule: FC = () => (
  <Page>
    <Header>Select for today</Header>
    <TaskList status="schedule" />
    <Navbar />
  </Page>
)
