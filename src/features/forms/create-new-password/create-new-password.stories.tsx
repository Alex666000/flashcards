import { CreateNewPasswordForm } from '@/components/forms/create-new-password-page/create-new-password-page.tsx'
import { CreateNewPasswordFormType } from '@/components/forms/create-new-password-page/use-create-new-password-page.ts'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CreateNewPasswordForm,
  title: 'Forms/Create New Password',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: CreateNewPasswordFormType) => {
      alert(JSON.stringify(data))
    }

    return <CreateNewPasswordForm onSubmit={onSubmit} />
  },
}
