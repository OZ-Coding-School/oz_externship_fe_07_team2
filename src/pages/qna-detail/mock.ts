import type { QnaQuestion } from './types'

export const mockQuestion: QnaQuestion = {
  id: 1,
  category_name: '프론트엔드',
  sub_category_name: '프로그래밍 언어 > Python',
  title:
    'print를 5번 쓰지 않고, print를 1번만 쓰고 5줄을 모두 표시하는 법이 있나요?',
  content:
    'print 명령어를 5번 쓰는 대신 print 한 번만 쓰고 내용을 모두 넣고 표시하는 방법이 있나요?',
  author: {
    id: 1,
    name: '김태산',
    avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  },
  view_count: 60,
  created_at: '15시간 전',
}
