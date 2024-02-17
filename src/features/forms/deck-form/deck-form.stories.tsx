import { DeckForm } from '@/features/forms/deck-form/deck-form'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DeckForm,
  title: 'Forms/Deck',
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
