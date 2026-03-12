import { type ComponentProps, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import Pagination from './Pagination'

const meta = {
  title: 'Common/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
  },
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

function PaginationStory(args: ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(args.currentPage)

  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(nextPage) => {
        setPage(nextPage)
        args.onPageChange(nextPage)
      }}
    />
  )
}

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  render: (args) => <PaginationStory {...args} />,
}

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  render: (args) => <PaginationStory {...args} />,
}

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
  render: (args) => <PaginationStory {...args} />,
}

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
  render: (args) => <PaginationStory {...args} />,
}

export const ManyPages: Story = {
  args: {
    currentPage: 8,
    totalPages: 20,
  },
  render: (args) => <PaginationStory {...args} />,
}
