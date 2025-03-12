import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import "./Column.css";

interface ColumnProps {
  column: {
    id: string;
    title: string;
    cardIds: string[];
  };
  cards: {
    [key: string]: { id: string; content: string };
  };
}

const Column: React.FC<ColumnProps> = ({ column, cards }) => {
  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="column-cards">
            {column.cardIds.map((cardId, index) => (
              <Card key={cardId} card={cards[cardId]} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
