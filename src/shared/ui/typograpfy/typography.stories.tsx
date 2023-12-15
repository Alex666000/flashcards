import { typographyVariant } from '@/shared/ui/typograpfy/types'
import { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(typographyVariant),
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
        variant: typographyVariant.Large,
    },
}

export const H1: Story = {
    args: {
        children: 'H1 text',
        variant: typographyVariant.H1,
    },
}

export const H2: Story = {
    args: {
        children: 'H2 text',
        variant: typographyVariant.H2,
    },
}

export const H3: Story = {
    args: {
        children: 'H3 text',
        variant: typographyVariant.H3,
    },
}

export const Body1: Story = {
    args: {
        children: 'Body1 text',
        variant: typographyVariant.Body1,
    },
}

export const Body2: Story = {
    args: {
        children: 'Body2 text',
        variant: typographyVariant.Body2,
    },
}

export const Subtitle1: Story = {
    args: {
        children: 'Subtitle1 text',
        variant: typographyVariant.Subtitle1,
    },
}

export const Subtitle2: Story = {
    args: {
        children: 'Subtitle2 text',
        variant: typographyVariant.Subtitle2,
    },
}

export const Span: Story = {
    args: {
        children: 'Span text',
        variant: typographyVariant.Span,
    },
}

export const Overline: Story = {
    args: {
        children: 'Overline text',
        variant: typographyVariant.Overline,
    },
}

export const Link1: Story = {
    args: {
        children: 'Link1 text',
        variant: typographyVariant.Link1,
    },
}

export const Link2: Story = {
    args: {
        children: 'Link2 text',
        variant: typographyVariant.Link2,
    },
}

export const Error: Story = {
    args: {
        children: 'Error!',
        variant: typographyVariant.Error,
    },
}
