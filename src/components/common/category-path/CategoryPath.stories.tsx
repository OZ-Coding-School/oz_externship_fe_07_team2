import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import CategoryPath from './CategoryPath'

const SAMPLE_CATEGORY = ['프론트엔드', '프로그래밍 언어', 'Python']

const meta: Meta<typeof CategoryPath> = {
  title: 'Common/CategoryPath',
  component: CategoryPath,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['list', 'detail'],
    },
  },
  args: {
    path: SAMPLE_CATEGORY,
    variant: 'list',
  },
}

export default meta

type Story = StoryObj<typeof CategoryPath>

const DefaultCategory = () => {
  return <CategoryPath path={SAMPLE_CATEGORY} variant="list" />
}

// 기본 스토리 - 목록
export const Default: Story = {
  render: () => <DefaultCategory />,
}

// 답변 상세
export const DetailCategory: Story = {
  args: {
    path: SAMPLE_CATEGORY,
    variant: 'detail',
  },
}

// 클릭 인터랙션
const InteractiveCategoryPath = () => {
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  const handleClick = (index: number) => {
    setSelectedPath(SAMPLE_CATEGORY.slice(0, index + 1))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {SAMPLE_CATEGORY.map((cat, index) => (
          <button
            key={cat}
            onClick={() => handleClick(index)}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>
      {selectedPath.length > 0 && (
        <div className="flex flex-col gap-4">
          <CategoryPath path={selectedPath} variant="list" />
          <CategoryPath path={selectedPath} variant="detail" />
        </div>
      )}
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveCategoryPath />,
}
