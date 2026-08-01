import React, { useState } from 'react';
import styled from 'styled-components';

const TodoForm = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    onAdd(text, imageInput.trim() || null);
    setInputText('');
    setImageInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={(event) => setInputText(event.target.value)}
        type="text"
        value={inputText}
        placeholder="Add a task..."
        aria-label="New task"
      />
      <Input
        onChange={(event) => setImageInput(event.target.value)}
        type="text"
        value={imageInput}
        placeholder="Image URL (optional)"
        aria-label="New task image URL"
      />
      <Button type="submit">
        <Span>Add</Span>
      </Button>
    </Form>
  );
};

export default TodoForm;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0;
  border: none;
  font-family: 'Architects Daughter', cursive;
  text-decoration: none;
  padding-bottom: 3px;
  border-radius: 5px;
  background-color: #ffeaa7;
  cursor: pointer;
`;

const Span = styled.span`
  background: #f1f5f8;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid hsl(198, 1%, 29%);
`;

const Input = styled.input`
  box-sizing: border-box;
  background-color: transparent;
  padding: 0.7rem;
  border-bottom-right-radius: 15px 3px;
  border-bottom-left-radius: 3px 15px;
  border: solid 3px transparent;
  border-bottom: dashed 3px #fdcb6e;
  font-family: 'Architects Daughter', cursive;
  font-size: 1rem;
  color: hsla(260, 2%, 25%, 0.7);
  width: 70%;
  margin-bottom: 20px;
`;
