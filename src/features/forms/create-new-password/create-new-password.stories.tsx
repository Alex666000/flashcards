import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm, CreateNewPasswordFormType } from '../index'

const meta = {
  component: CreateNewPasswordForm,
  title: 'features/forms/create-new-password',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: CreateNewPasswordFormType) => {
      alert(JSON.stringify(data))
    }

    return <CreateNewPasswordForm onSetCreateNewPasswordSubmit={onSubmit} />
  },
}
