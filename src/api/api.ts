import axios, { type InternalAxiosRequestConfig } from 'axios'

import { API_BASE_URL } from '@/constants/apiPath'
import { AUTH_API } from '@/constants/auth-endpoint'
import { ROUTES_PATHS } from '@/constants/router'
import { TokenService } from '@/lib/tokenService'
import { useAuthStore } from '@/store'
import { useModalStore } from '@/store/useModalStore'

import {
  addToQueue,
  flushQueue,
  getIsRefreshing,
  setIsRefreshing,
} from './refreshQueue'

export const api = axios.create({
  // 개발 환경에서는 MSW 가상 주소를 사용하고, 그 외에는 실제 API 주소를 사용한다.
  // baseURL: import.meta.env.DEV ? MSW_BASE_URL : API_BASE_URL,
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 자동 포함(refreshToken)
})

/**
 * 요청 인터셉터
 */
api.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 401처리
type RetryAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

const handle401Error = async (originalRequest: RetryAxiosRequestConfig) => {
  if (getIsRefreshing()) {
    // 이미 refresh중이면 queue에 쌓고 대기
    return new Promise<string>((resolve, reject) => {
      addToQueue({ resolve, reject })
    }).then((token) => {
      originalRequest.headers.Authorization = `Bearer ${token}`
      return api(originalRequest)
    })
  }

  if (!TokenService.getAccessToken()) {
    // 토큰 자체가 없으면 refresh 시도안함
    useAuthStore.getState().clearAuth()
    window.location.href = ROUTES_PATHS.LOGIN
    return Promise.reject(new Error('No token'))
  }

  setIsRefreshing(true)
  originalRequest._retry = true

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}${AUTH_API.REFRESH}`,
      {},
      { withCredentials: true }
    )
    const newToken = data.access_token
    TokenService.setAccessToken(newToken)
    flushQueue(null, newToken)

    originalRequest.headers.Authorization = `Bearer ${newToken}`
    return api(originalRequest)
  } catch (error) {
    flushQueue(error, null)
    TokenService.clearTokens()
    useAuthStore.getState().clearAuth()
    window.location.href = ROUTES_PATHS.LOGIN
    return Promise.reject(error)
  } finally {
    setIsRefreshing(false)
  }
}

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      return handle401Error(originalRequest)
    }

    if (error.response?.status === 403) {
      useModalStore.getState().openUnauthorized()
    }

    console.error('🚨 API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
