import { CloseIcon } from '@/shared/assets/icons/componentsIcons/CloseIcon'
import { EyeIcon } from '@/shared/assets/icons/componentsIcons/EyeIcon'
import { SearchIcon } from '@/shared/assets/icons/componentsIcons/SearchIcon'
import { Meta, StoryObj } from '@storybook/react'

import { Input, InputAdornment, InputClasses } from './input'

const inputClasses =
    JSON.stringify({ input: 'string', root: 'string' } as InputClasses, null, 2) +
    ` & {
    "rootDisabled": "string",
    "inputError": "string",
    ...etc
  }`

const inputAdornmentArgType = {
    description: `Может использоваться для расширения функциональности ввода или его дизайна/разметки.
    Это может быть любой произвольный элемент реакции, но рекомендуется обернуть такой элемент
    в элемент \`InputAdornment\`, который предоставляет стили для выравнивания и ограничения размера
    его содержимого.`,
    table: { type: { summary: 'ReactNode' } },
}

/**
 * Общий элемент ввода, основанный на родном элементе ввода react.
 * Он может использоваться как в неконтролируемом, так и в контролируемом режиме.
 * */
const meta = {
    argTypes: {
        classes: {
            description: `Объект, содержащий имена классов, соответствующих
        слотам компонента. Предоставленные имена классов будут объединены с именами слотов по умолчанию.\t
        Дополнительно вы можете указать имена слотов в сочетании с модификаторами с заглавной буквы
        типа \`disabled | error\` вместо того, чтобы вручную вычислять имена классов
        на основе значений соответствующих реквизитов.`,
            table: {
                defaultValue: { summary: 'undefined' },
                type: {
                    detail: inputClasses,
                    summary: "WithModifiers<InputClasses, 'disabled' | 'error'>",
                },
            },
        },

        disabled: { table: { type: { summary: 'boolean' } } },

        endAdornment: inputAdornmentArgType,

        error: { table: { type: { summary: 'boolean' } } },

        onValueChange: {
            description: `Обработчик события, вызываемый при изменении значения.`,
            table: { type: { summary: '(value: string) => void' } },
        },

        placeholder: { table: { type: { summary: 'string' } } },

        startAdornment: inputAdornmentArgType,

        type: {
            description: 'The type is assigned to a native react element',
        },
    },

    component: Input,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '35ch' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    title: 'shared/ui/input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const getAdornments = (position: 'end' | 'start' = 'start') => ({
    'close icon': (
        <InputAdornment position={position}>
            <CloseIcon />
        </InputAdornment>
    ),
    'eye icon': (
        <InputAdornment position={position}>
            <EyeIcon size={1.6} />
        </InputAdornment>
    ),
    'search icon': (
        <InputAdornment position={position}>
            <SearchIcon size={1.2} />
        </InputAdornment>
    ),
})

const options = Object.keys(getAdornments())

export const Default: Story = {
    argTypes: {
        endAdornment: {
            mapping: getAdornments('end'),
            options,
        },
        startAdornment: {
            mapping: getAdornments('start'),
            options,
        },
    },
    args: { disabled: false, error: false, placeholder: 'placeholder' },
}

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled input',
        placeholder: 'Disabled Input',
        type: 'text',
    },
}

export const Error: Story = {
    argTypes: Default.argTypes,
    args: {
        ...Default.args,
        error: true,
    },
}

export const StartAdornment: Story = {
    argTypes: Default.argTypes,
    args: { ...Default.args, startAdornment: 'search icon' },
}

export const EndAdornment: Story = {
    argTypes: Default.argTypes,
    args: { ...Default.args, endAdornment: 'eye icon' },
}

export const BothAdornments: Story = {
    argTypes: Default.argTypes,
    args: {
        ...StartAdornment.args,
        ...EndAdornment.args,
    },
}
