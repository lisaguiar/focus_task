import '../styles/Note.css'
import React, { useState, useCallback } from 'react'
import { Editor, Element, Text, Transforms, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

function Note() {

    const [editor] = useState(() => withReact(createEditor()));

    const initialValue = [
        {
            type: "paragraph",
            children: [{ text: "Comece sua anotação!"}],
        },
    ]


    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case "heading":
                return <HeadingElement {...props} />;
            default: 
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />
    }, []);


    const CustomEditor = {
        isBoldMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.bold === true,
                universal: true
            })
            return !!match
        },

        isHeadingActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: n => n.type === "heading",
            })
            return !!match
        },


        toggleBoldMark(editor) {
            const isActive = CustomEditor.isBoldMarkActive(editor)
            Transforms.setNodes(
                editor,
                { bold: isActive ? null : true },
                { match: n => Text.isText(n), split: true }
            )
        },

        toggleHeading(editor) {
            const isActive = CustomEditor.isHeadingActive(editor)
            Transforms.setNodes(
                editor,
                { type: isActive ? null : "heading" },
                { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
            )
        }
    }


    return (
        <div className='md'>
            <Slate editor={editor} value={initialValue} 
                
            >
                <Editable 
                    renderElement={renderElement} 
                    renderLeaf={renderLeaf}

                    onKeyDown={(event) => {
                        
                        if(!event.ctrlKey) {
                            return
                        }

                        switch(event.key) {
                            case ',': {
                                event.preventDefault();

                                CustomEditor.toggleHeading(editor)

                                break
                            }

                            case 'b': {
                                event.preventDefault();

                                CustomEditor.toggleBoldMark(editor)

                                break
                            }

                            
                            default: {
                                break
                            }
                        }


                    }}
                />
            </Slate>
        </div>
    )
}



const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};


const HeadingElement = (props) => {
    return (
        <h1 {...props.attributes}>
            {props.children}
        </h1>
    );
};


const Leaf = (props) => {
    return (
        <span 
            {...props.attributes}
            style={{fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}





export default Note