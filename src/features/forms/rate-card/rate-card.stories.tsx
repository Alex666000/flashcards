import type { Meta, StoryObj } from '@storybook/react'

import { RateCardForm, RateType } from './rate-card'

const meta = {
  component: RateCardForm,
  title: 'features/forms/rate-card',
} satisfies Meta<typeof RateCardForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: RateType) => {
      alert(JSON.stringify(data))
    }

    return <RateCardForm onSubmit={onSubmit} />
  },
}
