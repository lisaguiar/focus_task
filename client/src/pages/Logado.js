import React, { useContext } from 'react'
import '../images/jorge.png'
import { AuthContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

const Logado = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="container" id="container">
            <center>
                <h2>Bem-vindo, {currentUser.usu_nome}!</h2>
                <h3>Email: {currentUser.usu_email}</h3>
                <button onClick={logout}>Logout</button>
            </center>
                
        </div>
)}

export default Logado