import type { Meta } from '@storybook/react'

import { Icon } from '@/shared/ui/icon'

import { IconButton } from './'

const meta = {
  component: IconButton,
  tags: ['autodocs'],
  title: 'shared/ui/icon-button',
} satisfies Meta<typeof IconButton>

export default meta

export const Default = {
  render() {
    return (
      <div style={{ columnGap: '24px', display: 'flex' }}>
        <IconButton icon={<Icon height={22} name={'cross'} width={22} />} />
        <IconButton icon={<Icon height={22} name={'edit'} width={22} />} />
        <IconButton icon={<Icon height={22} name={'trash-bin'} width={22} />} />
      </div>
    )
  },
}

export const Small = {
  render() {
    return (
      <div style={{ columnGap: '24px', display: 'flex' }}>
        <IconButton icon={<Icon height={16} name={'cross'} width={16} />} small />
        <IconButton icon={<Icon height={16} name={'edit'} width={16} />} small />
        <IconButton icon={<Icon height={16} name={'trash-bin'} width={16} />} small />
      </div>
    )
  },
}
