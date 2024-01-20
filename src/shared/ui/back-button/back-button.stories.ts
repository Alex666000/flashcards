import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '@/shared/config/storybook/decorators/browser-router-decorator'

import { BackButton } from './'

const meta = {
    component: BackButton,
    decorators: [BrowserRouterDecorator],
    tags: ['autodocs'],
    title: 'Components/Back Button',
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
