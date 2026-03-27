import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GlobalToaster } from '@/components'

import App from './App.tsx'

import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/500.css'
import '@fontsource/pretendard/700.css'
import './index.css'

// Create a client
const queryClient = new QueryClient()

<<<<<<< HEAD
enableMocking().then(() => {
  // .env에서 토큰을 읽어서 store에 저장
  const token = import.meta.env.VITE_ACCESS_TOKEN
  if (token) {
    useAuthStore.getState().setAccessToken(token)
    // 토큰이 있으면 유저 정보도 가져옴
    import('./api/auth').then(({ getMe }) => {
      getMe()
        .then((user) => {
          useAuthStore.getState().setAuth({ accessToken: token, user })
        })
        .catch((error) => {
          console.error('Failed to fetch user info:', error)
        })
    })
  }

  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <GlobalToaster />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </QueryClientProvider>
  )
})
=======
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
)
>>>>>>> 150d6bd (fix: include feedback before refactor (#102))
