import React, { useState, useContext } from "react";
import jorge from "../images/jorgeCopia.png";
import "../styles/Navbar.css";
import { MdNotifications } from 'react-icons/md';
import { MdPerson2, MdLogout } from 'react-icons/md';

import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from "../contexts/authContext";

function Navbar() {

  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [profDropIsOpen, setProfDropIsOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/logastro');
  }


  function ProfDropdown () {
    return (
      <div className="prof-dropdown">
        <button className="prof-item" onClick={() => {setProfDropIsOpen(!profDropIsOpen); navigate('/perfil')}}>
          <MdPerson2 />
          Perfil
        </button>
  
        <button className="prof-item logout" onClick={handleLogout}>
          <MdLogout />
          Sair
        </button>
      </div>
    );
  }



  return (
    <>
      <nav className="navbar">
        <Link to={'/'}>
          <img src={jorge} alt="JORGE" />
        </Link>
        
        <ul>
          <li>
            <button className="notification-icon">
              <MdNotifications />
            </button>
          </li>
          <h3 className="user-name">Bem vindo, {currentUser?.usu_nome}! </h3>
          <li>
            <button className="profile-icon" onClick={() => setProfDropIsOpen(!profDropIsOpen)}>
              <MdPerson2 />
            </button>

            {profDropIsOpen && <ProfDropdown />}
          </li>
        </ul>
      </nav>
    </>
  );
}



export default Navbar;
