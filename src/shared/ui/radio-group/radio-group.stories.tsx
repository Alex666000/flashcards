import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Option, RadioGroup } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/Radio Group',
} satisfies Meta<typeof RadioGroup>

const baseData: Option[] = [
  { label: 'First', value: '1' },
  { label: 'Second', value: '2' },
  { label: 'Third', value: '3' },
]

export default meta
type Story = StoryObj<typeof meta>

export const DefaultControlledGroup: Story = {
  args: {
    options: baseData,
  },

  render: (args) => {
    const [value, setValue] = useState('1')

    return (
      <>
        <RadioGroup {...args} onValueChange={setValue} value={value} />
        <div style={{ marginTop: '10px' }}>Selected value: {value}</div>
      </>
    )
  },
}

export const DisabledGroup: Story = {
  args: {
    disabled: true,
    options: baseData,
    value: '1',
  },
}

export const GroupWithError: Story = {
  args: {
    errorMessage: 'Some error-page occurred',
    options: baseData,
    value: '1',
  },
}
