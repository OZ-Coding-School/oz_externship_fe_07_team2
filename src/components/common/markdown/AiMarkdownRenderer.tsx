import { Streamdown } from 'streamdown'

import 'streamdown/styles.css'
import './ai-markdown-renderer.css'

type AiMarkdownRendererProps = {
  content: string
  className?: string
  isStreaming?: boolean
}

const IMAGE_TOKEN_PATTERN = /^\[Image #(\d+)\]$/u
const HEADING_PATTERN = /^(#{1,6})\s+(.+)$/u
const LEADING_EMOJI_PATTERN =
  /^\p{Extended_Pictographic}(?:\uFE0F|\u200D[\p{Extended_Pictographic}\uFE0F])*\s*/u

function getHeadingIcon(headingText: string) {
  if (/팁/u.test(headingText)) {
    return '💡'
  }

  if (/주의/u.test(headingText)) {
    return '⚠️'
  }

  if (/정리/u.test(headingText)) {
    return '✅'
  }
}

function normalizeMarkdown(content: string) {
  const lines = content.split('\n')
  const nextLines: string[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()
    const imageTokenMatch = trimmedLine.match(IMAGE_TOKEN_PATTERN)

    // AI가 `[Image #1]` 같은 토큰을 내리면 읽기 쉬운 텍스트로만 바꿔서 보여준다.
    if (imageTokenMatch) {
      nextLines.push(`🖼️ Image #${imageTokenMatch[1]}`)
      continue
    }

    const headingMatch = line.match(HEADING_PATTERN)

    if (headingMatch) {
      const headingText = headingMatch[2].trim()
      const headingIcon = getHeadingIcon(headingText)

      if (LEADING_EMOJI_PATTERN.test(headingText)) {
        nextLines.push(line)
        continue
      }

      if (/팁/u.test(headingText) && headingIcon) {
        nextLines.push(`> ${headingIcon} ${headingText}`)
        continue
      }

      if (headingIcon) {
        nextLines.push(`${headingMatch[1]} ${headingIcon} ${headingText}`)
        continue
      }
    }

    nextLines.push(line)
  }

  return nextLines.join('\n')
}

export default function AiMarkdownRenderer({
  content,
  className = '',
  isStreaming = false,
}: AiMarkdownRendererProps) {
  return (
    <div
      className={`markdown-body min-w-0 wrap-break-word ${className}`.trim()}
    >
      <Streamdown
        className="text-inherit"
        mode={isStreaming ? 'streaming' : 'static'}
        controls={{
          table: false,
          mermaid: false,
          code: {
            copy: true,
            download: false,
          },
        }}
        components={{
          table: ({ children }) => (
            <div className="markdown-table-wrapper">
              <table>{children}</table>
            </div>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-primary-500 underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {normalizeMarkdown(content)}
      </Streamdown>
    </div>
  )
}
