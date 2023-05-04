import { Editor, Text, Transforms, Element as SlateElement } from "slate";

// ======================================== //
// Block type and mark checkers and setters //
// ======================================== //

export const isBoldMarkActive = (editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.bold === true,
    universal: true,
  });
  return !!match;
};

export const toggleBoldMark = (editor) => {
  const isActive = isBoldMarkActive(editor);
  Transforms.setNodes(
    editor,
    { bold: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
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
  return (
    <span {...attributes} style={{ fontWeight: leaf.bold ? "bold" : "normal" }}>
      {children}
    </span>
  );
};
