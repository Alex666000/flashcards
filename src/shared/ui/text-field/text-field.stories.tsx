import { Meta, StoryObj } from '@storybook/react'

import * as InputStories from '../input/input.stories'
import { TextField, TextFieldSlot } from './text-field'

// prettier-ignore
const textFieldClassesObj = Object.fromEntries(
  (['textFieldRoot', 'root', 'message', 'label', 'input'] as TextFieldSlot[]).map(
    slot => [slot, 'string']
  )
)
const textFieldClasses =
    JSON.stringify(textFieldClassesObj, null, 2) +
    ` & {
    "rootDisabled": "string",
    "inputError": "string",
    ...etc
  }`

/**
 * TextField element based on common [Input](?path=/docs/components-input--docs) element.
 * Almost all [Input props](#input-specific-props) are supported.
 * */
const meta = {
    argTypes: {
        label: {
            description: `Label is used to give context about a field's input,
        such as how the input will be used.`,
            table: { type: { summary: 'string ' } },
        },
        message: {
            description: `Message element is used to provide feedback to the user,
        such as an error message. Provide a space character to preserve a message slot and its layout
        to avoid shifting the layout after the message appears.
        `,
            table: { type: { summary: 'string ' } },
        },
        ...InputStories.default.argTypes,

        classes: {
            description: InputStories.default.argTypes.classes.description,
            table: {
                defaultValue: { summary: 'undefined' },
                type: {
                    detail: textFieldClasses,
                    summary: "WithModifiers<TextFieldClasses, 'disabled' | 'error'>",
                },
            },
        },
    },

    component: TextField,
    decorators: InputStories.default.decorators,
    parameters: { docs: { autodocs: false } },
    title: 'shared/ui/text-field',
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    argTypes: InputStories.Primary.argTypes,
    args: {
        label: 'label',
        message: 'descriptive message',
        ...InputStories.Primary.args,
    },
}
export const Error: Story = {
    args: {
        ...Primary.args,
        ...InputStories.Error.args,
    },
}

export const StartAdornment: Story = {
    argTypes: Primary.argTypes,
    args: {
        ...Primary.args,
        ...InputStories.StartAdornment.args,
    },
}

export const EndAdornment: Story = {
    argTypes: Primary.argTypes,
    args: {
        ...Primary.args,
        ...InputStories.EndAdornment.args,
    },
}

export const BothAdornments: Story = {
    argTypes: Primary.argTypes,
    args: {
        ...Primary.args,
        ...InputStories.BothAdornments.args,
    },
}
