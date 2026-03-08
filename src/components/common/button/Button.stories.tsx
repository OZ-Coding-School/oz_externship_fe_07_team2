import { Button } from '@/components'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'md',
    // disabled: true,
  },
}

export const Small: Story = {
  args: {
    children: '확인',
    size: 'sm',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button ㅅㅅㅅㅅ',
    disabled: true,
  },
}
