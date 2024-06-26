import { Meta, StoryObj } from '@storybook/react'

import { LeanerProgress } from './leaner-progress'

const meta = {
  component: LeanerProgress,
  title: 'shared/ui/leaner-progress',
} satisfies Meta<typeof LeanerProgress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
