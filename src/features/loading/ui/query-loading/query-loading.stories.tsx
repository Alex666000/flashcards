import { QueryLoading } from '@/features/loading/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: QueryLoading,
  title: 'Components/Query Loading',
} satisfies Meta<typeof QueryLoading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
