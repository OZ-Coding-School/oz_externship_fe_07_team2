import type { Editor } from '@tiptap/react'

import { EditorPanel } from './EditorPanel'
import PreviewPanel from './PreviewPanel'

type TextViewProps = {
  editor: Editor
  previewHtml: string
}

export const TextView = ({ editor, previewHtml }: TextViewProps) => (
  <div className="flex min-h-[clamp(20rem,calc(17.68vw+13.37rem),36.25rem)] divide-x divide-gray-100">
    <EditorPanel editor={editor} />
    <PreviewPanel html={previewHtml} />
  </div>
)
