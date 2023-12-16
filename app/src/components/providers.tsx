import React, { FC, ReactNode } from 'react'
import {
  TaskProvider,
  ThemeProvider,
  RouterProvider,
  AuthProvider,
  NotificationProvider,
  DrawerProvider,
  SettingsProvider,
} from 'hooks'
import { ErrorBoundary } from './error-boundary'

type ProvidersProps = {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <RouterProvider>
    <ThemeProvider>
      <NotificationProvider>
        <ErrorBoundary>
          <AuthProvider>
            <SettingsProvider>
              <TaskProvider>
                <DrawerProvider>{children}</DrawerProvider>
              </TaskProvider>
            </SettingsProvider>
          </AuthProvider>
        </ErrorBoundary>
      </NotificationProvider>
    </ThemeProvider>
  </RouterProvider>
)
