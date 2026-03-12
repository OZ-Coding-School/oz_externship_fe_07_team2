import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, Input, Textarea } from '@/components'

const meta = {
  title: 'Common/InputState',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

const inputStates = [
  {
    label: 'Default',
    node: <Input placeholder="Placeholder" className="text-text-main w-full" />,
  },
  {
    label: 'Focus',
    node: (
      <Input
        placeholder="Placeholder"
        defaultValue="Placeholder"
        className="border-primary text-text-main w-full outline-none"
      />
    ),
  },
  {
    label: 'Input Text',
    node: (
      <Input
        defaultValue="입력된 텍스트입니다."
        className="text-text-main w-full"
      />
    ),
  },
  {
    label: 'Error',
    node: (
      <div className="w-full">
        <Input
          placeholder="Placeholder"
          status="error"
          className="text-text-main w-full"
        />
        <p className="mt-2 text-xs text-red-500">에러 메시지 텍스트</p>
      </div>
    ),
  },
  {
    label: 'Success',
    node: (
      <div className="w-full">
        <Input
          defaultValue="사용 가능한 값입니다."
          status="success"
          className="text-text-main w-full"
        />
        <p className="mt-2 text-xs text-green-600">성공 상태 텍스트</p>
      </div>
    ),
  },
]

const textareaStates = [
  {
    label: 'Default',
    node: (
      <Textarea
        placeholder="소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다."
        className="text-text-main w-full"
        action={
          <Button
            disabled
            variant="outline"
            size={'sm'}
            rounded="full"
            className="px-[26px]"
          >
            등록
          </Button>
        }
      />
    ),
  },
  {
    label: 'Focus',
    node: (
      <Textarea
        defaultValue="text text text text text text text text"
        className="border-primary text-text-main w-full outline-none"
      />
    ),
  },
  {
    label: 'Input Text',
    node: (
      <Textarea
        defaultValue="text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text"
        className="text-text-main w-full"
      />
    ),
  },
  {
    label: 'With Action',
    node: (
      <Textarea
        defaultValue="작성한 내용을 등록할 수 있습니다."
        className="text-text-main w-full"
        action={
          <Button
            variant="outline"
            size={'sm'}
            rounded="full"
            className="px-[26px]"
          >
            등록
          </Button>
        }
      />
    ),
  },
  {
    label: 'Disabled',
    node: (
      <Textarea
        placeholder="비활성화 상태"
        disabled
        className="text-text-main w-full"
      />
    ),
  },
]

function StateSection({
  title,
  items,
}: {
  title: string
  items: { label: string; node: ReactNode }[]
}) {
  return (
    <section className="border-primary-200 bg-surface-default rounded-3xl border border-dashed p-6">
      <h2 className="text-text-main mb-6 text-2xl font-semibold">{title}</h2>
      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-4"
          >
            <p className="text-text-main pt-3 text-sm font-medium">
              {item.label}
            </p>
            {item.node}
          </div>
        ))}
      </div>
    </section>
  )
}

export const Overview: Story = {
  render: () => (
    <div className="bg-surface-sub min-h-screen p-8 md:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="bg-primary-100 mb-8 rounded-2xl px-6 py-4 text-center">
          <h1 className="text-text-main text-3xl font-bold">Input State</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <StateSection title="Input" items={inputStates} />
          <StateSection title="Textarea" items={textareaStates} />
        </div>
      </div>
    </div>
  ),
}
