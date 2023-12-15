import { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(Typography),
        },
    },
    component: Typography,
    tags: ['autodocs'],
    title: 'shared/ui/typography',
}

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
    args: {
        children: 'Large text',
        variant: 'large',
    },
}

export const H1: Story = {
    args: {
        children: 'H1 text',
        variant: 'h1',
    },
}

export const H2: Story = {
    args: {
        children: 'H2 text',
        variant: 'h2',
    },
}

export const H3: Story = {
    args: {
        children: 'H3 text',
        variant: 'h3',
    },
}

export const Body1: Story = {
    args: {
        children: 'Body1 text',
        variant: 'body1',
    },
}

export const Body2: Story = {
    args: {
        children: 'Body2 text',
        variant: 'body2',
    },
}

export const Subtitle1: Story = {
    args: {
        children: 'Subtitle1 text',
        variant: 'subtitle1',
    },
}

export const Subtitle2: Story = {
    args: {
        children: 'Subtitle2 text',
        variant: 'subtitle2',
    },
}

export const Span: Story = {
    args: {
        children: 'Span text',
        variant: 'span',
    },
}

export const Overline: Story = {
    args: {
        children: 'Overline text',
        variant: 'overline',
    },
}

export const Link1: Story = {
    args: {
        children: 'Link1 text',
        variant: 'link1',
    },
}

export const Link2: Story = {
    args: {
        children: 'Link2 text',
        variant: 'link2',
    },
}

export const Error: Story = {
    args: {
        children: 'Error!',
        variant: 'error',
    },
}
