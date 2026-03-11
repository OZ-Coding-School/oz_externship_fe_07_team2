import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TabButton, EmptyState } from '@/components'

const SAMPLE_TABS = [
  { value: 'all', label: '전체보기' },
  { value: 'answered', label: '답변완료' },
  { value: 'waiting', label: '답변 대기중' },
]

const meta: Meta<typeof TabButton> = {
  title: 'Common/TabButton',
  component: TabButton,
  tags: ['autodocs'],
  args: {
    tabs: SAMPLE_TABS,
    value: 'all',
  },
}

export default meta

type Story = StoryObj<typeof TabButton>

// 기본 스토리 - 인터랙티브하게 클릭 가능
const DefaultTabButton = () => {
  const [value, setValue] = useState('all')
  return <TabButton tabs={SAMPLE_TABS} value={value} onValueChange={setValue} />
}

export const Default: Story = {
  render: () => <DefaultTabButton />,
}

// 첫 번째 탭 선택
export const FirstTab: Story = {
  args: {
    value: 'all',
    onValueChange: () => {},
  },
}

// 두 번째 탭 선택
export const SecondTab: Story = {
  args: {
    value: 'answered',
    onValueChange: () => {},
  },
}

// 탭이 2개일 때
const TwoTabsButton = () => {
  const [value, setValue] = useState('all')
  return (
    <TabButton
      tabs={[
        { value: 'all', label: '전체보기' },
        { value: 'answered', label: '답변완료' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const TwoTabs: Story = {
  render: () => <TwoTabsButton />,
}

// 탭 + EmptyState 조합
const TabWithEmptyState = () => {
  const [value, setValue] = useState('all')
  return (
    <div className="w-150">
      <TabButton tabs={SAMPLE_TABS} value={value} onValueChange={setValue} />
      <EmptyState type="emptyState" />
    </div>
  )
}

export const WithEmptyState: Story = {
  render: () => <TabWithEmptyState />,
}
