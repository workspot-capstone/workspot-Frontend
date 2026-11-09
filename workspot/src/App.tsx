import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { CafeMapPage } from './pages/CafeMapPage'
import { LocationLayout } from './layouts/LocationLayout'

const router = createBrowserRouter([
  {
    element: <LocationLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'map', element: <CafeMapPage /> },
    ],
  },
  { path: '*', element: <main><h1>페이지를 찾을 수 없습니다.</h1></main> },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
