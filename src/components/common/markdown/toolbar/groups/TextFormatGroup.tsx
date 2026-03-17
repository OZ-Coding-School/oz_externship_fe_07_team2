import type { Editor } from '@tiptap/react'
import { Bold, Italic, Strikethrough, Underline } from 'lucide-react'

import { Group, IconBtn } from '../ToolbarPrimitives'

export default function TextFormatGroup({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  return (
    <Group withDivider>
      <IconBtn
        title="굵게 (Ctrl+B)"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        <Bold size={18} />
      </IconBtn>
      <IconBtn
        title="기울임 (Ctrl+I)"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        <Italic size={18} />
      </IconBtn>
      <IconBtn
        title="밑줄 (Ctrl+U)"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
      >
        <Underline size={18} />
      </IconBtn>
      <IconBtn
        title="취소선"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        <Strikethrough size={18} />
      </IconBtn>
    </Group>
  )
}
