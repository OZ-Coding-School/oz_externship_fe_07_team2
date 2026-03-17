import type { Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'

import { Group, IconBtn } from '../ToolbarPrimitives'

const ALIGNS = [
  { value: 'left', icon: <AlignLeft size={18} />, title: '왼쪽 정렬' },
  { value: 'center', icon: <AlignCenter size={18} />, title: '가운데 정렬' },
  { value: 'right', icon: <AlignRight size={18} />, title: '오른쪽 정렬' },
  { value: 'justify', icon: <AlignJustify size={18} />, title: '양쪽 정렬' },
] as const

export default function AlignGroup({ editor }: { editor: Editor | null }) {
  if (!editor) return null
  return (
    <Group withDivider>
      {ALIGNS.map(({ value, icon, title }) => (
        <IconBtn
          key={value}
          title={title}
          onClick={() => editor.chain().focus().setTextAlign(value).run()}
          active={editor.isActive({ TextAlign: value })}
        >
          {icon}
        </IconBtn>
      ))}
    </Group>
  )
}
