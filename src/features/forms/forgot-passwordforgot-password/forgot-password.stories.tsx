import { ForgotPasswordForm } from '@/features/forms/forgot-passwordforgot-password/forgot-password'
import { ForgotPasswordFormType } from '@/features/forms/forgot-passwordforgot-password/use-forgot-password'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ForgotPasswordForm,
  title: 'Forms/Forgot Password',
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
