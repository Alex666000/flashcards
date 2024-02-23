import { SecondaryProgress } from '@/shared/ui/loaders-components/loaders'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SecondaryProgress,
  title: 'shared/ui/secondary-progress',
} satisfies Meta<typeof SecondaryProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
