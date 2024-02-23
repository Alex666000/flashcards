import { CheckEmailPage } from '@/pages'
import { BrowserRouterDecorator } from '@/shared/config'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  component: CheckEmailPage,
  decorators: [BrowserRouterDecorator],
  title: 'pages/check-email',
} satisfies Meta<typeof CheckEmailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
