import React from 'react';
import '../styles/UserDashboard.css';
import { AiOutlineFileText, AiOutlineProject } from 'react-icons/ai'

function UserDashboard(currentUser) {
  
  function getUserFiles ( id ) {
    
  }
  



  





  
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
            
            <NewFile icon={<AiOutlineFileText/>} name="Anotação" />

            <NewFile icon={<AiOutlineProject/>} name="Kanban" />
            
            
        </div>

        {/* <textarea rows={1} placeholder='Digite sua anotação!' style={{width: 500 + "px", minHeight: "min-content", border: "none", fontWeight: 700}}></textarea> */}
        

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