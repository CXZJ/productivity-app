import { useState, useEffect } from "react";
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  const [todos, setTodos] = useState(() => getTodos());
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="sidebar">
      <form onSubmit={addTodo} spellCheck="false">
        <input
          type="text"
          id="list-input"
          placeholder="new list"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="add-button" type="submit">
          Add
        </button>
      </form>
      <ul className="sidebar-lists">
        <li><a href="/list1">List 1</a></li>
        <li><a href="/list2">List 2</a></li>
        <li><a href="/list3">List 3</a></li>
        <li><a href="/list4">List 4</a></li>
      </ul>
    </div>
  );
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export default Sidebar;
