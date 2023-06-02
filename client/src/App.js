import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from "./contexts/authContext";

import './App.css'

import Home from './pages/Home'
import Logastro from './pages/Logastro'
import Perfil from './pages/Perfil'
import Note from './pages/Note'
import Navbar from './components/Navbar'
import Kanban from './pages/Kanban'


const Layout = () => {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  

  useEffect (() => {
    if(!currentUser) {
      navigate('/logastro')
    }
  }, [currentUser, navigate])

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
        path:'/perfil', element: <Perfil/>
      },
      {path:'/kanban', element: <Kanban/>}
    ]
  },
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
