import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'
import { Typography } from '../typograpfy/typography'

const meta: Meta<typeof Card> = {
    component: Card,
    tags: ['autodocs'],
    title: 'shared/ui/card',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: <Typography variant={'large'}>Card</Typography>,
    },
}
