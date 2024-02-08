import type { Meta, StoryObj } from '@storybook/react'

import { useEffect, useState } from 'react'

import { Avatar } from '@/shared/ui/avatar_/avatar'

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarStory: Story = {
  args: {
    image: 'https://aquarium-fish-home.ru/wp-content/uploads/2019/08/s1200-3.jpg',
    userName: 'Jon Frieda',
  },
}

export const AvatarFallback: Story = {
  args: {
    userName: 'Jon Frieda',
  },
}

export const DelayedAvatarLoading = {
  args: {},
  render: () => {
    const [img, setImg] = useState<string | undefined>(undefined)

    useEffect(() => {
      const id = setTimeout(() => {
        setImg('https://aquarium-fish-home.ru/wp-content/uploads/2019/08/s1200-3.jpg')
      }, 3000)

      return () => {
        clearInterval(id)
      }
    }, [])

    return <Avatar image={img} userName={'Jon Frieda'} />
  },
}

export const AvatarWithInlineStyles = {
  args: {},
  render: () => {
    const [img, setImg] = useState<string | undefined>(undefined)

    useEffect(() => {
      const id = setTimeout(() => {
        setImg('https://aquarium-fish-home.ru/wp-content/uploads/2019/08/s1200-3.jpg')
      }, 3000)

      return () => {
        clearInterval(id)
      }
    }, [])

    return (
      <Avatar
        image={img}
        size={50}
        style={{ border: '2px solid yellow' }}
        userName={'Jon Frieda'}
      />
    )
  },
}
