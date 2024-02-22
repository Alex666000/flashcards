import { CreateNewPasswordForm, CreateNewPasswordFormType } from '@/features/forms'
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
