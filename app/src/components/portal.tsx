import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const [root, setRoot] = useState(null)

  useEffect(() => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    setRoot(element)

    return () => document.body.removeChild(element)
  }, [])

  return root && createPortal(children, root)
}
