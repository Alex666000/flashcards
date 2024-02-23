import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

import { TextField } from '../text-field_'
import { Card } from './'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'shared/ui/card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div style={{ height: '100px' }}>Hello developer!</div>,
  },
}

export const ExampleWithContent: Story = {
  args: {
    children: (
      <>
        <Typography variant={'large'}>Card</Typography>
        <TextField label={'Uncontrolled text field'} />
        <TextField label={'Uncontrolled search'} type={'search'} />
        <Button as={'a'} href={'https://google.com'} variant={'link'}>
          Google
        </Button>
      </>
    ),
  },
}
