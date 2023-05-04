import React, { useContext } from 'react'
import '../images/jorge.png'
import { AuthContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

const Logado = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleLogout() {
        logout();
        navigate('/logastro');
      }
    
    return (
        <div>
            <center>
                <h2>Bem-vindo, {currentUser?.usu_nome}!</h2>
                <h3>Email: {currentUser?.usu_email}</h3>
                <button onClick={handleLogout}>Logout</button>
            </center>
                
        </div>
)}

export default Logado