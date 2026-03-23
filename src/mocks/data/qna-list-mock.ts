import sampleAvatar from '@/assets/images/sample-avatar.jpg'
import type { QnaListItem } from '@/features/qna-list'

const thumbnailImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%231f2937'/><rect x='40' y='40' width='520' height='320' rx='12' fill='%230f172a'/><text x='60' y='110' fill='%239ca3af' font-family='monospace' font-size='22'>// example code</text><text x='60' y='150' fill='%2334d399' font-family='monospace' font-size='20'>function solve()</text><text x='60' y='185' fill='%23e5e7eb' font-family='monospace' font-size='18'>{</text><text x='80' y='220' fill='%239ca3af' font-family='monospace' font-size='18'>return true;</text><text x='60' y='255' fill='%23e5e7eb' font-family='monospace' font-size='18'>}</text></svg>"

export const mockQuestions: QnaListItem[] = [
  {
    id: 1,
    category: {
      id: 21,
      depth: 2,
      names: ['프론트엔드', '웹 프레임워크', 'React'],
    },
    author: {
      id: 7,
      nickname: '오즈메이커',
      profile_image_url: sampleAvatar,
    },
    title: 'React에서 상태 관리를 어떤 기준으로 나누는 게 좋나요?',
    content_preview:
      '전역 상태와 서버 상태, UI 상태를 나눠서 관리하려고 하는데, 기준을 어떻게 잡아야 유지보수가 쉬운지 궁금합니다.',
    answer_count: 0,
    view_count: 128,
    created_at: '2026-03-11T09:00:00',
    thumbnail_img_url: thumbnailImage,
  },
]
