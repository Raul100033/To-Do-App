import React, { useRef } from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

const TodoList = ({
  todos,
  onToggle,
  onUpdate,
  onDelete,
  onReorder,
  emptyMessage,
}) => {
  const draggedId = useRef(null);

  if (todos.length === 0) {
    return <Empty>{emptyMessage}</Empty>;
  }

  const handleDragStart = (id) => (event) => {
    draggedId.current = id;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (id) => (event) => {
    event.preventDefault();
    if (draggedId.current && draggedId.current !== id) {
      onReorder(draggedId.current, id);
    }
    draggedId.current = null;
  };

  return (
    <Ul aria-label="Todo list">
      {todos.map((todo) => (
        <DragItem
          key={todo.id}
          draggable
          onDragStart={handleDragStart(todo.id)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(todo.id)}
        >
          <ToDoItem
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            image={todo.image}
            dueDate={todo.dueDate}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </DragItem>
      ))}
    </Ul>
  );
};

export default TodoList;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DragItem = styled.li`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Empty = styled.p`
  color: hsla(260, 2%, 25%, 0.6);
  font-size: 1rem;
`;

