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
  {
    id: 2,
    category: {
      id: 31,
      depth: 2,
      names: ['프론트엔드', '프로그래밍 언어', 'TypeScript'],
    },
    author: {
      id: 11,
      nickname: '타입러버',
      profile_image_url: null,
    },
    title: '커스텀 훅에서 제네릭은 어느 수준까지 열어두는 게 적절할까요?',
    content_preview:
      '재사용성을 높이려고 제네릭을 많이 쓰다 보니 오히려 API가 복잡해지고 있습니다. 적절한 균형점을 찾고 싶습니다.',
    answer_count: 3,
    view_count: 84,
    created_at: '2026-03-10T13:20:00',
    thumbnail_img_url: null,
  },

  {
    id: 3,
    category: {
      id: 21,
      depth: 2,
      names: ['프론트엔드', '웹 프레임워크', 'React'],
    },
    author: {
      id: 15,
      nickname: '리액트장인',
      profile_image_url: sampleAvatar,
    },
    title: 'React에서 useMemo는 언제 사용하는 게 좋나요?',
    content_preview:
      '성능 최적화를 위해 useMemo를 사용하려고 하는데, 모든 계산에 쓰는 것은 아닌 것 같아 기준이 궁금합니다.',
    answer_count: 2,
    view_count: 56,
    created_at: '2026-03-09T15:30:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 4,
    category: {
      id: 25,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'Django'],
    },
    author: {
      id: 18,
      nickname: '백엔드지망생',
      profile_image_url: null,
    },
    title: 'Django ORM에서 select_related와 prefetch_related 차이가 뭔가요?',
    content_preview:
      '쿼리 최적화를 위해 두 방법을 사용한다고 들었는데 각각 언제 사용하는 것이 좋은지 알고 싶습니다.',
    answer_count: 1,
    view_count: 42,
    created_at: '2026-03-08T11:10:00',
    thumbnail_img_url: null,
  },
  {
    id: 5,
    category: {
      id: 26,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'Spring'],
    },
    author: {
      id: 21,
      nickname: '자동화좋아',
      profile_image_url: sampleAvatar,
    },
    title: 'Spring Boot에서 환경별 설정을 안전하게 분리하는 방법이 궁금합니다.',
    content_preview:
      'application.yml과 profile 설정을 운영 환경까지 가져가려는데, 보안 정보와 공통 설정을 어떻게 나누는 게 좋은지 궁금합니다.',
    answer_count: 4,
    view_count: 73,
    created_at: '2026-03-07T10:00:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 6,
    category: {
      id: 27,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'FastAPI'],
    },
    author: {
      id: 23,
      nickname: '파이썬백엔드',
      profile_image_url: null,
    },
    title: 'FastAPI에서 Pydantic 스키마를 계층별로 나누는 기준이 궁금합니다.',
    content_preview:
      'request, response, domain 스키마를 분리하려고 하는데 파일 구조를 어떻게 잡아야 관리가 쉬운지 고민입니다.',
    answer_count: 2,
    view_count: 65,
    created_at: '2026-03-06T14:40:00',
    thumbnail_img_url: null,
  },
  {
    id: 7,
    category: {
      id: 28,
      depth: 2,
      names: ['백엔드', 'Web 서버', 'Nginx'],
    },
    author: {
      id: 24,
      nickname: '인프라초보',
      profile_image_url: sampleAvatar,
    },
    title: 'Nginx에서 리버스 프록시 설정 시 자주 하는 실수는 뭐가 있나요?',
    content_preview:
      'React 프론트와 Spring API를 연결하는 중인데 location 설정과 포트 연결에서 자주 꼬입니다. 체크 포인트가 궁금합니다.',
    answer_count: 1,
    view_count: 39,
    created_at: '2026-03-05T16:10:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 8,
    category: {
      id: 29,
      depth: 2,
      names: ['백엔드', 'Web 서버', 'Apache'],
    },
    author: {
      id: 25,
      nickname: '레거시관리자',
      profile_image_url: null,
    },
    title: 'Apache 환경에서 정적 파일 캐시 정책은 어떻게 가져가는 게 좋을까요?',
    content_preview:
      '운영 중인 레거시 서비스에서 이미지와 CSS 캐시를 조정하려고 하는데, 브라우저 캐시와 배포 전략을 같이 고민하고 있습니다.',
    answer_count: 0,
    view_count: 28,
    created_at: '2026-03-04T09:25:00',
    thumbnail_img_url: null,
  },
  {
    id: 9,
    category: {
      id: 25,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'Django'],
    },
    author: {
      id: 26,
      nickname: '장고러버',
      profile_image_url: sampleAvatar,
    },
    title:
      'Django에서 커스텀 유저 모델을 초기에 안 만들면 어떤 문제가 생기나요?',
    content_preview:
      '프로젝트를 진행하다 보니 기본 User 모델로 시작한 게 아쉬운데, 나중에 바꾸기 어려운 이유와 대안이 궁금합니다.',
    answer_count: 5,
    view_count: 91,
    created_at: '2026-03-03T12:00:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 10,
    category: {
      id: 22,
      depth: 2,
      names: ['프론트엔드', '웹 프레임워크', 'Vue'],
    },
    author: {
      id: 27,
      nickname: '뷰입문자',
      profile_image_url: null,
    },
    title: 'Vue에서 Composition API와 Options API를 같이 써도 괜찮을까요?',
    content_preview:
      '레거시 컴포넌트는 Options API로 되어 있고 신규 코드는 Composition API를 쓰고 있는데, 혼용 기준이 궁금합니다.',
    answer_count: 1,
    view_count: 47,
    created_at: '2026-03-02T11:00:00',
    thumbnail_img_url: null,
  },
  {
    id: 11,
    category: {
      id: 23,
      depth: 2,
      names: ['프론트엔드', '웹 프레임워크', 'Next.js'],
    },
    author: {
      id: 28,
      nickname: '서버컴포넌트',
      profile_image_url: sampleAvatar,
    },
    title:
      'Next.js App Router에서 서버 컴포넌트와 클라이언트 컴포넌트 분리는 어떻게 하나요?',
    content_preview:
      '데이터 패칭은 서버 컴포넌트에서 하고 이벤트 처리는 클라이언트 컴포넌트로 넘기고 있는데, 경계를 나누는 기준이 헷갈립니다.',
    answer_count: 2,
    view_count: 77,
    created_at: '2026-03-01T10:30:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 12,
    category: {
      id: 30,
      depth: 2,
      names: ['프론트엔드', '프로그래밍 언어', 'JavaScript'],
    },
    author: {
      id: 29,
      nickname: 'JS초보',
      profile_image_url: null,
    },
    title:
      'JavaScript에서 이벤트 루프를 실무적으로 이해하려면 무엇을 보면 좋을까요?',
    content_preview:
      '비동기 코드가 많아지면서 call stack, task queue 개념은 아는데 실제 렌더링과 어떤 관계가 있는지 감이 잘 안 옵니다.',
    answer_count: 0,
    view_count: 33,
    created_at: '2026-02-28T09:15:00',
    thumbnail_img_url: null,
  },
  {
    id: 13,
    category: {
      id: 32,
      depth: 2,
      names: ['프론트엔드', '라이브러리', 'TanStack Query'],
    },
    author: {
      id: 30,
      nickname: '쿼리장인',
      profile_image_url: sampleAvatar,
    },
    title:
      'TanStack Query에서 invalidateQueries를 어느 범위까지 쓰는 게 적절할까요?',
    content_preview:
      'mutation 이후 관련 목록과 상세 쿼리를 함께 무효화하고 있는데, 키 설계를 어떻게 해야 과하게 새로고침되지 않을지 궁금합니다.',
    answer_count: 3,
    view_count: 68,
    created_at: '2026-02-27T14:05:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 14,
    category: {
      id: 33,
      depth: 2,
      names: ['프론트엔드', '라이브러리', 'Zustand'],
    },
    author: {
      id: 31,
      nickname: '상태관리좋아',
      profile_image_url: null,
    },
    title: 'Zustand 스토어를 기능별로 나누는 기준이 궁금합니다.',
    content_preview:
      '한 개의 큰 스토어로 가야 할지, 도메인별로 나눠야 할지 고민입니다. persist나 devtools도 같이 쓰고 있습니다.',
    answer_count: 1,
    view_count: 52,
    created_at: '2026-02-26T13:10:00',
    thumbnail_img_url: null,
  },
  {
    id: 15,
    category: {
      id: 31,
      depth: 2,
      names: ['프론트엔드', '프로그래밍 언어', 'TypeScript'],
    },
    author: {
      id: 32,
      nickname: '제네릭매니아',
      profile_image_url: sampleAvatar,
    },
    title: 'TypeScript에서 조건부 타입이 복잡해질 때 리팩터링 기준이 있을까요?',
    content_preview:
      '유틸 타입이 늘어나면서 가독성이 많이 떨어졌습니다. 타입 안전성과 유지보수 사이의 기준점이 궁금합니다.',
    answer_count: 4,
    view_count: 61,
    created_at: '2026-02-25T17:20:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 16,
    category: {
      id: 26,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'Spring'],
    },
    author: {
      id: 33,
      nickname: '스프링러너',
      profile_image_url: null,
    },
    title: 'Spring Security에서 JWT 필터 순서를 어떻게 잡아야 하나요?',
    content_preview:
      '인증 필터와 예외 처리 필터 순서가 꼬이면 응답이 이상해져서, 실무적으로 어떤 순서로 구성하는지 궁금합니다.',
    answer_count: 2,
    view_count: 58,
    created_at: '2026-02-24T15:45:00',
    thumbnail_img_url: null,
  },
  {
    id: 17,
    category: {
      id: 27,
      depth: 2,
      names: ['백엔드', '웹 프레임워크', 'FastAPI'],
    },
    author: {
      id: 34,
      nickname: 'async좋아',
      profile_image_url: sampleAvatar,
    },
    title: 'FastAPI에서 비동기 DB 드라이버를 도입할 때 주의할 점이 있을까요?',
    content_preview:
      '동시성 처리량을 높이려고 async 세팅을 보고 있는데, ORM과 세션 관리에서 어떤 부분을 조심해야 하는지 알고 싶습니다.',
    answer_count: 0,
    view_count: 41,
    created_at: '2026-02-23T08:50:00',
    thumbnail_img_url: thumbnailImage,
  },
  {
    id: 18,
    category: {
      id: 28,
      depth: 2,
      names: ['백엔드', 'Web 서버', 'Nginx'],
    },
    author: {
      id: 35,
      nickname: '배포삽질중',
      profile_image_url: null,
    },
    title: 'Nginx에서 gzip과 캐시 헤더를 같이 설정할 때 주의할 점이 있나요?',
    content_preview:
      '정적 리소스 최적화를 하려는데 브라우저 캐시와 압축 설정을 같이 넣다 보니 기대와 다른 응답이 나옵니다.',
    answer_count: 3,
    view_count: 49,
    created_at: '2026-02-22T19:05:00',
    thumbnail_img_url: null,
  },
  {
    id: 19,
    category: {
      id: 29,
      depth: 2,
      names: ['백엔드', 'Web 서버', 'Apache'],
    },
    author: {
      id: 36,
      nickname: '서버관리중',
      profile_image_url: sampleAvatar,
    },
    title: 'Apache 가상 호스트 설정을 여러 도메인에서 관리할 때 팁이 있을까요?',
    content_preview:
      '운영 서버 하나에서 여러 서비스 도메인을 붙이는 중인데, 설정 파일을 어떻게 나눠야 추후 유지보수가 쉬울지 궁금합니다.',
    answer_count: 1,
    view_count: 36,
    created_at: '2026-02-21T12:35:00',
    thumbnail_img_url: thumbnailImage,
  },
]
