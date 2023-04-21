import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Logastro from './pages/Logastro'
import Logado from './pages/Logado'
import UserDashboard from './pages/UserDashboard'
import Note from './pages/Note'


const Layout = () => {
  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

const router = createBrowserRouter ([
  {
    path:'/', element: <Layout/>,
    children:[
      {
        path:'/', element: <Logastro/>
      },
      
      {
        path:'/home', element: <Home/>,
        children:[
          {
            path:'', element: <UserDashboard />
          },
          {
            path:'note', element: <Note />
          },
          {
            path:'logado', element: <Logado/>
          }
        ]
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
