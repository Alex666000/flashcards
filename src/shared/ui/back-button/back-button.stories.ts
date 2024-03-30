import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '@/shared/config'

import { BackButton } from './back-button'

const meta = {
  component: BackButton,
  decorators: [BrowserRouterDecorator],
  tags: ['autodocs'],
  title: 'shared/ui/back-button',
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
