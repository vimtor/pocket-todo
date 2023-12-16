import React, { FC } from 'react'
import { BaseRoute, BaseRouteProps, Redirect } from 'components'
import { useAuth } from 'hooks'

type RouteProps = BaseRouteProps & {
  protect?: boolean
  redirect?: string
}

export const Route: FC<RouteProps> = ({ component, path, protect = false, exact = true, ...props }) => {
  const { logged, loading } = useAuth()

  return (
    <BaseRoute
      {...props}
      exact={exact}
      path={path}
      render={rest => {
        if (loading) {
          return null
        }

        if (protect && !logged) {
          return <Redirect to="/login" />
        }

        const Component = component
        return <Component {...rest} />
      }}
    />
  )
}
