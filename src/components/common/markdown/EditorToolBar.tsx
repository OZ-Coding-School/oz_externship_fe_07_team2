import type { Editor } from '@tiptap/react'

import {
  AlignGroup,
  ClearFormatGroup,
  ColorGroup,
  FontGroup,
  HistoryGroup,
  IndentGroup,
  ListGroup,
  MediaGroup,
  TextFormatGroup,
} from './toolbar'

export const EditorToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null

  return (
    // Toolbar row1
    <div className="flex flex-col gap-1 border-b border-gray-200 px-3 py-2">
      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <HistoryGroup editor={editor} />
        <FontGroup editor={editor} />
        <TextFormatGroup editor={editor} />
        <ColorGroup editor={editor} />
        <MediaGroup editor={editor} />
      </div>

      {/* Toolbar row2 */}
      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <ListGroup editor={editor} />
        <AlignGroup editor={editor} />
        <IndentGroup editor={editor} />
        <ClearFormatGroup editor={editor} />
      </div>
    </div>
  )
}
