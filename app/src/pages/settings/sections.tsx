import React from 'react'
import { color, gap, styled, weight, formatDate } from 'helpers'
import { Card as BaseCard, Icon, Switch } from 'components'
import { useDrawer, useSettings } from 'hooks'
import { Item } from './item'

const Container = styled.main`
  ${gap(0, 24)};
`

const Section = styled.section``

const Card = styled(BaseCard)`
  padding: 24px;
  ${gap(0, 20)};
`

const Title = styled.h2`
  font-size: 14px;
  margin-left: 16px;
  margin-bottom: 8px;
  ${weight('light')};
  ${color('gray600')};
`

const Text = styled.p`
  text-align: right;
  ${color('gray600')};
  font-weight: 400;
  font-size: 14px;
`

const GeneralSection = () => {
  const { openDrawer } = useDrawer()
  const { theme, updateSettings, timeFormat, resetTime } = useSettings()

  const handleThemeSwitch = async () => {
    await updateSettings({ theme: theme === 'light' ? 'dark' : 'light' })
  }

  const handleOpenReschedule = () => {
    openDrawer('reset-time')
  }

  const handleOpenTimeFormat = () => {
    openDrawer('time-format')
  }

  return (
    <Section>
      <Title>General</Title>
      <Card>
        <Item icon={<Icon color="blue900" name="moon" />} title="Night mode">
          <Switch value={theme === 'dark'} onChange={handleThemeSwitch} />
        </Item>
        <Item
          icon={<Icon filled color="blue700" name="calendar" />}
          title="Reschedule time"
          onClick={handleOpenReschedule}
        >
          <Text>{formatDate(resetTime.toDate(), timeFormat === '12' ? 'p' : 'HH:mm')}</Text>
        </Item>
        <Item icon={<Icon filled color="blue600" name="clock" />} title="Time format" onClick={handleOpenTimeFormat}>
          <Text>{timeFormat} hours</Text>
        </Item>
      </Card>
    </Section>
  )
}

const SupportSection = () => (
  <Section>
    <Title>Support</Title>
    <Card>
      <Item
        icon={<Icon filled color="red700" name="heart" />}
        link="https://www.buymeacoffee.com/pocketapps"
        title="Donate"
      />
      <Item
        icon={<Icon filled color="blue700" name="chat" />}
        link="mailto:victor@vnavarro.dev"
        title="Submit feedback"
      />
      <Item
        icon={<Icon filled color="red500" name="support" />}
        link="mailto:victor@vnavarro.dev"
        title="I've found an error!"
      />
    </Card>
  </Section>
)

export const Sections = () => (
  <Container>
    <GeneralSection />
    <SupportSection />
  </Container>
)
