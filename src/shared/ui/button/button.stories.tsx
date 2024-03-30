import type { Meta, StoryObj } from '@storybook/react'

import { LogoutIcon } from '@/shared/assets'

import { Button, ButtonVariant } from './button'

const meta = {
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'radio' },
      options: ButtonVariant,
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'shared/ui/button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

Primary.storyName = 'Primary Button'

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary',
  },
}

export const Clear: Story = {
  args: {
    children: 'Clear Button',
    disabled: false,
    variant: 'clear',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    disabled: false,
    variant: 'outline',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://google.com',
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <LogoutIcon />
        Primary Button
      </>
    ),
    disabled: false,
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <LogoutIcon />
        Secondary Button
      </>
    ),
    disabled: false,
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Tertiary Button',
    disabled: true,
    variant: 'primary',
  },
}
