import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "./KanbanBoard.css";
import Column from "../Column/Column";

interface KanbanBoardProps {
  initialData: {
    columns: Record<string, { id: string; title: string; cardIds: string[] }>;
    cards: Record<string, { id: string; content: string }>;
    columnOrder: string[];
  };
}

const KanbanBoard = ({initialData}: KanbanBoardProps) => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: any) => {
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