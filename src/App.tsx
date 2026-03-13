import { Routes, Route } from 'react-router'
import './App.css'
import {
  NotFoundPage,
  QnaListPage,
  QnaDetailPage,
  QnACreatePage,
} from '@/pages'
import { ROUTES_PATHS } from '@/constants/url'
import { RootLayout } from '@/components'

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
        <Route path={ROUTES_PATHS.CEATE_QNA} element={<QnACreatePage />} />
      </Route>
    </Routes>
  )
}

export default App
