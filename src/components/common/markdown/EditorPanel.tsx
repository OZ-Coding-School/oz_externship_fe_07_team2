import type { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/react'

type EditorPanelProps = {
  editor: Editor
}

export const EditorPanel = ({ editor }: EditorPanelProps) => (
  <div className="flex-1 overflow-y-auto">
    <EditorContent
      editor={editor}
      className="tiptap-editor px-6 py-4 focus:outline-none"
    />
  </div>
)
