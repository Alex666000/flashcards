import type { Meta } from '@storybook/react'

import { RegisterForm } from './'

const meta = {
  component: RegisterForm,
  tags: ['autodocs'],
  title: 'Auth/RegisterForm',
} satisfies Meta<typeof RegisterForm>

export default meta

export const RegisterFormMain = {
  args: {},

  render: () => {
    return <RegisterForm onSubmitHandler={() => {}} />
  },
}
