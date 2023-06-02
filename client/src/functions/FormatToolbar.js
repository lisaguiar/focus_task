import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlate } from "slate-react";
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from "./BlockTypes";

// ================== //
// Formatting toolbar //
// ================== //

export const Portal = ({ children }) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};

export const Menu = React.forwardRef(({ ...props }, ref) => (
  <div {...props} ref={ref} />
));

export function FormatToolbar() {
  const ref = useRef();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.fragment(editor, selection)[0].type === "title"
    ) {
      el.removeAttribute("style");
      return;
    }
    

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className="md-menu"
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <div className="md-menu-title">Formatações</div>
        <div className="md-menu-inline">
          <FormatButton texto={"N"} format={"bold"} />
          <FormatButton texto={"I"} format={"italic"} />
          <FormatButton texto={"S"} format={"underline"} />
        </div>
        <div className="md-menu-title">Tipos de bloco</div>
        <FormatBlockButton texto={"Título 1"} format={"heading-1"} />
        <FormatBlockButton texto={"Título 2"} format={"heading-2"} />
        <FormatBlockButton texto={"Título 3"} format={"heading-3"} />
      </Menu>
    </Portal>
  );
};

const FormatButton = ({ texto, format }) => {
  const editor = useSlate();
  const active = isMarkActive(editor, format) ? "active" : "";
  return (
    <button
      className={`md-menu-button ${format} ${active}`}
      onClick={() => {
        toggleMark(editor, format);
      }}
    >
      {texto}
    </button>
  );
};

const FormatBlockButton = ({ texto, format }) => {
  const editor = useSlate();
  const active = isBlockActive(editor, format) ? " active" : "";
  return (
    <button
      className={"md-menu-button" + active}
      onClick={() => {
        toggleBlock(editor, format);
      }}
    >
      {texto}
    </button>
  );
};
