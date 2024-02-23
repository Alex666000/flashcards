import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from './edit-profile'
import { EditProfileFormProps } from './use-edit-profile'

const meta = {
  component: EditProfileForm,
  title: 'features/forms/edit-profile',
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
