import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import imagenes from '../media/img';
import { readFileAsDataURL } from '../utils/file';

const isOverdue = (dueDate, completed) =>
  !completed &&
  !!dueDate &&
  new Date(dueDate) < new Date(new Date().toDateString());

const ToDoItem = ({
  id,
  text,
  completed,
  image,
  dueDate,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [inputText, setInputText] = useState(text);
  const [imageUrl, setImageUrl] = useState(
    image && !image.startsWith('data:') ? image : ''
  );
  const [uploadedImage, setUploadedImage] = useState(
    image && image.startsWith('data:') ? image : ''
  );
  const [inputDueDate, setInputDueDate] = useState(dueDate || '');
  const [isEditing, setIsEditing] = useState(false);

  const imageIndex = React.useMemo(
    () => Math.floor(Math.random() * imagenes.length),
    []
  );
  const fallbackImage = imagenes[imageIndex];
  const [resolvedImage, setResolvedImage] = useState(image || fallbackImage);

  useEffect(() => {
    if (!image) {
      setResolvedImage(fallbackImage);
      return undefined;
    }
    if (image.startsWith('data:')) {
      setResolvedImage(image);
      return undefined;
    }
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setResolvedImage(image);
    };
    probe.onerror = () => {
      if (!cancelled) setResolvedImage(fallbackImage);
    };
    probe.src = image;
    return () => {
      cancelled = true;
    };
  }, [image, fallbackImage]);

  const startEditing = () => {
    setInputText(text);
    setImageUrl(image && !image.startsWith('data:') ? image : '');
    setUploadedImage(image && image.startsWith('data:') ? image : '');
    setInputDueDate(dueDate || '');
    setIsEditing(true);
  };

  const save = () => {
    const newText = inputText.trim();
    if (!newText) {
      setIsEditing(false);
      return;
    }
    const newImage = uploadedImage || imageUrl.trim() || null;
    onUpdate(id, newText, newImage, inputDueDate || null);
    setIsEditing(false);
  };

  const cancel = () => {
    setInputText(text);
    setImageUrl(image && !image.startsWith('data:') ? image : '');
    setUploadedImage(image && image.startsWith('data:') ? image : '');
    setInputDueDate(dueDate || '');
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') save();
    if (event.key === 'Escape') cancel();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setUploadedImage(dataUrl);
    setImageUrl('');
    event.target.value = '';
  };

  if (isEditing) {
    return (
      <Card background={resolvedImage}>
        <EditRow>
          <Input
            autoFocus
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task"
          />
          <DateInput
            type="date"
            value={inputDueDate}
            onChange={(event) => setInputDueDate(event.target.value)}
            aria-label="Edit due date"
          />
        </EditRow>
        <EditRow>
          <Input
            type="text"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
              setUploadedImage('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Image URL"
            aria-label="Edit task image URL"
          />
          <FileLabel>
            Upload
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FileLabel>
        </EditRow>
        <Actions>
          <SmallButton type="button" onClick={save}>
            Done
          </SmallButton>
          <SmallButton type="button" onClick={cancel}>
            Cancel
          </SmallButton>
        </Actions>
      </Card>
    );
  }

  return (
    <Card background={resolvedImage}>
      <Label>
        <Checkbox
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <TextGroup>
          <Text completed={completed}>{text}</Text>
          {dueDate && (
            <DueDate overdue={isOverdue(dueDate, completed)}>
              Due {dueDate}
            </DueDate>
          )}
        </TextGroup>
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
    </Card>
  );
};

export default ToDoItem;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  text-align: left;
  position: relative;
  padding: 0.5rem 0.75rem;
  min-height: 4.5rem;
  outline: none;
  border-radius: 8px;
  background-image: linear-gradient(
      hsla(0, 0%, 100%, 0.6),
      hsla(0, 0%, 100%, 0.6)
    ),
    url(${({ background }) => background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-wrap: wrap;
`;

const EditRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 100%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex: 1;
  min-width: 0;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
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

const DueDate = styled.span`
  font-size: 0.75rem;
  color: ${({ overdue }) => (overdue ? '#d63031' : 'hsla(260, 2%, 25%, 0.6)')};
  font-weight: ${({ overdue }) => (overdue ? 'bold' : 'normal')};
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

const DateInput = styled(Input)`
  flex: none;
  width: auto;
  font-size: 0.85rem;
`;

const FileLabel = styled.label`
  font-family: 'Architects Daughter', cursive;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  background-color: #ffeaa7;
  color: hsl(198, 1%, 29%);
  cursor: pointer;
  white-space: nowrap;
`;

const FileInput = styled.input`
  display: none;
`;


