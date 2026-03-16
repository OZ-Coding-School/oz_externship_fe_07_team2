import axios from 'axios'
import { API_BASE_URL, MSW_BASE_URL } from '@/constants/apiPath'

export const api = axios.create({
  // 개발 환경에서는 MSW 가상 주소를 사용하고, 그 외에는 실제 API 주소를 사용한다.
  baseURL: import.meta.env.DEV ? MSW_BASE_URL : API_BASE_URL,
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
