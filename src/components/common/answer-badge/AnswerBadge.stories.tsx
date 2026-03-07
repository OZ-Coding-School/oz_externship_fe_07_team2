import type { Meta, StoryObj } from '@storybook/react-vite'

import { AnswerBadge } from '@/components'

const meta: Meta<typeof AnswerBadge> = {
  title: 'Common/AnswerBadge',
  component: AnswerBadge,
  tags: ['autodocs'],
  args: {
    variant: 'unanswered',
    size: 'sm',
  },
}

export default meta

type Story = StoryObj<typeof AnswerBadge>

const DefaultAnswerBadge = () => {
  return <AnswerBadge variant="unanswered" size="sm" />
}

export const Default: Story = {
  render: () => <DefaultAnswerBadge />,
}

export const Answered: Story = {
  args: {
    variant: 'answered',
    size: 'sm',
  },
}

export const Detail: Story = {
  args: {
    variant: 'detail',
    size: 'md',
  },
}
