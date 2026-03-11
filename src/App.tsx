import { Routes, Route } from 'react-router'
import './App.css'
import { NotFoundPage } from '@/pages'
import { ROUTES_PATHS } from '@/constants/url'
import { RootLayout } from '@/components'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path={ROUTES_PATHS.NOT_FOUND}
          element={<NotFoundPage type="notFound" />}
        />
      </Route>
    </Routes>
  )
}

export default App
