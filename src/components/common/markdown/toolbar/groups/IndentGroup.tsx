import type { Editor } from '@tiptap/core'
import { IndentDecrease, IndentIncrease } from 'lucide-react'

import { Group, IconBtn } from '../ToolbarPrimitives'

export default function IndentGroup({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const handleLiftList = () =>
    editor.chain().focus().liftListItem('listItem').run()

  const handleSinkList = () =>
    editor.chain().focus().sinkListItem('listItem').run()

  return (
    <Group withDivider>
      <IconBtn
        title="들여쓰기 감소"
        onClick={handleLiftList}
        disabled={!editor.can().chain().focus().liftListItem('listItem').run()}
      >
        <IndentDecrease size={18} />
      </IconBtn>
      <IconBtn
        title="들여쓰기 증가"
        onClick={handleSinkList}
        disabled={!editor.can().chain().focus().sinkListItem('listItem').run()}
      >
        <IndentIncrease size={18} />
      </IconBtn>
    </Group>
  )
}
