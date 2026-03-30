import notFoundImg from '@/assets/images/404.png'
import emptyState from '@/assets/images/empty-state.svg'

export const ERROR_CONTENT = {
  notFound: {
    image: notFoundImg,
    title: '페이지를 불러올 수 없어요',
    description: '잠시 뒤 다시 시도해보세요!',
  },
  emptyState: {
    image: emptyState,
    title: '아직 등록된 질문이 없어요',
    description: '궁금한 점을 남겨보세요!',
  },
  answerEmpty: {
    image: emptyState,
    title: '아직 등록된 답변이 없어요',
    description: '첫 번째 답변을 남겨보세요!',
  },
  searchEmpty: {
    image: emptyState,
    title: '검색 결과가 없습니다',
    description: '다른 검색어나 필터를 시도해보세요!',
  },
  commentEmpty: {
    image: emptyState,
    title: '댓글이 없습니다',
    description: '첫 번째 댓글을 작성해보세요!',
  },
} as const
