import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'outline',
        'text',
        'textAccent',
        'textMuted',
        'ghost',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['md', 'full'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'lg',
  },
}

export const Outline: Story = {
  args: {
    children: '답변 수정하기',
    variant: 'outline',
    rounded: 'full',
    size: 'sm',
  },
}

export const Small: Story = {
  args: {
    children: '확인',
    variant: 'primary',
    rounded: 'full',
    size: 'sm',
  },
}

export const Text: Story = {
  args: {
    children: '필터',
    variant: 'text',
    size: 'sm',
    rounded: 'full',
  },
}

export const TextAccent: Story = {
  args: {
    children: '최신순',
    variant: 'textAccent',
    size: 'md',
  },
}

export const TextMuted: Story = {
  args: {
    children: '오래된순',
    variant: 'textMuted',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: '챗봇에게 물어보기',
    variant: 'ghost',
    size: 'sm',
    rounded: 'full',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'lg',
    disabled: true,
  },
}
