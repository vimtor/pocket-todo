import React, { FC } from 'react'
import BaseClock from 'react-timekeeper'
import { styled } from 'helpers'

type ClockProps = {
  value: Date
  onChange: (value: Date) => void
  format: '12' | '24'
}

const Wrapper = styled.div`
  --top-text-color: ${({ theme }) => theme.colors.gray600};
  --top-selected-color: ${({ theme }) => theme.colors.blue500};
  --meridiem-bg-color: ${({ theme }) => theme.colors.gray200};
  --meridiem-text-color: ${({ theme }) => theme.colors.gray700};
  --meridiem-selected-bg-color: ${({ theme }) => theme.colors.blue500};
  --meridiem-selected-text-color: ${({ theme }) => theme.colors.trueWhite};

  & > div {
    background: unset;
    box-shadow: none;
  }

  & > div > div:first-child {
    background: inherit;
    padding: 0;
    margin-bottom: 24px;
  }

  & > div > div:last-child {
    background: inherit;
    padding: 0;
    margin-bottom: 48px;
  }
`

export const Clock: FC<ClockProps> = ({ value, onChange, format }) => (
  <Wrapper>
    <BaseClock
      switchToMinuteOnHourSelect
      hour24Mode={format === '24'}
      time={{
        hour: value.getHours(),
        minute: value.getMinutes(),
      }}
      onChange={({ hour, minute }) => {
        const today = new Date()
        today.setHours(hour)
        today.setMinutes(minute)
        today.setSeconds(0)
        today.setMilliseconds(0)

        onChange(today)
      }}
    />
  </Wrapper>
)
