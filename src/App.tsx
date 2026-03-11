import { Routes, Route } from 'react-router'
import './App.css'
import { NotFoundPage } from '@/pages'
import { ROUTES_PATHS } from '@/constants/url'
import { RootLayout } from '@/components'

import QnaDetailPage from '@/pages/qna-detail/QnaDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path={ROUTES_PATHS.NOT_FOUND}
          element={<NotFoundPage type="notFound" />}
        />
      </Route>
      <Route
        path={ROUTES_PATHS.NOT_FOUND}
        element={<NotFoundPage type="notFound" />}
      />
      <Route path="/qna-detail" element={<QnaDetailPage />} />
    </Routes>
  )
}

export default App
