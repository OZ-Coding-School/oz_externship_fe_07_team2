import DOMPurify from 'dompurify'

type PreviewProps = {
  html: string
}

export default function PreviewPanel({ html }: PreviewProps) {
  const isEmpty = !html || html === '<p></p>'
  const sanitizedHtml = DOMPurify.sanitize(html)

  return (
    <div className="hidden flex-1 overflow-y-auto bg-gray-50/50 px-6 py-4 md:flex">
      {isEmpty ? (
        <p className="text-base text-gray-400 select-none">
          내용을 입력해 주세요.
        </p>
      ) : (
        <div
          className="tiptap-preview"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      )}
    </div>
  )
}
