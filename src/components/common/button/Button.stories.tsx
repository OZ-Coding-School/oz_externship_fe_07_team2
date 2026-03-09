import { Button } from '@/components'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'soft', 'text'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
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

export const textAccent: Story = {
  args: {
    children: '최신순',
    variant: 'textAccent',
    size: 'md',
  },
}

export const WithRightIcon: Story = {
  args: {
    children: '최신순',
    variant: 'text',
    size: 'sm',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}
