type PreviewProps = {
  html: string
}

export default function PreviewPanel({ html }: PreviewProps) {
  const isEmpty = !html || html === '<p></p>'

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 px-6 py-4">
      {isEmpty ? (
        <p className="text-base text-gray-400 select-none">
          내용을 입력해 주세요.
        </p>
      ) : (
        <div
          className="tiptap-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}
