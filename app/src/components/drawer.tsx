import React, { FC, useRef } from 'react'
import { AnimatePresence, styled, background, motion } from 'helpers'
import { useMotionValue, useTransform, useDrawer } from 'hooks'

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${background('trueBlack')};
`

const BaseDrawer = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 16px 32px 48px 32px;
  bottom: 0;
  z-index: 3;
  color: black;
  ${background('white')};

  &::after {
    content: '';
    left: 0;
    width: 100%;
    height: 50vh;
    position: absolute;
    bottom: 4px;
    transform: translateY(100%);
    ${background('white')};
  }
`

const Divider = styled.div`
  border: 2px solid ${props => props.theme.colors.gray300};
  width: 94px;
  margin-bottom: 32px;
`

type DrawerProps = {
  name: string
  children?: any
}

export const Drawer: FC<DrawerProps> = ({ name, children }) => {
  const drawerRef = useRef(null)
  const dividerRef = useRef(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [700, 0], [0, 0.8])
  const { isActive, closeDrawer } = useDrawer()

  const doesDragComeFromContainer = (target: EventTarget) => {
    const drawer = drawerRef.current
    const divider = dividerRef.current
    const node = target as Node
    return drawer.isSameNode(node) || divider.isSameNode(node)
  }

  return (
    <AnimatePresence>
      {isActive(name) && (
        <>
          <Overlay style={{ opacity }} onTap={closeDrawer} />
          <BaseDrawer
            ref={drawerRef}
            animate={{ y: 0, transition: { duration: 0.5 } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.25}
            exit={{ y: 700, transition: { duration: 0.5 } }}
            initial={{ y: 700 }}
            style={{ y }}
            onDrag={(event, info) => {
              if (!doesDragComeFromContainer(event.target)) {
                y.set(0)
              } else if (info.offset.y > 0) {
                y.set(info.offset.y)
              }
            }}
            onDragEnd={(event, info) => {
              if (!doesDragComeFromContainer(event.target)) {
                y.set(0)
              } else if (info.offset.y > 100 || info.velocity.y > 500) {
                closeDrawer()
              }
            }}
          >
            <Divider ref={dividerRef} />
            {children}
          </BaseDrawer>
        </>
      )}
    </AnimatePresence>
  )
}
