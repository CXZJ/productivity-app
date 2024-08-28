import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ lists, switchList, activeList, addList, deleteList }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddList = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !lists.includes(inputValue)) {
      addList(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleAddList} spellCheck="false">
        <input
          type="text"
          id="list-input"
          placeholder="New list"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="add-button" type="submit">
          Add
        </button>
      </form>
      <ul className="sidebar-lists">
        {lists.map((listName, index) => (
          <li key={index}>
            <a
              href="#"
              className={activeList === listName ? 'active' : ''}
              onClick={() => switchList(listName)}
            >
              {listName}
            </a>
            <button className="delete-button" onClick={() => deleteList(listName)}>
              <svg
                fill="hsl(0, 0%, 90%)"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
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

export default Sidebar;
