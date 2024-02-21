import { Avatar } from '@/shared/ui/avatar-s/avatar'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
export type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 50, userName: 'default' },
}
export const WithUserPhoto: Story = {
  args: {
    photoOrImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    size: 136,
    userName: 'planet',
  },
}
