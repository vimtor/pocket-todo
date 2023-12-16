import React from 'react'
import { styled, motion } from 'helpers'
import { EMPTY_INFO } from 'lookups'
import { Button } from 'components'
import { useRouter, useTasks } from 'hooks'

const EMPTY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delay: 0.5,
    },
  },
}

const BUTTON_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.25,
    },
  },
}

const Action = motion.div

const Container = styled(motion.div)`
  margin-top: 10vh;
  padding: 0 40px;
  text-align: center;

  @media screen and (min-height: 700px) {
    margin-top: 15vh;
  }
`

const Emoji = styled.span`
  display: inline-block;
  font-size: 64px;
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray800};
  font-weight: ${({ theme }) => theme.weights.bold};
`

const Description = styled.h2`
  margin-bottom: 48px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: ${({ theme }) => theme.weights.regular};
`

export const EmptyList = () => {
  const { status } = useTasks()
  const { navigate } = useRouter()

  if (!status) {
    return null
  }

  const handleCreate = () => {
    navigate('/create')
  }

  const { icon, title, description } = EMPTY_INFO[status]

  return (
    <Container animate="visible" initial="hidden" variants={EMPTY_VARIANTS}>
      <Emoji aria-label="icon" role="img">
        {icon}
      </Emoji>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Action variants={BUTTON_VARIANTS}>
        <Button onClick={handleCreate}>Create new task</Button>
      </Action>
    </Container>
  )
}
