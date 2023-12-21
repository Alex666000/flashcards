import type { Meta, StoryObj } from '@storybook/react'

import { CSSProperties } from 'react'

import { Card } from '@/shared/ui/card/card'

const meta: Meta<typeof Card> = {
    component: Card,
    tags: ['autodocs'],
    title: 'shared/ui/card',
}

export default meta
type Story = StoryObj<typeof meta>

const contentStyles: CSSProperties = { fontSize: '24px', textAlign: 'center' }

export const Default: Story = {
    args: {
        children: <div style={contentStyles}>Card</div>,
        style: {
            height: '300px',
            padding: '24px',
            width: '300px',
        },
    },
}
