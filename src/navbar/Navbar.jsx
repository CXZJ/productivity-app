import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ toggleSidebar, handleSearch, searchResults, onResultClick }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const query = e.target.value;
    handleSearch(query);
    setShowDropdown(query.length > 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={toggleSidebar}>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z"/></svg></a>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Timeout to allow clicking on dropdown items
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => onResultClick(result.listName)}>
                {result.todo.text} - <em>{result.listName}</em>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navbar-notifications">
        <a href="/notifications">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
