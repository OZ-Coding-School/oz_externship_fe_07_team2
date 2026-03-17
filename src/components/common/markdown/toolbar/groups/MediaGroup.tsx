import { useRef, useState } from 'react'

import type { Editor } from '@tiptap/core'
import { Image, Link2 } from 'lucide-react'

import { Popup } from '@/components'

import { Group, IconBtn } from '../ToolbarPrimitives'

type PopupState = {
  type: 'link'
  isOpen: boolean
}

export default function MediaGroup({ editor }: { editor: Editor | null }) {
  const [inputValue, setInputValue] = useState('')
  const [popup, setPopup] = useState<PopupState>({
    type: 'link',
    isOpen: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const openLinkPopup = () => {
    const prev = (editor.getAttributes('link').href as string) ?? ''
    setInputValue(prev)
    setPopup({ type: 'link', isOpen: true })
  }

  const closePopup = () => {
    setPopup((prev) => ({ ...prev, isOpen: false }))
    setInputValue('')
  }

  const handleConfirm = () => {
    const url = inputValue.trim()
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    }
    closePopup()
  }

  // 파일 선택 시 Base64로 변환해서 에디터에 삽입
  // API 연동 후 변경 예정
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run()
    }
    reader.readAsDataURL(file)

    // 같은 파일 재선택 가능하도록 초기화
    e.target.value = ''
  }

  const popupContent = (
    <div className="flex flex-col gap-3">
      <input
        type="url"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
        placeholder="https://"
        autoFocus
        className="focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
      />
    </div>
  )

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFile}
      />

      <Group withDivider={false}>
        <IconBtn
          title="링크"
          onClick={openLinkPopup}
          active={editor.isActive('link')}
        >
          <Link2 size={18} />
        </IconBtn>
        <IconBtn title="이미지" onClick={() => fileInputRef.current?.click()}>
          <Image size={18} />
        </IconBtn>
      </Group>

      <Popup
        isOpen={popup.isOpen}
        content={popupContent}
        confirmLabel="삽입"
        cancelLabel="취소"
        onConfirm={handleConfirm}
        onCancel={closePopup}
      />
    </>
  )
}
