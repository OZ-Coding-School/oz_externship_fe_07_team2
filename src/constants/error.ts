import notFoundImg from '@/assets/images/404.png'

export const ERROR_CONTENT = {
  notFound: {
    image: notFoundImg,
    title: '페이지를 불러올 수 없어요',
    description: '잠시 뒤 다시 시도해보세요!',
  },
} as const
