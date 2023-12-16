import React, { FC } from 'react'
import { motion, styled } from 'helpers'
import { Direction } from 'typings'
import { ROUTES } from 'lookups'
import { Icon } from 'components'
import { useRouter, useTheme } from 'hooks'

type BaseSwiperProps = {
  direction: Direction
}

type SwiperProps = {
  visible: boolean
} & BaseSwiperProps

const BaseSwiper = styled(motion.div)<BaseSwiperProps>`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 40px;
  top: 0;
  left: 0;
  border-radius: 24px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: ${({ theme, direction }) => (direction === 'right' ? theme.colors.blue500 : theme.colors.red500)};
  justify-content: ${({ direction }) => (direction === 'right' ? 'flex-start' : 'flex-end')};
`

export const Swiper: FC<SwiperProps> = ({ direction, visible }) => {
  const { pathname } = useRouter()
  const { mode } = useTheme()
  const icon = direction === 'right' ? ROUTES[pathname].action.icon : 'thrash'

  return (
    <BaseSwiper
      animate={{ opacity: visible ? 1 : 0, transition: { duration: 0.2 } }}
      direction={direction}
      exit={{ opacity: 0, transition: { delay: 0, duration: 0.25 } }}
      initial={{ opacity: 0 }}
    >
      <Icon filled color={mode === 'light' ? 'white' : 'gray800'} name={icon} size={36} />
    </BaseSwiper>
  )
}
