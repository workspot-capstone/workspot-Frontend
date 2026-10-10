import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CafeDetailPage from './pages/CafeDetailPage'
import { Home } from './pages/Home'
import { CafeMapPage } from './pages/CafeMapPage'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/map', element: <CafeMapPage /> },
  { path: '/cafes/:cafeId', element: <CafeDetailPage /> },
  { path: '*', element: <main><h1>페이지를 찾을 수 없습니다.</h1></main> },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
