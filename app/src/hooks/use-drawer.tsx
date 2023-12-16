import React, { createContext, FC, useContext, useState } from 'react'

type DrawerContextProps = {
  isActive?: (name: string) => boolean
  openDrawer?: (name: string) => void
  closeDrawer?: () => void
}

type DrawerProviderProps = {
  children?: any
}

const DrawerContext = createContext<DrawerContextProps>({})

export const DrawerProvider: FC<DrawerProviderProps> = ({ children }) => {
  const [active, setActive] = useState('')

  const isActive = (name: string) => name === active

  const openDrawer = (name: string) => {
    setActive(name)
  }

  const closeDrawer = () => {
    setActive('')
  }

  return (
    <DrawerContext.Provider
      value={{
        isActive,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('useContext hook must be used within ContextProvider')
  }

  return context
}
