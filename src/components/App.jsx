import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterBar from './FilterBar';

const STORAGE_KEY = 'todos';
const UNDO_TIMEOUT = 5000;

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

const matchesFilter = (todo, filter) => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true;
};

const App = () => {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!recentlyDeleted) return undefined;
    const timer = setTimeout(() => setRecentlyDeleted(null), UNDO_TIMEOUT);
    return () => clearTimeout(timer);
  }, [recentlyDeleted]);

  const addTodo = (text, image, dueDate) => {
    setTodos((prev) => [
      ...prev,
      {
        id: createId(),
        text,
        completed: false,
        image: image || null,
        dueDate: dueDate || null,
      },
    ]);
  };

  const updateTodo = (id, text, image, dueDate) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text, image, dueDate } : todo
      )
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
    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      if (index === -1) return prev;
      setRecentlyDeleted({ todo: prev[index], index });
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const undoDelete = () => {
    if (!recentlyDeleted) return;
    setTodos((prev) => {
      const next = [...prev];
      next.splice(recentlyDeleted.index, 0, recentlyDeleted.todo);
      return next;
    });
    setRecentlyDeleted(null);
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const reorderTodos = (draggedId, targetId) => {
    setTodos((prev) => {
      const draggedIndex = prev.findIndex((todo) => todo.id === draggedId);
      const targetIndex = prev.findIndex((todo) => todo.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.length > activeCount;
  const visibleTodos = todos
    .filter((todo) => matchesFilter(todo, filter))
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container dark={darkMode}>
      <Heading>
        <H1>To-Do List</H1>
        <ThemeToggle
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-pressed={darkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </Heading>
      <TodoForm onAdd={addTodo} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        onReorder={reorderTodos}
        emptyMessage={
          todos.length === 0
            ? 'Nothing here yet. Add your first task!'
            : 'No tasks match your filters.'
        }
      />
      {todos.length > 0 && (
        <Footer role="status" aria-live="polite">
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
      {recentlyDeleted && (
        <Toast role="alert">
          <span>Task deleted.</span>
          <UndoButton type="button" onClick={undoDelete}>
            Undo
          </UndoButton>
        </Toast>
      )}
    </Container>
  );
};

export default App;

const Toast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background-color: hsl(198, 1%, 29%);
  color: #f1f5f8;
  font-size: 0.9rem;
`;

const UndoButton = styled.button`
  border: none;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background-color: #fdcb6e;
  color: hsl(198, 1%, 29%);
  cursor: pointer;
`;

const ThemeToggle = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

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
  background: ${({ dark }) => (dark ? '#3b3f42' : '#f1f5f8')};
  background-image: radial-gradient(
    ${({ dark }) => (dark ? '#54595c' : '#bfc0c1')} 7.2%,
    transparent 0
  );
  background-size: 25px 25px;
  border-radius: 20px;
  box-shadow: 4px 3px 7px 2px #00000040;
  padding: 1rem;
  box-sizing: border-box;
  transition: background-color 0.2s ease;
`;

