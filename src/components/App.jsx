import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const STORAGE_KEY = 'todos';

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const loadTodos = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const App = () => {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: createId(), text, completed: false }]);
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.length > activeCount;

  return (
    <Container>
      <Heading>
        <H1>To-Do List</H1>
      </Heading>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
      {todos.length > 0 && (
        <Footer>
          <Count>
            {activeCount} task{activeCount === 1 ? '' : 's'} left
          </Count>
          {hasCompleted && (
            <ClearButton type="button" onClick={clearCompleted}>
              Clear completed
            </ClearButton>
          )}
        </Footer>
      )}
    </Container>
  );
};

export default App;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem;
  border-top: dashed 3px #fdcb6e;
  font-size: 0.9rem;
`;

const Count = styled.span`
  color: hsla(260, 2%, 25%, 0.7);
`;

const ClearButton = styled.button`
  border: none;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background-color: #ffeaa7;
  color: hsl(198, 1%, 29%);
  cursor: pointer;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const H1 = styled.h1`
  transform: rotate(2deg);
  padding: 0.2rem 1.2rem;
  border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
  background-color: #fdcb6e;
  font-size: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 500px;
  max-width: 500px;
  min-width: 250px;
  background: #f1f5f8;
  background-image: radial-gradient(#bfc0c1 7.2%, transparent 0);
  background-size: 25px 25px;
  border-radius: 20px;
  box-shadow: 4px 3px 7px 2px #00000040;
  padding: 1rem;
  box-sizing: border-box;
`;
