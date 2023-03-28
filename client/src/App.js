import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Logastro from './pages/Logastro'
import Logado from './pages/Logado'
import './App.css'

const Layout = () => {
  return (
    <>
      <div className='container'>
        <Outlet/>
      </div>
    </>
  )
}

const router = createBrowserRouter ([
  {
    path:'/', element: <Layout/>,
    children: [
      {
        path:'/', element: <Logastro/>
      },
      {
        path:'/logado', element: <Logado/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
