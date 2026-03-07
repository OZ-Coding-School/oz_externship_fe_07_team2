import type { Meta, StoryObj } from '@storybook/react-vite'
import sampleAvatar from '@/assets/images/sample-avatar.jpg'

import { Avatar } from '@/components'

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: sampleAvatar,
    alt: '프로필이미지',
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

const DefaultAvatar = () => {
  return <Avatar src={sampleAvatar} size="xl" />
}

export const Default: Story = {
  render: () => <DefaultAvatar />,
}

export const ListAvatar: Story = {
  args: {
    size: 'sm',
  },
}
export const ChatAvatar: Story = {
  args: {
    size: 'md',
  },
}
export const AnswerAvatar: Story = {
  args: {
    size: 'lg',
  },
}
export const NoAvatar: Story = {
  args: {
    src: undefined,
    size: 'lg',
  },
}
