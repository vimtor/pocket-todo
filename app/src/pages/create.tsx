import React, { FC } from 'react'
import { styled } from 'helpers'
import { TaskEntity } from 'typings'
import { Button, Form, Group as BaseGroup, Header, Input, Navbar, Page as BasePage, TextArea } from 'components'
import { useField, useRouter, useTasks } from 'hooks'

const Page = styled(BasePage)`
  & > *:nth-child(2) {
    padding: 0 32px;
  }
`

const Group = styled(BaseGroup)`
  margin-top: 32px;
`

const Controls = () => {
  const { navigate } = useRouter()
  const { handleSubmit } = useField()
  const { createTask } = useTasks()

  const handleCreate = async (data: Partial<TaskEntity>) => {
    const { title, description } = data
    await createTask({ title, description, status: 'schedule' })
    navigate('/schedule')
  }

  const handleCreateForToday = async (data: Partial<TaskEntity>) => {
    const { title, description } = data
    await createTask({ title, description, status: 'today' })
    navigate('/today')
  }

  return (
    <Group>
      <Button onClick={handleSubmit(handleCreate)}>Create task</Button>
      <Button variant="secondary" onClick={handleSubmit(handleCreateForToday)}>
        Add for today
      </Button>
    </Group>
  )
}

export const Create: FC = () => (
  <Page>
    <Header>Create new task</Header>
    <Form>
      <Input
        name="title"
        rules={{
          required: 'You seriously need a title',
          maxLength: { value: 256, message: 'Too long to remember' },
        }}
      />
      <TextArea
        name="description"
        rules={{
          maxLength: { value: 512, message: "Longer isn't always better" },
        }}
      />
      <Controls />
    </Form>
    <Navbar />
  </Page>
)
