import { CardForm } from '@/features/forms/card/card'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: CardForm,
  title: 'Forms/Card',
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

export const WithPicture: Story = {
  args: {} as any,
  render: () => {
    const onSubmit = (data: FormData) => {
      alert(JSON.stringify(data))
    }

    return <CardForm onCancel={() => alert('Cancel')} onSubmit={onSubmit} />
  },
}
