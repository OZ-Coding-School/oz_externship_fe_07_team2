import axios from 'axios'

import { API_BASE_URL, MSW_BASE_URL } from '@/constants/apiPath'

export const api = axios.create({
  // 개발 환경에서는 MSW 가상 주소를 사용하고, 그 외에는 실제 API 주소를 사용한다.
  // baseURL: import.meta.env.DEV ? MSW_BASE_URL : API_BASE_URL,
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 응답 에러 공통 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🚨 API Error:', error.response?.data || error.message)

    return Promise.reject(error)
  }
)

/**
 * 요청 인터셉터: accessToken 자동 첨부
 * TODO: 로그인 구현 후 교체 예정
 */
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TEST_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
