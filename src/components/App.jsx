import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import styled from 'styled-components';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputText(newValue);
  };

  const handleImageChange = (event) => {
    setImageInput(event.target.value);
  };

  const updateItem = (index, newItemValue) => {
    setItems((prevItems) =>
      prevItems.map((item, currentIndex) =>
        currentIndex === index ? newItemValue : item
      )
    );
  };

  const addItem = (text, image) => {
    setItems((prevItems) => [...prevItems, { text, image: image || null }]);
    setInputText('');
    setImageInput('');
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item, index) => index !== id));
  };

  return (
    <Container>
      <Heading>
        <H1>To-Do List</H1>
      </Heading>
      <div className="form">
        <Input onChange={handleChange} type="text" value={inputText} />
        <Input
          onChange={handleImageChange}
          type="text"
          value={imageInput}
          placeholder="Image URL (optional)"
        />
        <Button
          onClick={() => {
            addItem(inputText, imageInput);
          }}
        >
          <Span>Add</Span>
        </Button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem.text}
              image={todoItem.image}
              onChecked={deleteItem}
              updateItem={updateItem}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default App;

const Button = styled.button`
  padding: 0;
  border: none;
  font-family: 'Architects Daughter', cursive;
  text-decoration: none;
  padding-bottom: 3px;
  border-radius: 5px;
  background-color: #ffeaa7;
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
