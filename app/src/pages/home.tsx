import React, { FC, useEffect } from 'react'
import { database, styled } from 'helpers'
import { Page as BasePage } from 'components'
import { useAuth, useRouter } from 'hooks'

const Page = styled(BasePage)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Home: FC = () => {
  const { navigate } = useRouter()
  const { logged, user } = useAuth()

  useEffect(() => {
    if (!logged) {
      navigate('/login')
      return
    }

    database
      .collection('users')
      .doc(user.id)
      .collection('tasks')
      .where('status', '==', 'today')
      .limit(1)
      .get()
      .then(tasks => {
        navigate(tasks.empty ? '/schedule' : '/today')
      })
  }, [logged, navigate, user.id])

  return <Page />
}
