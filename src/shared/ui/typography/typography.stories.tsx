import { Meta, StoryObj } from '@storybook/react'

import { Typography, TypographyVariant, elementsMap } from './typography'

const options: TypographyVariant[] = [
    'large',
    'h1',
    'h2',
    'h3',
    'body1',
    'body2',
    'caption',
    'subtitle1',
    'subtitle2',
    'overline',
    'link1',
    'link2',
]

const meta = {
    argTypes: {
        as: {
            description: `Must be a string representing a React common component (such as a  div).
        It is expected to use tags, used to contain heading or phrasing content.
        If prop is not specified, it is set to the value of the elementsMap object,
        where the key is variant-prop, which defaults to 'body1'.`,
            table: {
                defaultValue: {
                    detail: JSON.stringify(elementsMap, null, 2),
                    summary: 'elementsMap',
                },
            },
            type: 'string',
        },

        children: {
            table: { type: { summary: 'string' } },
            type: { name: 'string', required: true },
        },

        ref: {
            description: 'A ref, forwarded to the root slot of the typography component',
            table: { type: { summary: 'Ref<ElementRef<T>>, T extends ElementType' } },
        },

        variant: {
            control: { type: 'select' },
            description: `Variant prop is used to add appropriate class name to root tag.
        It is also used to set as-prop if it is not specified.`,
            options,
            table: {
                defaultValue: { summary: 'body1' },
                type: {
                    detail: JSON.stringify(options, null, 2),
                    summary: 'TypographyVariant',
                },
            },
        },
    },

    component: Typography,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '65ch' }}>
                <Story />
            </div>
        ),
    ],
    parameters: { docs: { toc: false } },
    tags: ['autodocs'],
    title: 'shared/ui/typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        as: undefined,
        children: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
Asperiores corporis error esse et in, itaque nam numquam
similique voluptatibus? Enim?`,
    },
}

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

export const Caption: Story = {
    args: {
        children: 'Caption text',
        variant: 'caption',
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
