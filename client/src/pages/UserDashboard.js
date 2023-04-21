import React from 'react';
import '../styles/UserDashboard.css';
import { AiOutlineFileText, AiOutlineProject } from 'react-icons/ai'
import { Link } from 'react-router-dom';

function UserDashboard() {
  
  
  
  return (
    <main className='user-dashboard'>
        
        <h1>Recentes</h1>
        <hr></hr>
        <div className='user-recent'>
            <p>Nenhum arquivo recente</p>
        </div>

        <h1>Criar Arquivo</h1>
        <hr></hr>
        <div className='new-file'>
            
            <Link to={'note'}> <NewFile icon={<AiOutlineFileText/>} name="Anotação" /> </Link>

            <NewFile icon={<AiOutlineProject/>} name="Kanban" />
            
            
        </div>

        
        

    </main>
  )
}

function NewFile(props) {
  return (
  <div className='new-file-card'>
    <div className='card-head'>
      {props.icon}
      <h3>{props.name}</h3>
    </div>

    <div className='card-body'>
      {props.image}
    </div>
  </div>
  );
}

export default UserDashboard