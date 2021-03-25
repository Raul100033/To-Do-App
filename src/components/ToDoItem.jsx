import React, { useState } from 'react';
import styled from 'styled-components';

const ToDoItem = ({ id, text: addText, onChecked, updateItem }) => {
  return (
    <div
      onClick={() => {
        onChecked(id);
      }}
    >
      <Li
        contentEditable="true"
        onContextMenu={(e) => {
          e.preventDefault();
          updateItem(id, addText);
        }}
      >
        {addText}
      </Li>
    </div>
  );
};

export default ToDoItem;

const Li = styled.li`
  text-align: left;
  position: relative;
  padding: 0.5rem;
  outline: none;
`;
