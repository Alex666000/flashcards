import { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './forgot-password'
import { ForgotPasswordFormType } from './use-forgot-password'

const meta = {
  component: ForgotPasswordForm,
  title: 'features/forms/forgot-password',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: ForgotPasswordFormType) => {
      alert(JSON.stringify(data))
    }

    return <ForgotPasswordForm onSubmit={onSubmit} />
  },
}
