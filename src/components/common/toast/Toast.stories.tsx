import type { Meta, StoryObj } from '@storybook/react-vite'

import Toast from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: {
    type: 'success',
    message: '질문이 등록되었습니다.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    message: '질문 등록에 실패했습니다. 다시 시도해 주세요.',
  },
}
