import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { SearchIcon } from '@/shared/assets/icons'
import { action } from '@storybook/addon-actions'

import { TextField, TextFieldProps } from './index'

const meta: Meta<typeof TextField> = {
    component: TextField,
    tags: ['autodocs'],
    title: 'shared/ui/text-field',
}

export default meta
type Story = StoryObj<typeof meta>

// Helper
const TextFieldWithHooks = (args: TextFieldProps) => {
    const {
        error,
        label,
        leftIcon,
        onChange,
        onEnter,
        onKeyDown,
        onLeftIconClickHandler,
        onRightIconClickHandler,
        rightIcon,
        type,
    } = args

    const [value, setValue] = useState(args.value)

    const onChangeValueHandler = (value: string) => {
        setValue(value)
    }

    return (
        <TextField
            error={error}
            label={label}
            leftIcon={leftIcon}
            onChange={onChange}
            onChangeValue={onChangeValueHandler}
            onEnter={onEnter}
            onKeyDown={onKeyDown}
            onLeftIconClickHandler={onLeftIconClickHandler}
            onRightIconClickHandler={onRightIconClickHandler}
            placeholder={args.placeholder}
            rightIcon={rightIcon}
            type={type}
            value={value}
        />
    )
}

// Истории
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
        label: 'Search input',
        leftIcon: <SearchIcon />,
        placeholder: 'Search Input',
        type: 'search',
    },
}

export const Controlled: Story = {
    args: {
        label: 'Controlled Input',
        onChange: (event) => {
            action('Input Value')(event.target.value)
        },
        placeholder: 'Controlled Input',
        type: 'text',
    },
    render: (args) => <TextFieldWithHooks {...args} />,
}

export const ControlledWithPassword: Story = {
    args: {
        label: 'Password Input',
        onChange: (event) => {
            action('Password Value')(event.target.value)
        },
        placeholder: 'Password Input',
        type: 'password',
    },
    render: (args) => <TextFieldWithHooks {...args} />,
}

export const ControlledWithSearch: Story = {
    args: {
        label: 'Search Input',
        leftIcon: <SearchIcon />, // SearchIcon
        onChange: (event) => {
            action('Search Value')(event.target.value)
        },
        onLeftIconClickHandler: action('Left Icon was Clicked'),
        placeholder: 'Search Input',
        type: 'search',
    },
    render: (args) => <TextFieldWithHooks {...args} />,
}
