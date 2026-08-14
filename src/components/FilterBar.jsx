import React from 'react';
import styled from 'styled-components';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

const FilterBar = ({ search, onSearchChange, filter, onFilterChange }) => (
  <Bar>
    <SearchInput
      type="text"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search tasks..."
      aria-label="Search tasks"
    />
    <Tabs role="tablist" aria-label="Filter tasks">
      {FILTERS.map(({ key, label }) => (
        <Tab
          key={key}
          type="button"
          role="tab"
          aria-selected={filter === key}
          active={filter === key}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </Tab>
      ))}
    </Tabs>
  </Bar>
);

export default FilterBar;

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  background-color: transparent;
  padding: 0.4rem 0.6rem;
  border: solid 3px transparent;
  border-bottom: dashed 3px #fdcb6e;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.9rem;
  color: hsla(260, 2%, 25%, 0.7);
  flex: 1;
  min-width: 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Tab = styled.button`
  border: none;
  font-family: 'Architects Daughter', cursive;
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#fdcb6e' : '#ffeaa7')};
  color: hsl(198, 1%, 29%);
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;
