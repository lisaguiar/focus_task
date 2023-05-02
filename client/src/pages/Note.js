import "../styles/Note.css";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createEditor,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { withLayout } from "../functions/CustomLayout";
import { Element, Leaf } from "../functions/BlockTypes";
import { FormatToolbar } from "../functions/FormatToolbar";

import axios from "../api/axios";
import moment from "moment";
import 'moment/locale/pt-br'



function Note() {
  const [isLoading, setIsLoading] = useState(true);

  const [initialValue, setInicialValue] = useState([
    {
      type: "title",
      children: [{ text: "Sem título" }],
    },
    {
      type: "paragraph",
      children: [{ text: "Comece sua anotação!" }],
    },
  ]);
  const [noteData, setNoteData] = useState();

  const anoId = useLocation().pathname.split("/")[2];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async (anoId) => {
      try {
        const res = await axios.get(`/api/note/${anoId}`);

        if (res.data) {
          let data = res.data;
          setNoteData(data);

          if (res.data.ano_conteudo) {
            let conteudo = JSON.parse(res.data.ano_conteudo);
            setInicialValue(conteudo);
          }
          setIsLoading(false);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchNote(anoId);
  }, [anoId, navigate]);


  const [editor] = useState(() =>
    withLayout(withReact(withHistory(createEditor())))
  );

  async function handleDelete() {
    try {
      await axios.delete(`/api/note/${anoId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(value) {
    try {
      
      let tempTitle = JSON.parse(noteData.ano_conteudo)[0].children[0].text;

      let titulo = { ano_titulo: tempTitle };
      let conteudo = { ano_conteudo: JSON.stringify(value) };

      setNoteData((noteData) => ({
        ...noteData,
        ...titulo,
        ...conteudo,
      }));

      let newTitle = noteData.ano_titulo;
      let newConteudo = noteData.ano_conteudo;

      await axios.put(`/api/note/${anoId}`, {
        titulo: newTitle,
        conteudo: newConteudo,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // ====================== //
  // Slate render functions //
  // ====================== //

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);


  return (
    <>
      {isLoading ? (
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
          }}
        >
          Loading
        </h3>
      ) : (
        <div className="md">
          <div className="md-nav">
            <div>Criado em {moment(noteData?.ano_dtCriacao).format('LLL')}</div>
            <button className="nav-item delete" onClick={handleDelete}>
              Excluir Anotação
            </button>
          </div>
          <div className="md-editor">
            <Slate
              editor={editor}
              value={initialValue}
              onChange={(value) => {
                handleUpdate(value);
              }}
            >
              <FormatToolbar />
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Sem título"
                autoFocus
              />
            </Slate>
          </div>
        </div>
      )}
    </>
  );
}


export default Note;
