import { Meta, StoryObj } from '@storybook/react'

import { DeckForm } from './deck-form'

const meta = {
  component: DeckForm,
  title: 'features/forms/deck',
} satisfies Meta<typeof DeckForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data))
    }

    return <DeckForm onCancel={() => alert('Cancel')} onSubmit={onSubmit} />
  },
}
