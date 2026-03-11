import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsLeft, ChevronRight } from 'lucide-react'
import { fn } from 'storybook/test'

import NavButton from './NavButton'

const meta = {
  title: 'Common/Pagination/NavButton',
  component: NavButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof NavButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: ChevronsLeft,
    ariaLabel: '첫 페이지',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    icon: ChevronsLeft,
    ariaLabel: '첫 페이지',
    disabled: true,
  },
}

export const NextButton: Story = {
  args: {
    icon: ChevronRight,
    ariaLabel: '다음 페이지',
    disabled: false,
  },
}
