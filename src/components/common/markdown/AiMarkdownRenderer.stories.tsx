import type { Meta, StoryObj } from '@storybook/react-vite'

import AiMarkdownRenderer from './AiMarkdownRenderer'

const SECTION_SAMPLE = `# 자바스크립트 테스트의 중요성

테스트는 코드 신뢰도를 높이고 유지보수를 쉽게 만듭니다.

---

## 자바스크립트 테스트의 종류

- 단위 테스트
- 통합 테스트
- E2E 테스트

---

### 단위 테스트 예시

\`\`\`ts
import { describe, expect, it } from 'vitest'

describe('sum', () => {
  it('adds two numbers', () => {
    expect(1 + 2).toBe(3)
  })
})
\`\`\`
`

const meta: Meta<typeof AiMarkdownRenderer> = {
  title: 'Common/Markdown/AiMarkdownRenderer',
  component: AiMarkdownRenderer,
  tags: ['autodocs'],
  args: {
    className: 'text-text-chatbot text-sm font-light',
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl rounded-2xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof AiMarkdownRenderer>

export const WithSections: Story = {
  args: {
    content: SECTION_SAMPLE,
  },
}
