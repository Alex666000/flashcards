import { useState } from 'react'

import { TabSwitcher } from '@/shared/ui/tab-switcher/tab-switcher'
import { Meta } from '@storybook/react'

const meta = {
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/Tab Switcher',
} satisfies Meta<typeof TabSwitcher>

export default meta

const tabs = [
  { text: 'My cards', value: 'myCards' },
  { text: 'All cards', value: 'allCards' },
  { text: 'Other', value: 'other' },
  { disabled: true, text: 'Disabled', value: 'disabled' },
]

export const Default = {
  render: () => {
    const [value, setValue] = useState('myCards')

    return (
      <div>
        <TabSwitcher onValueChange={(value) => setValue(value)} tabs={tabs} value={value} />
        <p style={{ marginTop: '36px' }}>{value}</p>
      </div>
    )
  },
}
