import React, {useState} from "react";
import "./card.css";

const Card = ({card, onDragStart, updateCardTitle}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateCardTitle(card.id, newTitle);
  };

  return (
    <div className="card" draggable onDragStart={(e) => onDragStart(e, card.id)}>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onClick={handleEdit}>{card.content}</span>
      )}
    </div>
  );
};

export default Card;