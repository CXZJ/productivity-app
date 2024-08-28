// ToDoList.js
import React, { useState, useEffect } from 'react';
import './ToDoList.css';

function ToDoList() {
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

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="wrapper">
      <form onSubmit={addTodo} spellCheck="false">
        <input
          type="text"
          id="todo-input"
          placeholder="something to do for later"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="add-button" type="submit">
          Add
        </button>
      </form>
      <ul id="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              id={`todo-${index}`}
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <label className="todo-text" htmlFor={`todo-${index}`}>
              {todo.text}
            </label>
            <button className="delete-button" onClick={() => deleteTodo(index)}>
              <svg
                fill="hsl(0, 0%, 90%)"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </li>
        ))}
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

export default ToDoList;
