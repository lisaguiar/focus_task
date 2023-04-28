import React, {useContext, useEffect, useState} from "react";
import "../styles/Home.css";
import { AiOutlineFileText, AiOutlineProject } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "../api/axios";
import moment from 'moment';

function Home() {

  const {currentUser} = useContext(AuthContext)
  
  const [notes, setNotes] = useState([])

  const usuId = currentUser?.id;

  const navigate = useNavigate();

  const getNotes = async (usuId) => {
    const res = await axios.get("/api/note")
    await setNotes(res.data)
  }

  async function handleNewNote() {
    try {
      const res = await axios.post('/api/note/', {
        titulo: 'Sem título',
        data: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate(`/note/${res.data}`);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getNotes(usuId);
    
  }, [usuId])

  return (
    <main className="user-dashboard">
      <h1>Meus arquivos</h1>
      <hr></hr>
      <div className="user-files">
        {notes.length === 0 ? (
          <p>Nenhum arquivo encontrado</p>
        ) : (
          notes.map((note) => (
            <div className="file" key={note.ano_id}>
              <AiOutlineFileText />
              <Link to={`/note/${note.ano_id}`} className="link">
                <h3>{note.ano_titulo}</h3>
              </Link>
            </div>
          ))
        )}
      </div>

      <h1>Criar arquivo</h1>
      <hr></hr>
      <div className="new-file"> 
        <NewFile icon={<AiOutlineFileText />} name="Anotação" onClick={handleNewNote} />{" "}
       
        <NewFile icon={<AiOutlineProject />} name="Kanban" />
      </div>
    </main>
  );
}

function NewFile(props) {
  return (
    <div className="new-file-card" onClick={props.onClick}>
      <div className="card-head">
        {props.icon}
        <h3>{props.name}</h3>
      </div>
      <hr/>
      <div className="card-body">{props.image}</div>
    </div>
  );
}







export default Home;
