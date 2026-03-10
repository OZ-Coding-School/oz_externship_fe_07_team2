import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import Dropdown from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Dropdown>

type CategoryOption = {
  id: number
  value: string
  parentId?: number
}

const largeOptions = [
  { id: 1, value: '프론트엔드' },
  { id: 2, value: '백엔드' },
]

const mediumOptions: CategoryOption[] = [
  { id: 1, value: 'React', parentId: 1 },
  { id: 2, value: 'Vue', parentId: 1 },
  { id: 3, value: 'Node', parentId: 2 },
  { id: 4, value: 'Spring', parentId: 2 },
]

const smallOptions: CategoryOption[] = [
  { id: 1, value: 'Hooks', parentId: 1 },
  { id: 2, value: 'State', parentId: 1 },
  { id: 3, value: 'Composition API', parentId: 2 },
  { id: 4, value: 'Vue Router', parentId: 2 },
  { id: 5, value: 'Express', parentId: 3 },
  { id: 6, value: 'NestJS', parentId: 3 },
  { id: 7, value: 'Spring Boot', parentId: 4 },
]

const longOptions = Array.from({ length: 14 }, (_, index) => ({
  id: index + 1,
  value: `Select ${String(index + 1).padStart(2, '0')}`,
}))

const QuestionWritePage = () => {
  const [largeValue, setLargeValue] = useState<string>()
  const [mediumValue, setMediumValue] = useState<string>()
  const [smallValue, setSmallValue] = useState<string>()
  const [largeOpen, setLargeOpen] = useState(true)

  const selectedLarge = largeOptions.find(
    (option) => option.value === largeValue
  )
  const selectedMedium = mediumOptions.find(
    (option) => option.value === mediumValue
  )

  const filteredMediumOptions = mediumOptions
    .filter((option) => option.parentId === selectedLarge?.id)
    .map(({ id, value }) => ({ id, value }))

  const filteredSmallOptions = smallOptions
    .filter((option) => option.parentId === selectedMedium?.id)
    .map(({ id, value }) => ({ id, value }))

  return (
    <div className="min-h-[420px] w-[760px] rounded-2xl border border-gray-200 bg-white p-8 pb-44">
      <div className="mb-6 border-b border-gray-200 pb-4 text-3xl font-bold text-black">
        질문 작성하기
      </div>
      <div className="rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-3 gap-2">
          <Dropdown
            variant="overlay"
            options={largeOptions}
            placeHolder="대분류 선택"
            value={largeValue}
            open={largeOpen}
            onOpenChange={setLargeOpen}
            onSelect={(option) => {
              setLargeValue(option.value)
              setMediumValue(undefined)
              setSmallValue(undefined)
              setLargeOpen(false)
            }}
          />
          <Dropdown
            variant="overlay"
            options={filteredMediumOptions}
            placeHolder="중분류 선택"
            value={mediumValue}
            onSelect={(option) => {
              setMediumValue(option.value)
              setSmallValue(undefined)
            }}
            disabled={!largeValue}
          />
          <Dropdown
            variant="overlay"
            options={filteredSmallOptions}
            placeHolder="소분류 선택"
            value={smallValue}
            onSelect={(option) => setSmallValue(option.value)}
            disabled={!mediumValue}
          />
        </div>
      </div>
    </div>
  )
}

const FilterPage = () => {
  const [largeValue, setLargeValue] = useState<string>('Select 01')
  const [mediumValue, setMediumValue] = useState<string>()
  const [smallValue, setSmallValue] = useState<string>()
  const [largeOpen, setLargeOpen] = useState(true)
  const [mediumOpen, setMediumOpen] = useState(false)

  const selectedLarge = longOptions.find(
    (option) => option.value === largeValue
  )
  const selectedMedium = mediumOptions.find(
    (option) => option.value === mediumValue
  )

  const filterMediumOptions = mediumOptions
    .filter((option) =>
      selectedLarge
        ? option.parentId === ((selectedLarge.id - 1) % 2) + 1
        : false
    )
    .map(({ id, value }) => ({ id, value }))

  const filterSmallOptions = smallOptions
    .filter((option) => option.parentId === selectedMedium?.id)
    .map(({ id, value }) => ({ id, value }))

  return (
    <div className="min-h-[760px] w-[360px] bg-white px-8 py-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="text-4xl font-bold text-black">필터</div>
        <button className="text-4xl leading-none text-gray-400">×</button>
      </div>
      <div className="mb-4 text-base font-semibold text-gray-700">
        카테고리 선택
      </div>
      <div className="space-y-3">
        <Dropdown
          variant="inline"
          options={longOptions}
          placeHolder="대분류"
          value={largeValue}
          open={largeOpen}
          onOpenChange={setLargeOpen}
          onSelect={(option) => {
            setLargeValue(option.value)
            setMediumValue(undefined)
            setSmallValue(undefined)
            setLargeOpen(false)
            setMediumOpen(true)
          }}
        />
        <Dropdown
          variant="inline"
          options={filterMediumOptions}
          placeHolder="중분류"
          value={mediumValue}
          open={mediumOpen}
          onOpenChange={setMediumOpen}
          onSelect={(option) => {
            setMediumValue(option.value)
            setSmallValue(undefined)
            setMediumOpen(false)
          }}
          disabled={!largeValue}
        />
        <Dropdown
          variant="inline"
          options={filterSmallOptions}
          placeHolder="소분류"
          value={smallValue}
          onSelect={(option) => setSmallValue(option.value)}
          disabled={!mediumValue}
        />
      </div>
    </div>
  )
}

export const QuestionWriteLayout: Story = {
  render: () => <QuestionWritePage />,
}

export const FilterLayout: Story = {
  render: () => <FilterPage />,
}
