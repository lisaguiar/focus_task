import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Logastro from './pages/Logastro'
import Logado from './pages/Logado'
import Note from './pages/Note'
import Navbar from './pages/Navbar'


const Layout = () => {

  const { currentUser, logout } = useContext(AuthContext)

  return (
    <>
      <div>
        <Navbar />
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
        path:'/', element: <Home/>,
      },
      {
        path:'/note/:id', element: <Note />
      },
      {
        path:'/logado', element: <Logado/>
      },
      {path:'/kanban', element: <Kanban/>}
    ]
  }
  {
    path:'/logastro', element: <Logastro/>
  },
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
