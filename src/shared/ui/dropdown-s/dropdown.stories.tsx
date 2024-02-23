import { Edit } from '@/shared/assets/icons/sutarday-icons/Edit'
import { Play } from '@/shared/assets/icons/sutarday-icons/Play'
import { Trash } from '@/shared/assets/icons/sutarday-icons/Trash'
import { Meta, StoryObj } from '@storybook/react'

import { Dropdown, DropdownItemWithIcon } from '.'
import { Button } from '../button'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'shared/ui/dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <Dropdown {...args}>
          <>
            <DropdownItemWithIcon icon={<Play />} onSelect={() => {}} text={'Learn'} />
            <DropdownItemWithIcon icon={<Edit />} onSelect={() => {}} text={'Edit'} />
            <DropdownItemWithIcon icon={<Trash />} onSelect={() => {}} text={'Delete'} />
          </>
        </Dropdown>
      </div>
    )
  },
}
export const WithAlign: Story = {
  args: {
    align: 'center',
    children: <></>,
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown {...args}>
          <>
            <DropdownItemWithIcon icon={<Play />} onSelect={() => {}} text={'Learn'} />
            <DropdownItemWithIcon icon={<Edit />} onSelect={() => {}} text={'Edit'} />
            <DropdownItemWithIcon icon={<Trash />} onSelect={() => {}} text={'Delete'} />
          </>
        </Dropdown>
      </div>
    )
  },
}
export const AllDisabled: Story = {
  args: {
    align: 'center',
    children: <></>,
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dropdown {...args}>
          <>
            <DropdownItemWithIcon disabled icon={<Play />} onSelect={() => {}} text={'Learn'} />
            <DropdownItemWithIcon disabled icon={<Edit />} onSelect={() => {}} text={'Edit'} />
            <DropdownItemWithIcon disabled icon={<Trash />} onSelect={() => {}} text={'Delete'} />
          </>
        </Dropdown>
      </div>
    )
  },
}

// @ts-ignore
export const WithTriggerButton: Story = {
  render: (args) => {
    return (
      <div>
        <Dropdown
          trigger={
            <button>
              <Button>Trigger?</Button>
            </button>
          }
          {...args}
        >
          <>
            <DropdownItemWithIcon icon={<Play />} onSelect={() => {}} text={'Learn'} />
            <DropdownItemWithIcon icon={<Edit />} onSelect={() => {}} text={'Edit'} />
            <DropdownItemWithIcon icon={<Trash />} onSelect={() => {}} text={'Delete'} />
          </>
        </Dropdown>
      </div>
    )
  },
}
