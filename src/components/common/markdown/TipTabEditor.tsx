import { useState } from 'react'

import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extensions'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { EditorToolbar } from './EditorToolBar'
import { FontSize } from './extentions/FontSize'
import { TextView } from './TextView'

type EditorProps = {
  content: string
  contentChange: (Value?: string) => void
}

export default function TipTabEditor({ content, contentChange }: EditorProps) {
  const [previewHtml, setPreviewHtml] = useState(content)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      FontSize,
      Placeholder.configure({
        placeholder: '내용을 입력해 주세요.',
      }),
    ],
    // 이미지 드래그로 이미지 url 변환
    // TODO: API연동 후 교체 예정
    editorProps: {
      handleDrop(view, event) {
        const file = event.dataTransfer?.files?.[0]
        if (!file || !file.type.startsWith('image/')) return false

        const reader = new FileReader()
        reader.onload = () => {
          editor
            ?.chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run()
        }
        reader.readAsDataURL(file)

        return true
      },
    },

    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setPreviewHtml(html)
      contentChange(html)
    },
  })

  if (!editor) return null

  return (
    <div>
      <EditorToolbar editor={editor} />
      <TextView editor={editor} previewHtml={previewHtml} />
    </div>
  )
}
