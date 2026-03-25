import { Navigate, Route, Routes } from 'react-router'

import { RootLayout } from '@/components'
import { ROUTES_PATHS } from '@/constants/url'
import {
  NotFoundPage,
  QnACreatePage,
  QnaDetailPage,
  QnaListPage,
} from '@/pages'

import ProtectedRoute from './components/router/ProtectedRouter'

import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 비로그인 라우트 */}
        <Route
          path="/"
          element={<Navigate to={ROUTES_PATHS.QNA_LIST} replace />}
        />
        <Route path={ROUTES_PATHS.QNA_LIST} element={<QnaListPage />} />
        <Route path={ROUTES_PATHS.QNA_DETAIL} element={<QnaDetailPage />} />

        {/* 로그인 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route
            path={ROUTES_PATHS.QNA_CREATE}
            element={<QnACreatePage mode="create" />}
          />
          <Route
            path={ROUTES_PATHS.QNA_EDIT}
            element={<QnACreatePage mode="edit" />}
          />
        </Route>
        <Route
          path={ROUTES_PATHS.NOT_FOUND}
          element={<NotFoundPage type="notFound" />}
        />
      </Route>
    </Routes>
  )
}

export default App
