import { useRef } from 'react'

import type { Editor } from '@tiptap/react'
import { ChevronDown } from 'lucide-react'

import { Group } from '../ToolbarPrimitives'

export default function ColorGroup({ editor }: { editor: Editor | null }) {
  const textColorRef = useRef<HTMLInputElement>(null)
  const highlightRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const textColor = editor.getAttributes('textStyle')?.color ?? '#121212'
  const highlight = editor.getAttributes('highlight')?.color ?? '#3b82f6'

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setHighlight({ color: e.target.value }).run()
  }

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run()
  }

  return (
    <Group withDivider>
      {/* 배경색 */}
      <button
        type="button"
        title="배경색"
        onClick={() => highlightRef.current?.click()}
        className="flex h-[clamp(1.5rem,calc(0.442vw+1.334rem),2rem)] w-auto! items-center gap-0.5 rounded px-1.5 hover:bg-gray-100"
      >
        <span
          className="h-[clamp(0.75rem,calc(0.221vw+0.667rem),1rem)] w-[clamp(0.75rem,calc(0.221vw+0.667rem),1rem)] rounded-sm border border-gray-300"
          style={{ backgroundColor: highlight }}
        />
        <ChevronDown size={10} className="text-gray-500" />
      </button>
      <input
        id="highlight-color"
        ref={highlightRef}
        type="color"
        value={highlight}
        onChange={handleHighlightChange}
        className="sr-only"
      />

      {/* 글자색 */}
      <button
        type="button"
        title="글자색"
        onClick={() => textColorRef.current?.click()}
        className="flex h-[clamp(1.5rem,calc(0.442vw+1.334rem),2rem)] w-auto! items-center justify-center rounded px-2 hover:bg-gray-100"
      >
        <span className="flex flex-col items-center leading-none">
          <span
            className="text-[clamp(0.75rem,calc(0.221vw+0.667rem),0.875rem)] font-bold"
            style={{ color: textColor }}
          >
            A
          </span>
          <span
            className="mt-0.5 h-1 w-[clamp(0.75rem,calc(0.221vw+0.667rem),1rem)] rounded-sm"
            style={{ backgroundColor: textColor }}
          />
        </span>
      </button>
      <input
        ref={textColorRef}
        type="color"
        value={textColor}
        onChange={handleTextColorChange}
        className="sr-only"
      />
    </Group>
  )
}
