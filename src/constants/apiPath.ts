// 실제 백엔드 API 주소
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// 로컬 개발에서 MSW가 가로채는 가상 API 주소
export const MSW_BASE_URL = 'https://msw.local/api/v1'

// MSW handler에서 절대경로를 일관되게 만들기 위한 헬퍼
export const toMswApiUrl = (path: string) => `${MSW_BASE_URL}${path}`
