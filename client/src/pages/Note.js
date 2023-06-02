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
import 'moment/locale/pt-br';

import { BsCloudArrowUp, BsCloudCheck } from "react-icons/bs";



function Note() {
  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

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
  const [noteData, setNoteData] = useState([]);

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
      let title = JSON.parse(noteData.ano_conteudo)[0].children[0].text
      ? JSON.parse(noteData.ano_conteudo)[0].children[0].text 
      : "Sem título";

      let titulo = { ano_titulo: title };
      let conteudo = { ano_conteudo: JSON.stringify(value) };

      setNoteData((noteData) => ({
        ...noteData,
        ...titulo,
        ...conteudo,
      }));
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const updateBdNote = setTimeout(() => {
      setIsSaving(true);
      let newTitle = noteData.ano_titulo;
      let newConteudo = noteData.ano_conteudo;
  
      axios.put(`/api/note/${anoId}`, {
        titulo: newTitle,
        conteudo: newConteudo,
      });

    }, 2000)
    
    return () => {
      clearTimeout(updateBdNote)
      setIsSaving(false);
    }
  }, [noteData, anoId])

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
            <div className="created-date">Criado em {moment(noteData?.ano_dtCriacao).format('LLL')}</div>
            <div className="info">
              {isSaving ? 
              <p className="save">
                <BsCloudCheck />
                Salvo
              </p>
              : 
              <p className="save">
                <BsCloudArrowUp />
                Salvando...
              </p>}
              

              <button className="nav-btn delete" onClick={handleDelete}>
                Excluir Anotação
              </button>
            </div>
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
