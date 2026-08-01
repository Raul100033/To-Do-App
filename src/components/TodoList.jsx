import React from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

const TodoList = ({ todos, onToggle, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return <Empty>Nothing here yet. Add your first task!</Empty>;
  }

  return (
    <Ul>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          image={todo.image}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
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

const Empty = styled.p`
  color: hsla(260, 2%, 25%, 0.6);
  font-size: 1rem;
`;
