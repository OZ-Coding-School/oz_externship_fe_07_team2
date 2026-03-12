import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import ModalButton from './ModalButton'

const meta: Meta<typeof ModalButton> = {
  title: 'Common/ModalButton',
  component: ModalButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof ModalButton>

const options = [
  { label: '최신순', value: 'latest' },
  { label: '오래된 순', value: 'oldest' },
]

/** Wrapper Component (Hook은 여기서만 사용) */
function ModalButtonStory(args: React.ComponentProps<typeof ModalButton>) {
  const [value, setValue] = useState(args.value ?? 'latest')

  return <ModalButton {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => <ModalButtonStory {...args} />,
  args: {
    options,
  },
}

export const Disabled: Story = {
  render: (args) => <ModalButtonStory {...args} />,
  args: {
    options,
    disabled: true,
  },
}

// 정렬 선택이 없는 상태 (초기값)
export const WithPlaceholder: Story = {
  render: (args) => <ModalButtonStory {...args} />,
  args: {
    options,
    placeholder: '정렬 선택',
    value: '',
  },
}
