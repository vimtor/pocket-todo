import React, { FC, ReactNode, useEffect } from 'react'
import { FallbackProps, ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary'
import { logout, performance } from 'helpers'
import { useNotifications, useRouter } from 'hooks'

type ErrorBoundaryProps = {
  children: ReactNode
}

const Fallback: FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const { createNotification } = useNotifications()
  const { navigate } = useRouter()

  useEffect(() => {
    logout().then(() => {
      if (process.env.NODE_ENV !== 'development') {
        navigate('/login')
      }
      resetErrorBoundary()
      createNotification({ title: 'Something went wrong', type: 'error' })
    })
  }, [createNotification, navigate, resetErrorBoundary])

  return null
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <BaseErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(error)
        }

        const trace = performance.trace('unhandledError')
        trace.start()

        if (error.name) {
          trace.putAttribute('name', error.name)
        }
        if (error.message) {
          trace.putAttribute('message', error.message)
        }
        if (info.componentStack) {
          trace.putAttribute('stack', error.stack)
        }

        trace.stop()
      }}
    >
      {children}
    </BaseErrorBoundary>
  )
}
