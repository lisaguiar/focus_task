import { Editor, Transforms, Element as SlateElement } from "slate";

// ======================================== //
// Block type and mark checkers and setters //
// ======================================== //

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  
  if(isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
};

export const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n["type"] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  let newProperties = {
    type: isActive ? "paragraph" : format,
  };

  Transforms.setNodes(editor, newProperties);
};

export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "title":
      return (
        <h1 id="slate-title" {...attributes}>
          {children}
        </h1>
      );
    case "heading-1":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-2":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-3":
      return <h3 {...attributes}>{children}</h3>;
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, leaf, children }) => {
  if(leaf.bold) {
    children = <strong>{children}</strong>
  }

  if(leaf.italic) {
    children = <em>{children}</em>
  }

  if(leaf.underline) {
    children = <u>{children}</u>
  }

  return (
    <span {...attributes}>
      {children}
    </span>
  );
};
