import React, { FC } from 'react'
import { Header, Navbar, Page, TaskList } from 'components'

export const Today: FC = () => (
  <Page>
    <Header>Tasks for today</Header>
    <TaskList status="today" />
    <Navbar />
  </Page>
)
