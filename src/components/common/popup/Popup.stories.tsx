import type { Meta, StoryObj } from '@storybook/react-vite'

import { Popup } from '@/components'
import { useState } from 'react'

const POPUP_MESSAGES = {
  DELETE_POST:
    '삭제된 내용은 복수할 수 없습니다. \n게시글을 정말로 삭제하시겠습니까?',
  REQUEST_POST: '질문 내용을 입력해주세요.',
}

const meta: Meta<typeof Popup> = {
  title: 'Common/Popup',
  component: Popup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Popup>

// 버튼 2개 (삭제 / 확인)
const ConfirmPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Popup
      isOpen={isOpen}
      content={POPUP_MESSAGES.DELETE_POST}
      confirmLabel="삭제"
      onConfirm={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
    />
  )
}

const AlertPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Popup
      isOpen={isOpen}
      content={POPUP_MESSAGES.REQUEST_POST}
      onConfirm={() => setIsOpen(false)}
    />
  )
}

export const Confirm: Story = {
  render: () => <ConfirmPopup />,
}

export const Alert: Story = {
  render: () => <AlertPopup />,
}
