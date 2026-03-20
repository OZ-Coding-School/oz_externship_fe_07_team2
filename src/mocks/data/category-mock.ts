import type { Category } from '@/types'

//카테고리 목데이터
export const mockCategories: Category[] = [
  {
    id: 1,
    name: '프론트엔드',
    category_type: 'large',
    children: [
      {
        id: 10,
        name: '웹 프레임워크',
        category_type: 'medium',
        children: [
          {
            id: 21,
            name: 'React',
            category_type: 'small',
            children: [],
          },
          {
            id: 22,
            name: 'Vue',
            category_type: 'small',
            children: [],
          },
          {
            id: 23,
            name: 'Next.js',
            category_type: 'small',
            children: [],
          },
        ],
      },
      {
        id: 11,
        name: '프로그래밍 언어',
        category_type: 'medium',
        children: [
          {
            id: 30,
            name: 'JavaScript',
            category_type: 'small',
            children: [],
          },
          {
            id: 31,
            name: 'TypeScript',
            category_type: 'small',
            children: [],
          },
        ],
      },
      {
        id: 35,
        name: '라이브러리',
        category_type: 'medium',
        children: [
          {
            id: 32,
            name: 'TanStack Query',
            category_type: 'small',
            children: [],
          },
          {
            id: 33,
            name: 'Zustand',
            category_type: 'small',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '백엔드',
    category_type: 'large',
    children: [
      {
        id: 20,
        name: '웹 프레임워크',
        category_type: 'medium',
        children: [
          {
            id: 25,
            name: 'Django',
            category_type: 'small',
            children: [],
          },
          {
            id: 26,
            name: 'Spring',
            category_type: 'small',
            children: [],
          },
          {
            id: 27,
            name: 'FastAPI',
            category_type: 'small',
            children: [],
          },
        ],
      },
      {
        id: 13,
        name: 'Django',
        category_type: 'medium',
        children: [
          {
            id: 12,
            name: 'ORM',
            category_type: 'small',
            children: [],
          },
          {
            id: 34,
            name: '인증/권한',
            category_type: 'small',
            children: [],
          },
        ],
      },
      {
        id: 24,
        name: 'Web 서버',
        category_type: 'medium',
        children: [
          {
            id: 28,
            name: 'Nginx',
            category_type: 'small',
            children: [],
          },
          {
            id: 29,
            name: 'Apache',
            category_type: 'small',
            children: [],
          },
        ],
      },
    ],
  },
]
