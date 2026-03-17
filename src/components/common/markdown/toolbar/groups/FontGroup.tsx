import type { Editor } from '@tiptap/core'

import { cn } from '@/utils'

import { Group } from '../ToolbarPrimitives'

const FONT_FAMILIES = [
  { label: '기본서체', value: '' },
  { label: 'Pretendard', value: 'Pretendard, sans-serif' },
  { label: '나눔고딕', value: '"Nanum Gothic", sans-serif' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
] as const

const FONT_SIZE = [
  '10',
  '11',
  '12',
  '14',
  '16',
  '18',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
] as const

const selectCls =
  'h-7 cursor-pointer rounded border border-gray-200 bg-white px-1.5 text-xs text-gray-700 hover:border-gray-300 focus:outline-none'

export default function FontGroup({ editor }: { editor: Editor | null }) {
  if (!editor) return null

  const textStyle = editor.getAttributes('textStyle')

  const fontFamily = textStyle?.fontFamily ?? ''
  const fontSize = textStyle?.fontSize?.replace('px', '') ?? FONT_SIZE[3]

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      editor.chain().focus().unsetFontFamily().run()
    } else {
      editor.chain().focus().setFontFamily(e.target.value).run()
    }
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    editor.chain().focus().setFontsize(`${e.target.value}px`).run()
  }

  return (
    <Group withDivider>
      <select
        value={fontFamily}
        onChange={handleFontFamilyChange}
        className={selectCls}
      >
        {FONT_FAMILIES.map((f) => (
          <option key={`${f.label}-${f.value}`} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <select
        value={fontSize}
        onChange={handleFontSizeChange}
        className={cn(selectCls, 'min-w-14')}
      >
        {FONT_SIZE.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </Group>
  )
}
