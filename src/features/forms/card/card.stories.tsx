import { Meta, StoryObj } from '@storybook/react'

import { CardForm } from './card'

const meta = {
  component: CardForm,
  title: 'features/forms/user-card-for-learn',
} satisfies Meta<typeof CardForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data))
    }

    return <CardForm onCancel={() => alert('Cancel')} onSubmit={onSubmit} />
  },
}
