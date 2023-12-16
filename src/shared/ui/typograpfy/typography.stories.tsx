import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: [
                'large',
                'h1',
                'h2',
                'h3',
                'body1',
                'body2',
                'subtitle1',
                'subtitle2',
                'caption',
                'overline',
                'link1',
                'link2',
                'error',
                'align',
            ],
        },
    },
    component: Typography,
    tags: ['autodocs'],
    title: 'shared/ui/typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
    args: {
        children: 'Typography text',
        variant: 'large',
    },
}

export const H1: Story = {
    args: {
        children: 'Typography text',
        variant: 'h1',
    },
}

export const H2: Story = {
    args: {
        children: 'Typography text',
        variant: 'h2',
    },
}

export const H3: Story = {
    args: {
        children: 'Typography text',
        variant: 'h3',
    },
}

export const Body1: Story = {
    args: {
        children: 'Typography text',
        variant: 'body1',
    },
}

export const AlignDefaultLeft: Story = {
    args: {
        align: 'left',
        children: 'Typography text',
        variant: 'body1',
    },
}

export const AlignCenter: Story = {
    args: {
        align: 'center',
        children: 'Typography text',
        variant: 'body1',
    },
}

export const AlignRight: Story = {
    args: {
        align: 'right',
        children: 'Typography text',
        variant: 'body1',
    },
}

export const Body2: Story = {
    args: {
        children: 'Typography text',
        variant: 'body2',
    },
}

export const Subtitle1: Story = {
    args: {
        children: 'Typography text',
        variant: 'subtitle1',
    },
}

export const Subtitle2: Story = {
    args: {
        children: 'Typography text',
        variant: 'subtitle2',
    },
}

export const Caption: Story = {
    args: {
        children: 'Typography text',
        variant: 'caption',
    },
}

export const Overline: Story = {
    args: {
        children: 'Typography text',
        variant: 'overline',
    },
}

export const Link1: Story = {
    args: {
        children: 'Typography text',
        variant: 'link1',
    },
}

export const Link2: Story = {
    args: {
        children: 'Typography text',
        variant: 'link2',
    },
}

export const Error: Story = {
    args: {
        children: 'Typography text',
        variant: 'error',
    },
}
