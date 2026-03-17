import type { Editor } from '@tiptap/core'
import { RemoveFormatting } from 'lucide-react'

import { IconBtn } from '../ToolbarPrimitives'

export default function ClearFormatGroup({
  editor,
}: {
  editor: Editor | null
}) {
  if (!editor) return null

  const handleClear = () =>
    editor.chain().focus().unsetAllMarks().clearNodes().run

  return (
    <IconBtn title="서식 지우기" onClick={handleClear}>
      <RemoveFormatting size={18} />
    </IconBtn>
  )
}
