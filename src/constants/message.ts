// constants/messages.ts
export const ERROR_MESSAGES = {
  // validation
  CATEGORY_REQUIRED: '카테고리를 선택해 주세요.',
  TITLE_REQUIRED: '제목을 입력해 주세요.',
  CONTENT_REQUIRED: '질문 내용을 입력해 주세요.',
  // API 에러
  CREATE_QUESTION: '질문 등록에 실패했습니다. 다시 시도해 주세요.',
  UPDATE_QUESTION: '질문 수정에 실패했습니다. 다시 시도해 주세요.',
} as const
