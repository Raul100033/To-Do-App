import React, { useState } from 'react';
import styled from 'styled-components';
import imagenes from '../media/img';

const ToDoItem = ({ id, text: addText, image, onChecked, updateItem }) => {
  const [inputText, setInputText] = useState(addText);
  const [isEditing, setIsEditing] = useState(false);
  const [img, setImg] = useState(image || '');

  const edit = (event) => {
    setInputText(event.target.value);
  };

  const imageIndex = React.useMemo(
    () => Math.floor(Math.random() * imagenes.length),
    []
  );

  const urlImage = (event) => {
    setImg(event.target.value);
  };

  return (
    <MainDiv
      background={img || imagenes[imageIndex]}
      onClick={() => {
        onChecked(id);
      }}
    >
      {!isEditing ? (
        <Li
          onContextMenu={(event) => {
            event.preventDefault();
            setIsEditing(true);
          }}
        >
          {addText}
        </Li>
      ) : (
        <div>
          <Input
            onChange={edit}
            type="text"
            value={inputText}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          />{' '}
          <InputImage
            type="text"
            onChange={urlImage}
            value={img}
            placeholder="Image URL"
          />{' '}
          <Button
            onClick={() => {
              updateItem(id, { text: inputText, image: img });
              setIsEditing(false);
            }}
          >
            Done{' '}
          </Button>
        </div>
      )}
    </MainDiv>
  );
};

export default ToDoItem;

const Li = styled.li`
  text-align: left;
  position: relative;
  padding: 0.5rem;
  outline: none;
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

const InputImage = styled.input`
  box-sizing: border-box;
  background-color: transparent;
`;

const Button = styled.button`
  padding: 0;
  border: none;
  font-family: 'Architects Daughter', cursive;
  text-decoration: none;
  padding-bottom: 3px;
  border-radius: 5px;
  background-color: #ffeaa7;
`;

const MainDiv = styled.div`
  background-image: url(${({ background }) => background.toString()});
`;
