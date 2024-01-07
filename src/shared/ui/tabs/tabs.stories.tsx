import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    tags: ['autodocs'],
    title: 'Components/Tabs',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        tabs: [
            { title: 'Tab1', value: '1' },
            { title: 'Tab2', value: '2' },
            { title: 'Tab3', value: '3' },
            { title: 'Tab4', value: '4' },
        ],
    },
}
