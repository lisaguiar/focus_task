import React from 'react';
import '../styles/UserDashboard.css';

function UserDashboard() {
  return (
    <main>
        
        <div className='user-recent'>
            <h1>Recentes</h1>
            <hr></hr>
            <p>Nenhum arquivo recente</p>
        </div>

        <div className='new-file'>
            <h1>Criar Arquivo</h1>
            <hr></hr>
            <p>Nenhum arquivo encontrado</p>
        </div>

        {/* <textarea rows={1} placeholder='Digite sua anotação!' style={{width: 500 + "px", minHeight: "min-content", border: "none", fontWeight: 700}}></textarea> */}
        

    </main>
  )
}

export default UserDashboard