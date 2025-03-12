import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "./KanbanBoard.css";
import Column from "../Column/Column";

const initialData = {
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      cardIds: ["card-1", "card-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      cardIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      cardIds: [],
    },
  },
  cards: {
    "card-1": {id: "card-1", content: "Learn React"},
    "card-2": {id: "card-2", content: "Build Kanban Board"},
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const {source, destination, draggableId} = result;
    if (!destination) return;

    const startCol = data.columns[source.droppableId];
    const endCol = data.columns[destination.droppableId];

    if (startCol === endCol) {
      const newCardIds = Array.from(startCol.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {...startCol, cardIds: newCardIds};
      setData((prev) => ({
        ...prev,
        columns: {...prev.columns, [newColumn.id]: newColumn},
      }));
      return;
    }

    const startCardIds = Array.from(startCol.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartCol = {...startCol, cardIds: startCardIds};

    const endCardIds = Array.from(endCol.cardIds);
    endCardIds.splice(destination.index, 0, draggableId);
    const newEndCol = {...endCol, cardIds: endCardIds};

    setData((prev) => ({
      ...prev,
      columns: {...prev.columns, [newStartCol.id]: newStartCol, [newEndCol.id]: newEndCol},
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {data.columnOrder.map((columnId) => (
          <Column key={columnId} column={data.columns[columnId]} cards={data.cards}/>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;