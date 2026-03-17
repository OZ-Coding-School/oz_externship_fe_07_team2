import { useState } from 'react'

import type { Editor } from '@tiptap/core'
import { ChevronDown, List, ListOrdered } from 'lucide-react'

import { Group, IconBtn } from '../ToolbarPrimitives'

type ListMenuItem = {
  label: string
  icon: React.ReactNode
  action: () => void
}

export default function ListGroup({ editor }: { editor: Editor | null }) {
  const [open, setOpen] = useState(false)

  if (!editor) return null

  const menuItems: ListMenuItem[] = [
    {
      label: '글머리 기호',
      icon: <List size={13} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: '번호 매기기',
      icon: <ListOrdered size={13} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ]

  const handleMenuClick = (action: () => void) => {
    action()
    setOpen(false)
  }

  const isActive =
    editor.isActive('bulletList') || editor.isActive('orderedList')

  const handletoggleClick = () => setOpen((prev) => !prev)

  return (
    <Group withDivider>
      <div className="relative flex items-center">
        {/* 글머리 기호 토글 버튼 */}
        <IconBtn
          title="글머리 기호"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={isActive}
        >
          <List size={18} />
        </IconBtn>

        {/* 드롭다운 토글 버튼 */}
        <button
          type="button"
          onClick={handletoggleClick}
          className="flex h-8 w-4 items-center justify-center rounded hover:bg-gray-100"
        >
          <ChevronDown size={10} className="text-gray-500" />
        </button>

        {/* 드롭다운 메뉴 */}
        {open && (
          <div className="absolute top-full left-0 z-10 mt-1 min-w-32.5 rounded-md border border-gray-200 bg-white py-1 shadow-md">
            {menuItems.map(({ label, icon, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleMenuClick(action)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Group>
  )
}
