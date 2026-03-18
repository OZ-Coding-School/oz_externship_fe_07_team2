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
    <div className="tiptap-toolbar border-border-line flex flex-col gap-1 border-b px-3 py-2">
      {/* Row 1 - 모바일/데스크탑 공통 핵심 툴 */}
      <div className="flex flex-wrap items-center justify-center gap-x-1">
        <HistoryGroup editor={editor} />
        <TextFormatGroup editor={editor} />
        <ColorGroup editor={editor} />
        <MediaGroup editor={editor} />
        {/* 모바일에선 숨김 */}
        <span className="hidden md:contents">
          <FontGroup editor={editor} />
        </span>
      </div>

      {/* Row 2 - 데스크탑만 */}
      <div className="hidden flex-wrap items-center justify-center gap-x-1 md:flex">
        <ListGroup editor={editor} />
        <AlignGroup editor={editor} />
        <IndentGroup editor={editor} />
        <ClearFormatGroup editor={editor} />
      </div>

      {/* Row 2 모바일 */}
      <div className="flex flex-wrap items-center justify-center gap-x-1 md:hidden">
        <ListGroup editor={editor} />
        <AlignGroup editor={editor} />
      </div>
    </div>
  )
}
