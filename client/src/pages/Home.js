import React, { useContext } from 'react'
import Navbar from './Navbar'
import UserDashboard from './UserDashboard'
import '../styles/Home.css'
import { AuthContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

function Home() {

  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
    <Navbar currentUser={currentUser} logout={logout} />
    <UserDashboard/>
    </>
  )
}

export default Home