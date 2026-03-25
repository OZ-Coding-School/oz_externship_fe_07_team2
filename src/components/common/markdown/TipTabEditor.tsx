import { useEffect, useState } from 'react'

import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { getPresignedUrl, uploadImageToS3 } from '@/api'
import { FontSize } from '@/components/common/markdown/extentions/FontSize'

import { EditorToolBar } from './EditorToolBar'
import { TextView } from './TextView'

type EditorProps = {
  content: string
  contentChange: (Value?: string) => void
  onImageUpload?: (imgUrl: string) => void
}

export default function TipTabEditor({
  content,
  contentChange,
  onImageUpload,
}: EditorProps) {
  const [previewHtml, setPreviewHtml] = useState(content)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      FontSize,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: '내용을 입력해 주세요.',
      }),
    ],

    editorProps: {
      handleDrop(_view, event) {
        const file = event.dataTransfer?.files?.[0]
        if (!file || !file.type.startsWith('image/')) return false

        void (async () => {
          try {
            const { presigned_url, img_url } = await getPresignedUrl(file.name)
            await uploadImageToS3(presigned_url, file)
            onImageUpload?.(img_url)
            editor?.chain().focus().setImage({ src: img_url }).run()
          } catch {
            console.error('이미지 업로드 실패')
          }
        })()

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
      <EditorToolBar editor={editor} onImageUpload={onImageUpload} />
      <TextView editor={editor} previewHtml={previewHtml} />
    </div>
  )
}
