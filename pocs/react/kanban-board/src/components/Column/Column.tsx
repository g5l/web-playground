import React from "react";
import Card from "../Card/Card";
import "./column.css";

const Column = ({ column, cards, onDragStart, onDrop, addCard, updateCardTitle }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <h2>{column.title}</h2>
      {cards.map((card) => (
        <Card key={card.id} card={card} onDragStart={onDragStart} updateCardTitle={updateCardTitle} />
      ))}
      <button onClick={() => addCard(column.id)}>Add Card</button>
    </div>
  );
};

export default Column;
