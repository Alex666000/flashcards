import { Loader } from '@/shared/ui/loaders-components'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
    component: Loader,
    title: 'Components/Initialization Loading',
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
