import { SyntheticEvent } from 'react'

export const preventDefault = (event: SyntheticEvent) => {
  event.stopPropagation()
  event.preventDefault()
}
