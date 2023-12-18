import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './index'

import { SearchIcon } from  '@/shared/assets'


const meta: Meta<typeof TextField> = {
    component: TextField,
    tags: ['autodocs'],
    title: 'shared/ui/text-field',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'Default input',
        placeholder: 'Default placeholder',
        type: 'text',
    },
}

export const Error: Story = {
    args: {
        error: 'Error message',
        label: 'Error input',
        placeholder: 'Error placeholder',
        type: 'text',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled input',
        placeholder: 'Disabled Input',
        type: 'text',
    },
}

export const Search: Story = {
    args: {
        type: 'search',
        placeholder: 'Search Input',
        label: 'Search input',
        leftIcon: <SearchIcon />
},
}
