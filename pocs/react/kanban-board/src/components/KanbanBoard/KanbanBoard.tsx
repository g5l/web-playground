import React, { useState } from "react";
import Column from "../Column/Column";
import "./kanbanBoard.css";

const KanbanBoard = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const onDragStart = (event, cardId) => {
    event.dataTransfer.setData("cardId", cardId);
  };

  const onDrop = (event, columnId) => {
    const cardId = event.dataTransfer.getData("cardId");

    const sourceColumnId = Object.keys(data.columns).find((colId) =>
      data.columns[colId].cardIds.includes(cardId)
    );

    if (sourceColumnId === columnId) return;

    const newColumns = { ...data.columns };
    newColumns[sourceColumnId].cardIds = newColumns[sourceColumnId].cardIds.filter(
      (id) => id !== cardId
    );
    newColumns[columnId].cardIds.push(cardId);

    setData({ ...data, columns: newColumns });
  };

  const addCard = (columnId) => {
    const newCardId = `card-${Date.now()}`;
    const newCard = { id: newCardId, content: "New Card" };
    const newColumns = { ...data.columns };
    newColumns[columnId].cardIds.push(newCardId);

    setData({
      ...data,
      cards: { ...data.cards, [newCardId]: newCard },
      columns: newColumns,
    });
  };

  const updateCardTitle = (cardId, newTitle) => {
    const updatedCards = { ...data.cards, [cardId]: { ...data.cards[cardId], content: newTitle } };
    setData({ ...data, cards: updatedCards });
  };

  return (
    <div className="kanban-board">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const cards = column.cardIds.map((cardId) => data.cards[cardId]);
        return (
          <Column
            key={columnId}
            column={column}
            cards={cards}
            onDragStart={onDragStart}
            onDrop={onDrop}
            addCard={addCard}
            updateCardTitle={updateCardTitle}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;