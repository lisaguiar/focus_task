import React, { useState } from "react";
import jorge from "../images/jorgeCopia.png";
import "../styles/Navbar.css";
import { MdNotifications } from 'react-icons/md';
import { MdPerson2, MdLogout } from 'react-icons/md';

import { useNavigate } from 'react-router-dom'

function Navbar({ currentUser, logout}) {

  const [profDropIsOpen, setProfDropIsOpen] = useState(false);
  const navigate = useNavigate()

  function handleLogout() {
    setProfDropIsOpen(!profDropIsOpen);
    logout();
    navigate('/');
  }


  function ProfDropdown () {
    return (
      <div className="prof-dropdown">
        <button className="prof-item" onClick={() => navigate('/Logado')}>
          <MdPerson2 />
          Perfil
        </button>
  
        <button className="prof-item" onClick={handleLogout}>
          <MdLogout />
          Sair
        </button>
      </div>
    );
  }




  return (
    <>
      <nav className="navbar">
        <img src={jorge} alt="JORGE" />
        <ul>
          <li>
            <button className="notification-icon">
              <MdNotifications />
            </button>
          </li>
          <h3 className="user-name">Bem vindo, {currentUser.usu_nome}! </h3>
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
