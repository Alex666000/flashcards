import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm, EditProfileFormProps } from './'

const meta = {
  component: EditProfileForm,
  title: 'Forms/Edit Profile',
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: EditProfileFormProps) => {
      alert(JSON.stringify(data))
    }

    return <EditProfileForm onSubmit={onSubmit} />
  },
}
