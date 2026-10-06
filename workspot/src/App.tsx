import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CafeDetail from './pages/CafeDetail'
import Home from './pages/Home'
import Map from './pages/Map'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/map', element: <Map /> },
  { path: '/cafes/:cafeId', element: <CafeDetail /> },
  { path: '*', element: <main><h1>페이지를 찾을 수 없습니다.</h1></main> },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
