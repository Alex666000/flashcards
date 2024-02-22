import { CheckEmailPage } from '@/pages'
import { BrowserRouterDecorator } from '@/shared/config'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  component: CheckEmailPage,
  decorators: [BrowserRouterDecorator],
  tags: ['autodocs'],
  title: 'Pages/Check Email',
} satisfies Meta<typeof CheckEmailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
