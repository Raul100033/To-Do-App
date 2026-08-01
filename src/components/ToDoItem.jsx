import React, { useState } from 'react';
import styled from 'styled-components';
import imagenes from '../media/img';

const ToDoItem = ({
  id,
  text,
  completed,
  image,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [inputText, setInputText] = useState(text);
  const [imgInput, setImgInput] = useState(image || '');
  const [isEditing, setIsEditing] = useState(false);

  const imageIndex = React.useMemo(
    () => Math.floor(Math.random() * imagenes.length),
    []
  );
  const backgroundImage = image || imagenes[imageIndex];

  const startEditing = () => {
    setInputText(text);
    setImgInput(image || '');
    setIsEditing(true);
  };

  const save = () => {
    const newText = inputText.trim();
    if (newText) onUpdate(id, newText, imgInput || null);
    setIsEditing(false);
  };

  const cancel = () => {
    setInputText(text);
    setImgInput(image || '');
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') save();
    if (event.key === 'Escape') cancel();
  };

  if (isEditing) {
    return (
      <Li background={backgroundImage}>
        <Input
          autoFocus
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Edit task"
        />
        <InputImage
          type="text"
          value={imgInput}
          onChange={(event) => setImgInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Image URL"
          aria-label="Edit task image URL"
        />
        <Actions>
          <SmallButton type="button" onClick={save}>
            Done
          </SmallButton>
          <SmallButton type="button" onClick={cancel}>
            Cancel
          </SmallButton>
        </Actions>
      </Li>
    );
  }

  return (
    <Li background={backgroundImage}>
      <Label>
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <Text completed={completed}>{text}</Text>
      </Label>
      <Actions>
        <SmallButton type="button" onClick={startEditing}>
          Edit
        </SmallButton>
        <SmallButton
          type="button"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${text}`}
        >
          ✕
        </SmallButton>
      </Actions>
    </Li>
  );
};

export default ToDoItem;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
  position: relative;
  padding: 0.5rem;
  outline: none;
  border-radius: 8px;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-position: center;
`;


const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
  min-width: 0;
`;

const Checkbox = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #fdcb6e;
  cursor: pointer;
  flex-shrink: 0;
`;

const Text = styled.span`
  word-break: break-word;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  opacity: ${({ completed }) => (completed ? 0.5 : 1)};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const SmallButton = styled.button`
  border: none;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background-color: #ffeaa7;
  color: hsl(198, 1%, 29%);
  cursor: pointer;
`;

const Input = styled.input`
  box-sizing: border-box;
  background-color: transparent;
  padding: 0.4rem;
  border: solid 3px transparent;
  border-bottom: dashed 3px #fdcb6e;
  font-family: 'Architects Daughter', cursive;
  font-size: 1rem;
  color: hsla(260, 2%, 25%, 0.7);
  flex: 1;
  min-width: 0;
`;

const InputImage = styled.input`
  box-sizing: border-box;
  background-color: transparent;
  padding: 0.4rem;
  border: solid 3px transparent;
  border-bottom: dashed 3px #fdcb6e;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.9rem;
  color: hsla(260, 2%, 25%, 0.7);
  flex: 1;
  min-width: 0;
`;

