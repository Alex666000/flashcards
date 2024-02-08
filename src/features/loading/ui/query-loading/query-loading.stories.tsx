import { Meta, StoryObj } from '@storybook/react'

import { QueryLoading } from './'

const meta = {
  component: QueryLoading,
  title: 'Components/Query Loading',
} satisfies Meta<typeof QueryLoading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
