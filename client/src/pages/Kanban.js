import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import '../styles/Kanban.css'

const Kanban = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleLogout() {
        logout();
        navigate('/logastro');
    }

    const data = [
        {
            id: "1",
            nome: "titulo 1",
            itens: [
                { id: "01", nome: "card 1" },
                { id: "02", nome: "card 2" },
            ],
            tint: 1
        },
        {
            id: "2",
            nome: "titulo 2",
            itens: [
                { id: "03", nome: "card 3" },
                { id: "04", nome: "card 4" },
            ],
            tint: 2
        },
        {
            id: "3",
            nome: "titulo 3",
            itens: [
                { id: "05", nome: "card 5" },
                { id: "06", nome: "card 6" },
            ],
            tint: 3
        }
    ]

    const [columns, setColumns] = useState(data)

    console.log(columns)

    const handleDragDrop = (results) => {
        const {source, destination, type} = results
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) 
            return
        if (type === 'group') {
            const reorderedColumn = [...columns]
            const sourceIndex = source.index
            const destinationIndex = destination.index

            const [removedColumn] = reorderedColumn.splice(sourceIndex, 1)
            reorderedColumn.splice(destinationIndex, 0, removedColumn)

            return setColumns(reorderedColumn)
        }

        const columnSourceIndex = columns.findIndex((column => column.id === source.droppableId))
        const columnDestinationIndex = columns.findIndex((column) => column.id === destination.droppableId)
        const newSourceItems = [...columns[columnSourceIndex].itens]
        const newDestinationItems = source.droppableId !== destination.droppableProps ? [...columns[columnDestinationIndex].itens] : newSourceItems
        
        const [deletedItem] = newSourceItems.splice(source.index, 1)
        newDestinationItems.splice(destination.index, 0, deletedItem)

        const newColumns = [...columns]

        newColumns[columnSourceIndex] = {
            ...columns[columnSourceIndex],
            itens: newSourceItems
        } 
        newColumns[columnDestinationIndex] = {
            ...columns[columnDestinationIndex],
            itens: newDestinationItems
        } 
        setColumns(newColumns)
    }
    
    return (
        <div>
            <center>
                <h2>Kanban</h2>

                <div className='kanban'>
                    <DragDropContext onDragEnd={handleDragDrop}>
                        <Droppable droppableId="root" type="group">
                            {(provided) => (
                                <div className='flex' {...provided.droppableProps} ref={provided.innerRef}>
                                    {columns.map((column, index) => (
                                        <Draggable draggableId={column.id} key={column.id} index={index}>
                                            {(provided) => (
                                                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                    <ColumnList {...column} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                     {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </center>
        </div>
)}

function ColumnList({nome, itens, id}) {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div className='kanban-container' {...provided.droppableProps} ref={provided.innerRef}>
                    <div className='column-container'>
                        <h3>{nome}</h3>
                    </div>
                    <div className='itens-container'>
                        {itens.map((item, index) => (
                            <Draggable draggableId={item.id} index={index} key={item.id}>
                                {(provided) => (
                                    <div className='item-container' {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                    <h4>{item.nome}</h4>
                                </div>
                                )}
                            </Draggable> 
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )} 
        </Droppable>
    
    )
}

export default Kanban