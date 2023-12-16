import React from 'react'
import { styled } from 'helpers'
import { TaskEntity } from 'typings'
import { Button, Form, Header, Input, Navbar, Page as BasePage, TextArea, Group as BaseGroup } from 'components'
import { useRouter, useTasks } from 'hooks'

const Page = styled(BasePage)`
  & > *:nth-child(2) {
    padding: 0 32px;
  }
`

const Group = styled(BaseGroup)`
  margin-top: 32px;
`

const Controls = () => {
  const { goBack } = useRouter()

  return (
    <Group>
      <Button type="submit">Confirm changes</Button>
      <Button variant="secondary" onClick={goBack}>
        Cancel
      </Button>
    </Group>
  )
}

export const Edit = () => {
  const { getTask, updateTask } = useTasks()
  const { params, goBack } = useRouter()
  const { id } = params as any

  const handleConfirm = async (data: Partial<TaskEntity>) => {
    const { title, description } = data
    await updateTask(id, { title, description })
    goBack()
  }

  return (
    <Page>
      <Header>Edit task </Header>
      <Form defaultValues={getTask(id)} onSubmit={handleConfirm}>
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
}
