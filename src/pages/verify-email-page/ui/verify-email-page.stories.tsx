import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/app'
import { VerifyEmailPage } from '@/pages'

const meta = {
  argTypes: {},
  component: VerifyEmailPage,
  title: 'pages/verify-email-page',
} satisfies Meta<typeof VerifyEmailPage>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultVerifyMail: Story = {
  args: {},
  render: () => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <VerifyEmailPage />
        </Provider>
      </BrowserRouter>
    )
  },
}
