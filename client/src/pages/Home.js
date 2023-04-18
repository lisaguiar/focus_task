import React, { useContext } from 'react'
import Navbar from './Navbar'
import UserDashboard from './UserDashboard'
import '../styles/Home.css'
import { AuthContext } from '../contexts/authContext'

function Home() {

  const { currentUser, logout } = useContext(AuthContext)


  return (
    <>
    <Navbar currentUser={currentUser} logout={logout} />
    <UserDashboard currentUser={currentUser} />
    </>
  )
}

export default Home