import React, { useContext } from 'react'
import Navbar from './Navbar'
import '../styles/Home.css'
import { AuthContext } from '../contexts/authContext'
import { Outlet } from 'react-router-dom'

function Home() {

  const { currentUser, logout } = useContext(AuthContext)


  return (
    <>
    <Navbar currentUser={currentUser} logout={logout} />
    <Outlet />
    </>
  )
}

export default Home