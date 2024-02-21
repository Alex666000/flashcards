import { InitLoading } from '@/features/loading/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: InitLoading,
  title: 'Components/Initialization Loading',
} satisfies Meta<typeof InitLoading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
