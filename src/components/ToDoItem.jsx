import React from "react";

const ToDoItem = ({id, text: onAdd="Nuevo To Do", onChecked}) => {
  return (
    <div
      onClick={ () => {
        onChecked(id);
      }}
    >
      <li>{onAdd}</li>
    </div>
  );
}

export default ToDoItem;
