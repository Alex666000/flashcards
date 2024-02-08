import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '.'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
export type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'default', size: 50 },
}
export const WithUserPhoto: Story = {
  args: {
    name: 'planet',
    photo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-P8bA7CjEhkhrfV_4YB-nrGOFRs0gB4OOw&usqp=CAU',
    size: 136,
  },
}
