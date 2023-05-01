import "../styles/Note.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Editor,
  Node,
  Text,
  Transforms,
  createEditor,
  Element as SlateElement,
  Range,
} from "slate";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import { withHistory } from "slate-history";
import { createPortal } from "react-dom";

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

  // =================== //
  // Custom fixed layout //
  // =================== //

  const withLayout = (editor) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = ([node, path]) => {
      if (path.length === 0) {
        if (
          editor.children.length <= 1 &&
          Editor.string(editor, [0, 0]) === ""
        ) {
          const title = {
            type: "title",
            children: [{ text: "Sem título" }],
          };
          Transforms.insertNodes(editor, title, {
            at: path.concat(0),
            select: true,
          });
        }

        if (editor.children.length < 2) {
          const paragraph = {
            type: "paragraph",
            children: [{ text: "" }],
          };
          Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
        }

        for (const [child, childPath] of Node.children(editor, path)) {
          let type;
          const slateIndex = childPath[0];
          const enforceType = (type) => {
            if (SlateElement.isElement(child) && child.type !== type) {
              const newProperties = { type };
              Transforms.setNodes(editor, newProperties, {
                at: childPath,
              });
            }
          };

          switch (slateIndex) {
            case 0:
              type = "title";
              enforceType(type);
              break;
            case 1:
              type = (child.type === "title") ? "paragraph" : child.type;
              enforceType(type);
              break;
            default:
              break;
          }
        }
      }
      return normalizeNode([node, path]);
    };
    return editor;
  };

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
      let tempTitle = JSON.parse(noteData.ano_conteudo)
        ? JSON.parse(noteData.ano_conteudo)[0].children[0].text
        : "";
      if (tempTitle === "" || !tempTitle) {
        tempTitle = "Sem título";
      }
      let conteudo = { ano_conteudo: JSON.stringify(value) };
      let titulo = { ano_titulo: tempTitle };

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


// ============================ //
// Block type and mark checkers //
// ============================ //

const isBoldMarkActive = (editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.bold === true,
    universal: true,
  });
  return !!match;
}

const toggleBoldMark = (editor) => {
  const isActive = isBoldMarkActive(editor);
  Transforms.setNodes(
    editor,
    { bold: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
}



const isBlockActive = (editor, format) => {
  const {selection} = editor;
  if(!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => 
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n['type'] === format,
    })
  )

  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format
  )
  
  let newProperties = {
    type: isActive ? 'paragraph' : format,
  }

  Transforms.setNodes(editor, newProperties)
}






const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "title":
      return (
        <h1 id="slate-title" {...attributes}>{children}</h1>
      )
    case "heading-1":
      return (
        <h1 {...attributes}>{children}</h1>
      )
    case "heading-2":
      return (
        <h2 {...attributes}>{children}</h2>
      )
    case "heading-3":
      return (
        <h3 {...attributes}>{children}</h3>
      )
    case "paragraph":
      return (
        <p {...attributes}>{children}</p>
      )
    default:
      return (
        <p {...attributes}>{children}</p>
      )
  }
}


const Leaf = ({attributes, leaf, children}) => {
  return (
    <span
      {...attributes}
      style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
    >
      {children}
    </span>
  );
};



// ================== //
// Formatting toolbar //
// ================== //

export const Portal = ({children}) => {
  return typeof document === 'object'
  ? createPortal(children, document.body)
  : null
}

export const Menu = React.forwardRef(
  ({...props}, ref) => (
    <div
      {...props}
      ref={ref}
    />
  )
)

const FormatToolbar = () => {
  const ref = useRef();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current
    const { selection } = editor
    
    if(!el) {
      return
    }
    
    if(
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === '' ||
      Editor.fragment(editor, selection)[0].type === 'title'
    ) {
      el.removeAttribute('style')
      return
    }
    
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect()

    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
  })

  return (
    <Portal>
      <Menu 
        ref={ref}
        className="md-menu"
        onMouseDown={e => {
          e.preventDefault();
        }}
      >
        <div className="md-menu-title">Formatações</div>
        <FormatButton texto={"Negrito"} />
        <FormatBlockButton texto={"Título 1"} format={"heading-1"} />
        <FormatBlockButton texto={"Título 2"} format={"heading-2"} />
        <FormatBlockButton texto={"Título 3"} format={"heading-3"} />

      </Menu>
    </Portal>
  )

}

const FormatButton = ({ texto }) => {
  const editor = useSlate();
  const active = isBoldMarkActive(editor) ? " active" : "";
  return (
    <button
      className={"md-menu-button" + active}
      onClick={() => {toggleBoldMark(editor)}}
    >
      {texto}
    </button>
  )
}

const FormatBlockButton = ({ texto, format }) => {
  const editor = useSlate();
  const active = isBlockActive(editor, format) ? " active" : "";
  return (
    <button
      className={"md-menu-button" + active}
      onClick={() => {toggleBlock(editor, format)}}
    >
      {texto}
    </button>
  )
}




export default Note;
