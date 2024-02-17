import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/app/providers'
import { VerifyEmailPage } from '@/pages/verify-email-page/verify-email-page'

const meta = {
  argTypes: {},
  component: VerifyEmailPage,
  tags: ['autodocs'],
  title: 'Components/VerifyEmailPage',
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
