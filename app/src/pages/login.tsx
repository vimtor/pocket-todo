import React, { useEffect } from 'react'
import { color, styled } from 'helpers'
import { Button, Form, Group, Input, LegalInformation, Logo as BaseLogo, Page as BasePage } from 'components'
import { useAuth, useNotifications, useRouter } from 'hooks'

const Page = styled(BasePage)`
  padding: 0 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 900;
  font-size: 12px;
  height: 100vh;
  ${color('blue500')};
`

const Container = styled.div`
  width: 100%;
`

const Logo = styled(BaseLogo)`
  margin-bottom: 48px;
`

const Divider = styled.div`
  margin: 32px 0;
  border: 1px solid ${props => props.theme.colors.gray300};
`

export const Login = () => {
  const { login, logged } = useAuth()
  const { navigate } = useRouter()
  const { createNotification } = useNotifications()

  useEffect(() => {
    if (logged) {
      navigate('/schedule')
    }
  }, [logged, navigate])

  const handleEmailLogin = async (data: { email?: string }) => {
    const { email } = data
    await login('email', email)
    createNotification({ title: 'Check your email to login!', type: 'success' })
  }

  const handleGoogleLogin = async () => {
    await login('google')
    navigate('/schedule')
  }

  return (
    <Page>
      <Container>
        <Logo />
        <Form onSubmit={handleEmailLogin}>
          <Input
            icon="email"
            name="email"
            rules={{
              required: 'Missing email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          />
          <Button type="submit">Login</Button>
        </Form>
        <Divider />
        <Group>
          <Button color="google" icon="google" onClick={handleGoogleLogin} />
        </Group>
      </Container>
      <LegalInformation />
    </Page>
  )
}
