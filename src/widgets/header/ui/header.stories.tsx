import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouterDecorator } from '@/shared/config/storybook/decorators/browser-router-decorator'
import { Header } from '@/widgets'

const meta = {
  component: Header,
  decorators: [BrowserRouterDecorator],
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const AuthorizedUser: Story = {
  args: {
    // @ts-ignore
    data: {
      avatar: '',
      email: 'user-email.gmail.com',
      name: 'User name',
    },
    logout: () => {},
  },
}

export const UnauthorizedUser: Story = {
  args: {
    // @ts-ignore
    data: null,
    logout: () => {},
  },
}
