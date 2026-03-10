import { Routes, Route } from 'react-router'
import './App.css'
import { NotFoundPage } from '@/pages'
import { ROUTES_PATHS } from '@/constants/url'

function App() {
  return (
    <Routes>
      <Route
        path={ROUTES_PATHS.NOT_FOUND}
        element={<NotFoundPage type="notFound" />}
      />
    </Routes>
  )
}

export default App
