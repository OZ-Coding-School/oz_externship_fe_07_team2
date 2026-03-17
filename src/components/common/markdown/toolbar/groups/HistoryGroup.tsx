import type { Editor } from '@tiptap/react'
import { Redo2, Undo2 } from 'lucide-react'

import { Group, IconBtn } from '../ToolbarPrimitives'

export default function HistoryGroup({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  return (
    <Group withDivider>
      <IconBtn
        title="실행 취소 (Ctrl+Z)"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 size={18} />
      </IconBtn>
      <IconBtn
        title="다시 실행 (Ctrl+Y)"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 size={18} />
      </IconBtn>
    </Group>
  )
}
