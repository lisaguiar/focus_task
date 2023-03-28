import React from 'react'
import '../styles/UserDashboard.css'

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
        </div>
        

    </main>
  )
}

export default UserDashboard