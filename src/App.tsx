import { Routes, Route } from 'react-router'
import './App.css'
import { NotFoundPage, QnaListPage } from '@/pages'
import { ROUTES_PATHS } from '@/constants/url'
import { RootLayout } from '@/components'

import QnaDetailPage from '@/pages/qna-detail/QnaDetailPage'

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
      </Route>
    </Routes>
  )
}

export default App
