import type { Meta, StoryObj } from '@storybook/react'

import { LogoutIcon } from '@/shared/assets/icons/componentsIcons'

import { Button, ButtonVariant } from './button'

const meta = {
    // не обязательный параметр
    argTypes: {
        title: {
            control: { type: 'text' },
        },
        // prop
        variant: {
            // настраиваем наши контроли - чтобы визуально в интерфейсе сторибука кликать выбирать
            control: { type: 'radio' },
            // опции пропа variant
            options: ButtonVariant,
        },
    },
    // компонент который покажем
    component: Button,
    // все истории и контроли видим в одном файле
    tags: ['autodocs'],
    // название компонента и где он находится
    title: 'shared/ui/button',
    // если satisfies горит красным обнови вебшторм
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Истории:
export const Primary: Story = {
    // пропсы компонента - для более сложных компонент делается через функцию render()
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

export const Link: Story = {
    args: {
        // взяли пропсы Primary - и переопределили 2 пропса со своими значениями
        ...Primary.args,
        children: 'Full width Button',
        fullWidth: true,
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
        // Тут любой компонент или тэг
        as: 'a', // ссылка
        children: 'Link that looks like a button',
        href: 'https://google.com',
        variant: 'primary',
    },
}

export const PrimaryWithIcon: Story = {
    args: {
        // добавили пропс иконку
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
