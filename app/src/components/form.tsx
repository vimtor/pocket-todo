import React, { FC, ReactNode, useEffect } from 'react'
import { gap, styled } from 'helpers'
import { FormProvider, useForm } from 'hooks'

type FormProps = {
  children: ReactNode
  onSubmit?: <T>(data: T) => void | Promise<void>
  defaultValues?: Record<string, any>
  className?: string
}

const BaseForm = styled.form`
  ${gap(0, 12)};
`

export const Form: FC<FormProps> = ({ children, defaultValues, onSubmit, className }) => {
  const methods = useForm({
    defaultValues: defaultValues instanceof Promise ? {} : defaultValues,
    shouldFocusError: false,
  })

  useEffect(() => {
    if (defaultValues instanceof Promise) {
      defaultValues.then(methods.reset)
    }

    // Intentionally empty to avoid rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <BaseForm className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </BaseForm>
    </FormProvider>
  )
}
