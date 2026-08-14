import React, { useState } from 'react';
import styled from 'styled-components';
import { readFileAsDataURL } from '../utils/file';

const TodoForm = ({ onAdd }) => {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [previewError, setPreviewError] = useState(false);

  const previewSrc = uploadedImage || imageUrl;

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    const image = uploadedImage || imageUrl.trim() || null;
    onAdd(text, image, dueDate || null);
    setInputText('');
    setImageUrl('');
    setUploadedImage('');
    setDueDate('');
    setPreviewError(false);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setUploadedImage('');
    setPreviewError(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setUploadedImage(dataUrl);
    setImageUrl('');
    setPreviewError(false);
    event.target.value = '';
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Input
          onChange={(event) => setInputText(event.target.value)}
          type="text"
          value={inputText}
          placeholder="Add a task..."
          aria-label="New task"
        />
        <DateInput
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          aria-label="Due date (optional)"
        />
      </Row>
      <Row>
        <Input
          onChange={handleImageUrlChange}
          type="text"
          value={imageUrl}
          placeholder="Image URL (optional)"
          aria-label="New task image URL"
        />
        <FileLabel>
          Upload
          <FileInput type="file" accept="image/*" onChange={handleFileChange} />
        </FileLabel>
      </Row>
      {previewSrc && !previewError && (
        <Preview
          src={previewSrc}
          alt="Task preview"
          onError={() => setPreviewError(true)}
        />
      )}
      <Button type="submit">
        <Span>Add</Span>
      </Button>
    </Form>
  );
};

export default TodoForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
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
  align-self: center;
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
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  background-color: #ffeaa7;
  cursor: pointer;
  white-space: nowrap;
`;

const FileInput = styled.input`
  display: none;
`;

const Preview = styled.img`
  max-height: 4rem;
  border-radius: 6px;
  align-self: flex-start;
  object-fit: cover;
`;

