import React from "react";
import "../styles/Home.css";
import { AiOutlineFileText, AiOutlineProject } from "react-icons/ai";
import { Link } from "react-router-dom";

function Home() {
  const arquivos = [
    {
      id: 1,
      tipo: "note",
      titulo: "Redes",
    },
    {
      id: 2,
      tipo: "note",
      titulo: "Seg. Info.",
    },
  ];

  return (
    <main className="user-dashboard">
      <h1>Arquivos</h1>
      <hr></hr>
      <div className="user-files">
        {arquivos.length === 0 ? (
          <p>Nenhum arquivo recente</p>
        ) : (
          arquivos.map((arquivo) => (
            <div className="file" key={arquivo.id}>
              <AiOutlineFileText />
              <Link to={`/${arquivo.tipo}/${arquivo.id}`} className="link">
                <h3>{arquivo.titulo}</h3>
              </Link>
            </div>
          ))
        )}
      </div>

      <h1>Criar Arquivo</h1>
      <hr></hr>
      <div className="new-file">
        <Link to={"note"}>
          {" "}
          <NewFile icon={<AiOutlineFileText />} name="Anotação" />{" "}
        </Link>

        <NewFile icon={<AiOutlineProject />} name="Kanban" />
      </div>
    </main>
  );
}

function NewFile(props) {
  return (
    <div className="new-file-card">
      <div className="card-head">
        {props.icon}
        <h3>{props.name}</h3>
      </div>

      <div className="card-body">{props.image}</div>
    </div>
  );
}

export default Home;
