import React from "react";
import {Draggable} from "react-beautiful-dnd";
import "./card.css";

interface CardProps {
  card: {
    id: string;
    content: string;
  };
  index: number;
}

const Card = ({card, index}: CardProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
2