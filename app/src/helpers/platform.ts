import { isPlatform } from '@ionic/react'
import { Platform } from 'typings'

export { isPlatform }
export const getPlatform = (): Platform => {
  if (isPlatform('android')) return 'android'
  if (isPlatform('ios')) return 'ios'
  if (isPlatform('desktop')) return 'desktop'
}
