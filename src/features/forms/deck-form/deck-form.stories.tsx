import { DeckForm } from '@/features/forms/deck/deck'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: DeckForm,
  title: 'Forms/Pack',
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
