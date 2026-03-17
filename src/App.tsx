import { Route, Routes } from 'react-router'

import { RootLayout } from '@/components'
import { ROUTES_PATHS } from '@/constants/url'
import {
  NotFoundPage,
  QnACreatePage,
  QnaDetailPage,
  QnaListPage,
} from '@/pages'

import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={ROUTES_PATHS.QNA_LIST} element={<QnaListPage />} />
        <Route
          path={ROUTES_PATHS.NOT_FOUND}
          element={<NotFoundPage type="notFound" />}
        />
        <Route path={ROUTES_PATHS.QNA_DETAIL} element={<QnaDetailPage />} />
        <Route path={ROUTES_PATHS.CREATE_QNA} element={<QnACreatePage />} />
      </Route>
    </Routes>
  )
}

export default App
