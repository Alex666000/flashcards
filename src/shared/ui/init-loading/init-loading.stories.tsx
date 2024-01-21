import { Meta, StoryObj } from '@storybook/react'

import { InitLoading } from './'

const meta = {
    component: InitLoading,
    title: 'Components/Initialization Loading',
} satisfies Meta<typeof InitLoading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
