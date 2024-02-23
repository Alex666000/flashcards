import { Meta, StoryObj } from '@storybook/react'

import { Rating } from './rating'

const meta = {
  component: Rating,
  tags: ['autodocs'],
  title: 'shared/ui/rating',
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {},
}
export const Selected: Story = {
  args: {
    selectedStars: 3,
  },
}

export const Large: Story = {
  args: {
    size: 25,
  },
}
