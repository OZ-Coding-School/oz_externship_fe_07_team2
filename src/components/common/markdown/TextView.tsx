import type { Editor } from '@tiptap/react'

import { EditorPanel } from './EditorPanel'
import PreviewPanel from './PreviewPanel'

type TextViewProps = {
  editor: Editor
  previewHtml: string
}

export const TextView = ({ editor, previewHtml }: TextViewProps) => (
  <div className="flex min-h-145 divide-x divide-gray-100">
    <EditorPanel editor={editor} />
    <PreviewPanel html={previewHtml} />
  </div>
)
